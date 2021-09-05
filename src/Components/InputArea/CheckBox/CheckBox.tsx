import React, { ChangeEventHandler } from "react";
import { FilterTypes } from "../../../Models/FilterTypes";
import { addFilter, removeFilter } from "../../../Redux/Actions/FilterAction";
import {store} from "../../../Redux/Store/Store";
import "./CheckBox.css";

interface CheckBoxProps{
    filterKey:FilterTypes;
    filterValue:string | number;
    // checked?:boolean;
    // onChange?:ChangeEventHandler;
    changeEventHandler?:ChangeEventHandler;
}

function CheckBox({filterKey, filterValue}:CheckBoxProps): JSX.Element {

    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked(!checked);

        /* update filters global state */ 
        if(!checked){
            store.dispatch(addFilter(filterKey, filterValue));
        } else {
            store.dispatch(removeFilter(filterKey, filterValue));
        }
      };

    return (
        <div className="CheckBox">
			<label>
                <input 
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                />
                {filterValue}
            </label>
        </div>
    );
}

export default CheckBox;
