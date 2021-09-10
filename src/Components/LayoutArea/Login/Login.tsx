import { useForm } from "react-hook-form";
import { LoginRequestModel } from "../../../Models/LoginRequestModel";
import "./Login.css";
import axios from "axios";
import globals from "../../../Services/Globals";
import apiGlobalLogic from "../../../Services/ApiGlobalLogic";
import { toast } from "react-toastify";
import { store} from "../../../Redux/Store/Store";
import { loginAction } from "../../../Redux/Actions/ClientAction";
import { LoginResponseModel } from "../../../Models/LoginResponseModel";

function Login(): JSX.Element {

    const {register, handleSubmit, reset} = useForm<LoginRequestModel>();

    const send = async (login:LoginRequestModel) => {
        try{
            const response = await toast.promise(axios.post<LoginResponseModel>(globals.urls.login, login),
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

        } catch(err:any) {
            toast.dismiss("PendingToast");
            toast.error(typeof err.response?.data === "string" ? err.response.data : "Login failed",{
                theme:"colored",
                toastId: "LoginFailedToast"
            });
        }
    }

    return (
        <section className="Login">
            <div className="Login__Form FORM WHITE__BG">
                <h2> Login to Coupon System</h2>
                <form onSubmit={handleSubmit(send)}>
                    
                    <input type="email" className="FIELD" placeholder="email" {...register("email",{
                        required:true,
                        minLength:apiGlobalLogic.forms.fieldsMinLength.email
                    })} />

                    <input type="password" className="FIELD" placeholder="password" {...register("password",{
                        required:true,
                        minLength:apiGlobalLogic.forms.fieldsMinLength.password
                    })} />

                    <a onClick={() => reset()} className="ClearForm">clear fields</a>
                    <br/>
                    
                    <div>
                        <button  type="submit" className="APP__BUTTON">Login</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;