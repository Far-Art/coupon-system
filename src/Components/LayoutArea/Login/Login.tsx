import { useForm } from "react-hook-form";
import { LoginRequestModel } from "../../../Models/LoginRequestModel";
import "./Login.css";
import ApiGlobalLogic from "../../../Services/ApiGlobalLogic";
import GlobalDataStreamer from "../../../Services/GlobalDataStreamer";

function Login(): JSX.Element {

    const {register, handleSubmit, reset, formState: { errors }} = useForm<LoginRequestModel>();

    const send = (login:LoginRequestModel) => {
        GlobalDataStreamer.login(login);
    }

    return (
        <section className="Login">
            <div className="Login__Form FORM WHITE__BG">
                <h2> Login to Coupon System</h2>
                <form onSubmit={handleSubmit(send)}>
                    
                    <input maxLength={ApiGlobalLogic.forms.fieldsMaxLength.email} type="email" className="FIELD" placeholder="email" {...register("email",{
                        required:{value:true, message:"Email required"},
                        minLength:{
                            value: ApiGlobalLogic.forms.fieldsMinLength.email,
                            message: `Email must contain at least ${ApiGlobalLogic.forms.fieldsMinLength.email} characters` 
                            
                        },
                        pattern: {
                            value: ApiGlobalLogic.patterns.regex.email,
                            message: "Invalid email address"
                        }
                    })} />
                    {errors.email && <p className="Error">{errors.email.message}</p>}

                    <input maxLength={ApiGlobalLogic.forms.fieldsMaxLength.password} type="password" className="FIELD" placeholder="password" {...register("password",{
                        required:{value:true, message:"Password required"}
                        })} 
                    />
                    {errors.password && <p className="Error">{errors.password.message}</p>}

                    <br/>
                    <a onClick={() => reset()} className="ClearForm">clear fields</a>
                    
                    
                    <div>
                        <button type="submit" className="APP__BUTTON">Login</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;