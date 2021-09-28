import { store } from "../../../../Redux/Store/Store";
import "./IdFilter.css";
import { Control, useForm, useWatch } from "react-hook-form";
import { addFilter } from "../../../../Redux/Actions/FilterAction";
import { FilterType } from "../../../../Models/FilterType";
import { useAppSelector } from "../../../../Redux/Hooks/hooks";
import { useEffect } from "react";

interface FormInput {
    id: number
}

export default function IdFilter(): JSX.Element {

    const { register, control, handleSubmit, reset } = useForm<FormInput>();

    const isActive = useAppSelector(state =>
        state.filterAppState.filtersActive
    );

    function IdFilterWatched({ control }: { control: Control<FormInput> }) {

        const id = useWatch({
            control, name: "id", defaultValue: -99
        });
        return <p>Clients id {id >= 0 ? ": " + id : ""}</p>
    }

    const onSubmit = (data: FormInput) => {
        store.dispatch(addFilter(FilterType.ID, data.id));
    }

    useEffect(() => {
        if (!isActive) {
            reset();
        }

    }, [isActive, reset])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="IdFilter">
            <IdFilterWatched control={control} />
            <input placeholder="clients id query" maxLength={20} className="FIELD" {...register("id")} />
            <button className="APP__BUTTON" type="submit">Submit</button>
        </form>
    );
}