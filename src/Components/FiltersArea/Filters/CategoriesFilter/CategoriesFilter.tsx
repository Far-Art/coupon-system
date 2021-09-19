import { useState } from "react";
import { FilterType } from "../../../../Models/FilterType";
import CheckBox from "../../../InputArea/CheckBox/CheckBox";
import "./CategoriesFilter.css";

interface CategoriesFilterProps {
    categories:string[];
}

function CategoriesFilter(props:CategoriesFilterProps): JSX.Element {

    const [categories] = useState<string[]>(Array.from(new Set(props.categories)));

    function formatName(value:string){
        let newString:string = value.substring(0,1).toUpperCase();
        newString += value.substring(1).toLowerCase();
        if(newString.includes("_")){
            return newString.replace("_", " ");
        }
        return newString;
    }

    return (
        <div className="CategoriesFilter">
            <p>Categories</p>
			{categories.map(c => <CheckBox key={c} filterKey={FilterType.CATEGORIES} filterValue={c} />)}
        </div>
    );
}

export default CategoriesFilter;