import { useForm } from "react-hook-form";
import { LoginRequestModel } from "../../../Models/LoginRequestModel";
import "./Login.css";
import ApiGlobalLogic from "../../../Services/ApiGlobalLogic";
import GlobalDataStreamer from "../../../Services/GlobalDataStreamer";
import IdleTimerApi from "../../../Services/IdleTimerApi";

export default function Login(): JSX.Element {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginRequestModel>();

    const send = (login: LoginRequestModel) => {
        GlobalDataStreamer.login(login).then((response) => {
            if (response) {
                IdleTimerApi.startIdleTimer();
            }
        });
    }

    return (
        <section className="Login">
            <div className="Login__Form FORM">
                <h2> Login </h2>
                <form onSubmit={handleSubmit(send)}>

                    <input maxLength={ApiGlobalLogic.forms.fieldsMaxLength.email} type="email" className="FIELD" placeholder="email" {...register("email", {
                        required: { value: true, message: "Email required" },
                        minLength: {
                            value: ApiGlobalLogic.forms.fieldsMinLength.email,
                            message: ApiGlobalLogic.errorDescriptions.minLength.email
                        },
                        pattern: {
                            value: ApiGlobalLogic.patterns.regex.email,
                            message: ApiGlobalLogic.errorDescriptions.badPattern.email
                        }
                    })} />
                    {errors.email && <p className="Error">{errors.email.message}</p>}

                    <input maxLength={ApiGlobalLogic.forms.fieldsMaxLength.password} type="password" className="FIELD" placeholder="password" {...register("password", {
                        required: { value: true, message: "Password required" }
                    })}
                    />
                    {errors.password && <p className="Error">{errors.password.message}</p>}

                    <br />
                    <button type="reset" onClick={() => reset()} className="BUTTON__AS_LINK">clear fields</button>
                    <br />

                    <div>
                        <button type="submit" className="APP__BUTTON">Login</button>
                    </div>
                </form>
            </div>
        </section>
    );
}