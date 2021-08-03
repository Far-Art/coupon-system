import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { SignupModel } from "../../../Models/SignupModel";
import { UserTypes } from "../../../Models/UserTypes";
import { ApisUrls } from "../../../Services/ApisUrls";
import notification from "../Notification/Notification";
import "./Sign_up.css";

function Sign_up(): JSX.Element {
    const {register, handleSubmit, formState: { errors }} = useForm<SignupModel>();
    
    const send = (signup:SignupModel) => {
        try{
            notification.success("Sign-up successfull : " + signup.email);
        } catch {
            notification.error("Sign-up failed");
        }
    }
    return (
        <div className="Sign_up CENTERED TRANSPARENT FORM">
			<h2> Sign-up to Coupon System</h2>
            <form onSubmit={handleSubmit(send)}>
                <input type="text" className="FIELD" placeholder="your first name here" {...register("firstName",{
                    required:true,
                    minLength:2
                })} />
                <br/>

                <input type="text" className="FIELD" placeholder="your last name here" {...register("lastName",{
                    required:true,
                    minLength:2
                })} />
                <br/>

                <input type="tel" className="FIELD" placeholder="your telephone here" {...register("telephone",{
                    required:false,
                    minLength:6
                })} />
                <br/>

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
                    <select className="FIELD" {...register("type")}>
                        <option value={UserTypes.CUSTOMER}>Customer</option>
                        <option value={UserTypes.COMPANY}>Company</option>
                        <option value={UserTypes.ADMIN}>Admin</option>
                    </select>
                    <button type="submit" className="FIELD LINK">Sign-up</button>
                </div>
                
            </form>
            <NavLink to={ApisUrls.LOGIN}>
                <button className="FIELD LINK" type="button" >Want to Login</button>
            </NavLink>
        </div>
    );
}

export default Sign_up;
