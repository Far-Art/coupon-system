import { useForm } from "react-hook-form";
import { SignupModel } from "../../../Models/SignupModel";
import { ClientType } from "../../../Models/ClientType";
import apiGlobalLogic from "../../../Services/ApiGlobalLogic";
import "./Sign_up.css";
import { useState } from "react";
import ApiGlobalLogic from "../../../Services/ApiGlobalLogic";
import GlobalDataStreamer from "../../../Services/GlobalDataStreamer";

export default function Sign_up(): JSX.Element {
    
    const {register, handleSubmit, setValue, reset, formState: { errors }} = useForm<SignupModel>({
        defaultValues: {"clientType":ClientType.CUSTOMER}
    });

    const [clientType, setClientType] = useState(ClientType.CUSTOMER);
    
    const send = async (signup:SignupModel) => {
        GlobalDataStreamer.signup(signup);
    }

    function handleChange(event:React.ChangeEvent<HTMLSelectElement>){
        switch(event.target.value){
            case "COMPANY":
                console.log();
                setValue("clientType", ClientType.COMPANY);
                setClientType(ClientType.COMPANY);
                break;
            default:
                setValue("clientType", ClientType.CUSTOMER);
                setClientType(ClientType.CUSTOMER);
                break;
        }
    }

    function requiredFields(){
        switch(clientType){
            case ClientType.CUSTOMER:
                return(<>
                    <input maxLength={ApiGlobalLogic.forms.fieldsMaxLength.name} type="text" className="FIELD" placeholder="first name" {...register("name",{
                        required:{
                            value: true,
                            message: "First name required"
                        },
                        minLength: apiGlobalLogic.forms.fieldsMinLength.name
                    })} />
                    {errors.name && <p className="Error">{errors.name.message}</p>}

                    <input maxLength={ApiGlobalLogic.forms.fieldsMaxLength.name}  type="text" className="FIELD" placeholder="last name" {...register("lastName",{
                        required:{
                            value: true,
                            message: "Last name required"
                        },
                        minLength:apiGlobalLogic.forms.fieldsMinLength.name
                    })} />
                    {errors.lastName && <p className="Error">{errors.lastName.message}</p>}
                </>);
            case ClientType.COMPANY:
                return(<>
                    <input maxLength={ApiGlobalLogic.forms.fieldsMaxLength.name} type="text" className="FIELD" placeholder="company name" {...register("name",{
                        required:{
                            value: true,
                            message: "Company name required"
                        },
                        minLength: apiGlobalLogic.forms.fieldsMinLength.name
                    })} />
                    {errors.name && <p className="Error">{errors.name.message}</p>}
                </>);
        }
    }

    return (
        <div className="Sign_up FORM WHITE__BG">
			<h2> Sign-up </h2>
            <form onSubmit={handleSubmit(send)}>

                {requiredFields()}

                <input maxLength={ApiGlobalLogic.forms.fieldsMaxLength.email} type="email" className="FIELD" placeholder="email" {...register("email",{
                     required:{
                        value: true,
                        message: "Email required"
                    },
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
                     required:{
                        value: true,
                        message: "Password required"
                    },
                    minLength:{
                        value:ApiGlobalLogic.forms.fieldsMinLength.password,
                        message: `Password must contain at least ${ApiGlobalLogic.forms.fieldsMinLength.password} characters` 
                    },
                    pattern: {
                        value: ApiGlobalLogic.patterns.regex.password,
                        message: "Password must include at least one Upper and lower case letter"
                    }
                })} />
                 {errors.password && <p className="Error">{errors.password.message}</p>}

                <br/>
                <button type="reset" onClick={() => {
                    reset();
                    setClientType(ClientType.CUSTOMER);
                }} className="BUTTON__AS_LINK">reset form</button>
                <br/>

                <select className="FIELD" onChange={(event) => handleChange(event)} >
                    <option value={ClientType.CUSTOMER}>Customer</option>
                    <option value={ClientType.COMPANY}>Company</option>
                </select>
                <button type="submit" className="FIELD LINK APP__BUTTON">Sign-up</button>
                
            </form>
        </div>
    );
}