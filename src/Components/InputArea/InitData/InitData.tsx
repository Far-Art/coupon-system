import { useForm } from "react-hook-form";
import GlobalDataStreamer from "../../../Services/GlobalDataStreamer";
import "./InitData.css";

export default function InitData(): JSX.Element {

    const { register, handleSubmit, formState: { errors } } = useForm<{ numOfCustomers: number, numOfCompanies: number }>();

    const send = (props: { numOfCustomers: number, numOfCompanies: number }) => {
        GlobalDataStreamer.initData(props.numOfCustomers, props.numOfCompanies);
    }

    return (
        <div className="InitData">
            <h2> Push data to Database </h2>
            <form onSubmit={handleSubmit(send)}>

                <input type="number" className="FIELD" placeholder="num of customers" {...register("numOfCustomers", {
                    required: {
                        value: true,
                        message: "Num of customers required"
                    }
                })} />
                {errors.numOfCustomers && <p className="Error">{errors.numOfCustomers.message}</p>}

                <input type="number" className="FIELD" placeholder="num of companies" {...register("numOfCompanies", {
                    required: {
                        value: true,
                        message: "Num of companies required"
                    }
                })} />
                {errors.numOfCompanies && <p className="Error">{errors.numOfCompanies.message}</p>}

                <button type="submit" className="FIELD LINK APP__BUTTON">Push</button>
            </form>
        </div>
    );
}