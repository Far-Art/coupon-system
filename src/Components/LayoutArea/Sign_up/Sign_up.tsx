import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { SignupModel } from "../../../Models/SignupModel";
import { UserTypes } from "../../../Models/UserTypes";
import apiGlobalLogic from "../../../Services/ApiGlobalLogic";
import { ApisUrls } from "../../../Services/ApisUrls";
import globals from "../../../Services/Globals";
import "./Sign_up.css";

function Sign_up(): JSX.Element {
    
    const {register, handleSubmit} = useForm<SignupModel>();
    
    const send = async (signup:SignupModel) => {
        try{
            await axios.post<SignupModel>(globals.urls.signup, signup);
            toast.success(signup.email + " signed-up successfully");
        } catch(err) {
            toast.error(err.message);
        }
    }

    return (
        <div className="Sign_up CENTERED TRANSPARENT FORM">
			<h2> Sign-up to Coupon System</h2>
            <form onSubmit={handleSubmit(send)}>
                <input type="text" className="FIELD" placeholder="your first name here" {...register("name",{
                    required:true,
                    minLength: apiGlobalLogic.forms.fieldsMinLength.name
                })} />
                <br/>

                <input type="text" className="FIELD" placeholder="your last name here" {...register("lastName",{
                    required:true,
                    minLength:apiGlobalLogic.forms.fieldsMinLength.name
                })} />
                <br/>

                <input type="tel" className="FIELD" placeholder="your telephone here" {...register("telephone",{
                    required:false,
                    minLength: apiGlobalLogic.forms.fieldsMinLength.telephone
                })} />
                <br/>

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
                    <select className="FIELD" {...register("clientType")}>
                        <option value={UserTypes.CUSTOMER}>Customer</option>
                        <option value={UserTypes.COMPANY}>Company</option>
                    </select>
                    <button type="submit" className="FIELD LINK">Sign-up</button>
                </div>
                
            </form>
            
            {/* navigate to login form */}
            <NavLink to={ApisUrls.LOGIN}>
                <button className="FIELD LINK" type="button" >Want to Login</button>
            </NavLink>
        </div>
    );
}

export default Sign_up;
