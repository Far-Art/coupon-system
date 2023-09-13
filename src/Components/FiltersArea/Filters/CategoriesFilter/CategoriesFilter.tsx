import { useEffect, useState } from "react";
import { FilterType } from "../../../../Models/FilterType";
import CheckBox from "../../../InputArea/CheckBox/CheckBox";
import "./CategoriesFilter.css";

interface CategoriesFilterProps {
    categories: string[];
}

export default function CategoriesFilter(props: CategoriesFilterProps): JSX.Element {

    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        setCategories(Array.from(new Set(props.categories)));
    }, [props.categories])

    return (
        <div className="CategoriesFilter">
            <p>Categories</p>
            {categories.map(category => <CheckBox key={category} filterKey={FilterType.CATEGORIES} filterValue={category} />)}
        </div>
    );
}