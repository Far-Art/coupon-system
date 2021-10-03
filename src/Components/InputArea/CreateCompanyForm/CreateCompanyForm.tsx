import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { ClientInfoModel } from "../../../Models/ClientInfoModel";
import { ClientType } from "../../../Models/ClientType";
import ApiGlobalLogic from "../../../Services/ApiGlobalLogic";
import GlobalDataStreamer from "../../../Services/GlobalDataStreamer";
import "./CreateCompanyForm.css";

export default function CreateCompanyForm(): JSX.Element {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ClientInfoModel>({
        defaultValues: { clientType: ClientType.COMPANY, active: true },
    });

    const send = (company: ClientInfoModel) => {
        GlobalDataStreamer.addCompany(company);
    }

    return (
        <div className="CreateCompanyForm FORM">
            <h2> Create new company </h2>
            <form onSubmit={handleSubmit(send)}>
                <div className="InputFieldsContainer">

                    {/* company name */}
                    <input maxLength={ApiGlobalLogic.items.company.fieldsMaxLength.name} type="text" className="FIELD" placeholder="company name" {...register("name", {
                        required: {
                            value: true,
                            message: "Company name required"
                        },
                        minLength: {
                            value: ApiGlobalLogic.items.company.fieldsMinLength.name,
                            message: ApiGlobalLogic.errorDescriptions.minLength.companyName
                        }
                    })} />
                    {errors.name && <p className="Error">{errors.name.message}</p>}

                    {/* company email */}
                    <input maxLength={ApiGlobalLogic.forms.fieldsMaxLength.email} type="email" className="FIELD" placeholder="company email" {...register("email", {
                        required: {
                            value: true,
                            message: "Company email required"
                        },
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

                    {/* company password */}
                    <input maxLength={ApiGlobalLogic.forms.fieldsMaxLength.password} type="text" className="FIELD" placeholder="company password" {...register("password", {
                        required: {
                            value: true,
                            message: "Company password required"
                        },
                        minLength: {
                            value: ApiGlobalLogic.forms.fieldsMinLength.password,
                            message: ApiGlobalLogic.errorDescriptions.minLength.password
                        },
                        pattern: {
                            value: ApiGlobalLogic.patterns.regex.password,
                            message: ApiGlobalLogic.errorDescriptions.badPattern.password
                        }
                    })} />
                    {errors.password && <p className="Error">{errors.password.message}</p>}

                    <br />
                    <button
                        type="reset"
                        onClick={() => {
                            reset();
                        }}
                        className="BUTTON__AS_LINK">reset form</button>
                    <br />

                    <button type="submit" className="FIELD LINK APP__BUTTON">Create</button>
                </div>
            </form>
        </div>
    );
}