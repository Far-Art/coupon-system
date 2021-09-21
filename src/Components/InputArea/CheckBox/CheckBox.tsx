import { ChangeEventHandler, useEffect, useState } from "react";
import { FilterType } from "../../../Models/FilterType";
import { addFilter, removeFilter } from "../../../Redux/Actions/FilterAction";
import { useAppSelector } from "../../../Redux/Hooks/hooks";
import {store} from "../../../Redux/Store/Store";
import "./CheckBox.css";

interface CheckBoxProps{
    filterKey:FilterType;
    filterValue:string | number;
    changeEventHandler?:ChangeEventHandler;
}

export default function CheckBox({filterKey, filterValue}:CheckBoxProps): JSX.Element {

    const [checked, setChecked] = useState(false);

    const isActive = useAppSelector(state => 
        state.filterAppState.filtersActive
    );

    useEffect(() => {
        if(!isActive){
            setChecked(false);
        }
    },[isActive])

    const handleChange = () => {
        setChecked(!checked);
        /* update filters global state */ 
        if(!checked){
            store.dispatch(addFilter(filterKey, filterValue));
        } else {
            store.dispatch(removeFilter(filterKey, filterValue));
        }
    }

    return (
        <div className="CheckBox">
			<label className="container">
            {filterValue.toString().toLowerCase()}
                <input 
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                />
                <span className="checkmark"></span>
            </label>
        </div>
    );
}