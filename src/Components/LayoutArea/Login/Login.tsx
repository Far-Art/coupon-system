import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginModel } from "../../../Models/LoginModel";
import "./Login.css";
import { RouteUrls } from "../../../Services/RouteUrls";
import axios from "axios";
import globals from "../../../Services/Globals";
import apiGlobalLogic from "../../../Services/ApiGlobalLogic";
import { toast } from "react-toastify";
import { useState } from "react";
import { store} from "../../../Redux/Store/Store";
import { loginAction } from "../../../Redux/Actions/ClientAction";

function Login(): JSX.Element {

    const {register, handleSubmit} = useForm<LoginModel>();
    const [displayed, setDisplayed] = useState(false);
    const [displayClass, setdisplayClass] = useState("DISPLAY__NONE");
    
    // const send = async (login:LoginModel) => {
    //     try{
    //         const response = await axios.post<LoginModel>(globals.urls.login, login);
    //         store.dispatch(loginAction(response.data));
    //         handleDisplayOnClick();
    //         toast.success("Login successfull",{
    //             theme:"colored"
    //         });
    //     } catch(err:any) {
    //         toast.error(typeof err.response?.data === "string" ? err.response.data : "Login failed",{
    //             theme:"colored",
    //             toastId: err.response.data
    //         });
    //     }
        
    // }
    const send = async (login:LoginModel) => {
        try{
            const response = await toast.promise(axios.post<LoginModel>(globals.urls.login, login),
                {
                    pending: "Loging in",
                    success: "Login successful",
                    error: ""
                },
                {
                    toastId: "PendingToast",
                    theme: "colored"
                });

            store.dispatch(loginAction(response.data));
            handleDisplayOnClick();

        } catch(err:any) {
            toast.dismiss("PendingToast");
            toast.error(typeof err.response?.data === "string" ? err.response.data : "Login failed",{
                theme:"colored",
                toastId: "LoginFailedToast"
            });
        }
    }

    const handleDisplayOnClick = () => {
        if(displayed){
            setDisplayed(false);
            setdisplayClass("DISPLAY__NONE");
        } else {
            setDisplayed(true);
            setdisplayClass("DISPLAY__INLINE");
        }
    }

    return (
        <section className="Login">
            <button className="APP__BUTTON" onClick={handleDisplayOnClick}>Login</button>
            <br />
            <div className={"Login__Form FORM WHITE__BG " + displayClass}>
                <h2> Login to Coupon System</h2>
                <form onSubmit={handleSubmit(send)}>
                    <input type="email" className="FIELD" placeholder="your email here" {...register("email",{
                        required:true,
                        minLength:apiGlobalLogic.forms.fieldsMinLength.email
                    })} />
                    <br/>

                    <input type="password" className="FIELD" placeholder="your password here" {...register("password",{
                        required:true,
                        minLength:apiGlobalLogic.forms.fieldsMinLength.password
                    })} />
                    <br/>
                    
                    <div>
                        <button  type="submit" className="APP__BUTTON">Login</button>
                    </div>
                </form>

                <NavLink to={RouteUrls.SIGNUP}>
                    <button className="APP__BUTTON" type="button" >Want to Sign up</button>
                </NavLink>
            </div>
        </section>
    );
}

export default Login;