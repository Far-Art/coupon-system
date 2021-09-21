import { useState } from "react";
import { FilterType } from "../../../../Models/FilterType";
import CheckBox from "../../../InputArea/CheckBox/CheckBox";
import "./CategoriesFilter.css";

interface CategoriesFilterProps {
    categories:string[];
}

export default function CategoriesFilter(props:CategoriesFilterProps): JSX.Element {

    const [categories] = useState<string[]>(Array.from(new Set(props.categories)));

    return (
        <div className="CategoriesFilter">
            <p>Categories</p>
			{categories.map(c => <CheckBox key={c} filterKey={FilterType.CATEGORIES} filterValue={c} />)}
        </div>
    );
}