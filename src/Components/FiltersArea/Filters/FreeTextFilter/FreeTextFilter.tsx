import {store} from "../../../../Redux/Store/Store";
import "./FreeTextFilter.css";
import { Control, useForm, useWatch  } from "react-hook-form";
import { addFilter } from "../../../../Redux/Actions/FilterAction";
import { FilterType } from "../../../../Models/FilterType";
import { useAppSelector } from "../../../../Redux/Hooks/hooks";
import { useEffect } from "react";

interface FormInput {
    freeText:string
}

export default function FreeTextFilter(): JSX.Element {

    const {register, control, handleSubmit, reset} = useForm<FormInput>();

    const isActive = useAppSelector(state => 
        state.filterAppState.filtersActive
    );

    function FreeTextFilterWatched({control}:{control: Control<FormInput>}){ 

        const freeText = useWatch({
            control, name: "freeText", defaultValue:""
        });
        return <p>Free Text {freeText.length > 0 ? ": " + freeText: freeText}</p>
    }

    const onSubmit = (data: FormInput) => {
        store.dispatch(addFilter(FilterType.TEXT, data.freeText));
    }

    useEffect(() => {
        if(!isActive){
            reset();
        }
        
    },[isActive, reset])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="FreeTextFilter">
            <FreeTextFilterWatched control={control} />
            <input placeholder="type query" maxLength={20} className="FIELD" {...register("freeText")} />
            <button className="APP__BUTTON" type="submit">Submit</button>
            
        </form>
    );
}