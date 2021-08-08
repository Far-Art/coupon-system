import store from "../../../../Redux/Store/Store";
import "./FreeTextFilter.css";
import { Control, useForm, useWatch  } from "react-hook-form";
import { addFilter } from "../../../../Redux/Actions/FilterAction";
import { FilterTypes } from "../../../../Models/FilterTypes";

interface FormInput {
    freeText:string
}

function FreeTextFilterWatched({control}:{control: Control<FormInput>}){ 
    const freeText = useWatch({
        control, name: "freeText", defaultValue:""
    });
    // store.dispatch(addFilter(FilterTypes.TEXT, freeText));
    return <p>Watch: {freeText}</p>
}

function FreeTextFilter(): JSX.Element {

    const {register, control, handleSubmit} = useForm<FormInput>();

    const onSubmit = (data: FormInput) => {
        store.dispatch(addFilter(FilterTypes.TEXT, data.freeText));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="FreeTextFilter">
            <p>free text</p>
            <input maxLength={20} className="FIELD" {...register("freeText")} />
            <input className="LINK FIELD" type="submit" />
            <FreeTextFilterWatched control={control} />
        </form>
    );
}

export default FreeTextFilter;
