import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SignupModel } from "../../../Models/SignupModel";
import { ClientType } from "../../../Models/ClientType";
import apiGlobalLogic from "../../../Services/ApiGlobalLogic";
import globals from "../../../Services/Globals";
import "./Sign_up.css";
import { useState } from "react";

function Sign_up(): JSX.Element {
    
    const {register, handleSubmit, setValue, reset} = useForm<SignupModel>({
        defaultValues: {"clientType":ClientType.CUSTOMER},
      });

    const [clientType, setClientType] = useState(ClientType.CUSTOMER);
    
    const send = async (signup:SignupModel) => {
        try{
            await axios.post<SignupModel>(globals.urls.signup, signup);
            toast.success(signup.email + " signed-up successfully", {
                theme:"colored"
            });
        } catch(err:any) {
            toast.error(err.message,{
                theme:"colored"
            });
        }
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
                    <input type="text" className="FIELD" placeholder="first name" {...register("name",{
                        required:true,
                        minLength: apiGlobalLogic.forms.fieldsMinLength.name
                    })} />

                    <input type="text" className="FIELD" placeholder="last name" {...register("lastName",{
                        required:true,
                        minLength:apiGlobalLogic.forms.fieldsMinLength.name
                    })} />
                </>);
            case ClientType.COMPANY:
                return(<>
                    <input type="text" className="FIELD" placeholder="company name" {...register("name",{
                        required:true,
                        minLength: apiGlobalLogic.forms.fieldsMinLength.name
                    })} />
                </>);
        }
    }

    return (
        <div className="Sign_up FORM">
			<h2> Sign-up to Coupon System</h2>
            <form onSubmit={handleSubmit(send)}>

                {requiredFields()}

                <input type="tel" className="FIELD" placeholder="telephone" {...register("telephone",{
                    required:false,
                    minLength: apiGlobalLogic.forms.fieldsMinLength.telephone
                })} />

                <input type="email" className="FIELD" placeholder="email" {...register("email",{
                    required:true,
                    minLength:apiGlobalLogic.forms.fieldsMinLength.email
                })} />

                <input type="password" className="FIELD" placeholder="password" {...register("password",{
                    required:true,
                    minLength:apiGlobalLogic.forms.fieldsMinLength.password
                })} />

                <a onClick={() => {
                    reset();
                    setClientType(ClientType.CUSTOMER);
                }} className="ClearForm">reset form</a>
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

export default Sign_up;