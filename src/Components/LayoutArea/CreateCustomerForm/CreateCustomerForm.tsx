import { useForm } from "react-hook-form";
import { ClientInfoModel } from "../../../Models/ClientInfoModel";
import { ClientType } from "../../../Models/ClientType";
import ApiGlobalLogic from "../../../Services/ApiGlobalLogic";
import GlobalDataStreamer from "../../../Services/GlobalDataStreamer";
import "./CreateCustomerForm.css";

export default function CreateCustomerForm(): JSX.Element {

    const {register, handleSubmit, reset, formState: { errors }} = useForm<ClientInfoModel>({
        defaultValues: {clientType: ClientType.CUSTOMER, active: true},
    });

    const send = (customer:ClientInfoModel) => {
        GlobalDataStreamer.addCustomer(customer);
    }
    
    return (
        <div className="CreateCustomerForm FORM">
			<h2> Create new customer </h2>
            <form onSubmit={handleSubmit(send)}>

                {/* customers first name */}
                <input maxLength={ApiGlobalLogic.forms.fieldsMaxLength.companyName} type="text" className="FIELD" placeholder="customers first name" {...register("firstName" as "name",{
                    required:{
                        value: true,
                        message: "Customers first name required"},
                    minLength: {
                        value: ApiGlobalLogic.forms.fieldsMinLength.name,
                        message: ApiGlobalLogic.errorDescriptions.minLength.name}
                })} />
                {errors.name && <p className="Error">{errors.name.message}</p>}

                {/* customers last name */}
                <input maxLength={ApiGlobalLogic.forms.fieldsMaxLength.companyName} type="text" className="FIELD" placeholder="customers last name" {...register("lastName",{
                    required:{
                        value: true,
                        message: "Customers last name required"},
                    minLength: {
                        value: ApiGlobalLogic.forms.fieldsMinLength.name,
                        message: ApiGlobalLogic.errorDescriptions.minLength.name}
                })} />
                {errors.name && <p className="Error">{errors.name.message}</p>}

                {/* company email */}
                <input maxLength={ApiGlobalLogic.forms.fieldsMaxLength.email} type="email" className="FIELD" placeholder="customers email" {...register("email",{
                    required:{
                        value: true,
                        message: "Customers email required"},
                    minLength:{
                        value: ApiGlobalLogic.forms.fieldsMinLength.email,
                        message: ApiGlobalLogic.errorDescriptions.minLength.email},
                    pattern:{
                        value: ApiGlobalLogic.patterns.regex.email,
                        message: ApiGlobalLogic.errorDescriptions.badPattern.email}
                })} />
                {errors.email && <p className="Error">{errors.email.message}</p>}

                {/* company password */}
                <input maxLength={ApiGlobalLogic.forms.fieldsMaxLength.password} type="text" className="FIELD" placeholder="customers password" {...register("password",{
                    required:{
                        value: true,
                        message: "Customers password required"},
                    minLength:{
                        value: ApiGlobalLogic.forms.fieldsMinLength.password,
                        message: ApiGlobalLogic.errorDescriptions.minLength.password},
                    pattern:{
                        value: ApiGlobalLogic.patterns.regex.password,
                        message: ApiGlobalLogic.errorDescriptions.badPattern.password}
                })} />
                {errors.password && <p className="Error">{errors.password.message}</p>}

                <br/>
                <a onClick={() => {
                    reset();
                    }} 
                    className="ClearForm">reset form</a>
                <br/>

                <button type="submit" className="FIELD LINK APP__BUTTON">Create</button>
                
            </form>
        </div>
    );
}

function handleSubmit(send: any): import("react").FormEventHandler<HTMLFormElement> | undefined {
    throw new Error("Function not implemented.");
}