import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginModel } from "../../../Models/LoginModel";
import notification from "../Notification/Notification";
import "./Login.css";
import { ApisUrls } from "../../../Services/ApisUrls";

function Login(): JSX.Element {

    const {register, handleSubmit, formState: { errors }} = useForm<LoginModel>();
    
    const send = (login:LoginModel) => {
        try{
            notification.success("Login successfull : " + login.email);
        } catch {
            notification.error("Login failed");
        }
    }

    return (
        <section>
            <div className="Login CENTERED TRANSPARENT FORM">
                <h2> Login to Coupon System</h2>
                <form onSubmit={handleSubmit(send)}>
                    <input type="email" className="FIELD" placeholder="your email here" {...register("email",{
                        required:true,
                        minLength:4
                    })} />
                    <br/>

                    <input type="password" className="FIELD" placeholder="your password here" {...register("password",{
                        required:true,
                        minLength:6
                    })} />
                    <br/>

                    <div>
                        {/* <select className="FIELD" {...register("type")}>
                            <option value={UserTypes.CUSTOMER}>Customer</option>
                            <option value={UserTypes.COMPANY}>Company</option>
                            <option value={UserTypes.ADMIN}>Admin</option>
                        </select> */}
                        <button type="submit" className="FIELD LINK">Login</button>
                    </div>
                </form>

                <NavLink to={ApisUrls.SIGNUP}>
                    <button className="FIELD LINK" type="button" >Want to Sign up</button>
                </NavLink>
                
            </div>
            <div className="BLOCKER">

            </div>
        </section>
    );
}

export default Login;

