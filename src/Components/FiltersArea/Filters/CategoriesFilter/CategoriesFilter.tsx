import { useEffect } from "react";
import { useState } from "react";
import { FilterTypes } from "../../../../Models/FilterTypes";
import store from "../../../../Redux/Store/Store";
import CheckBox from "../../../InputArea/CheckBox/CheckBox";
import "./CategoriesFilter.css";

function CategoriesFilter(): JSX.Element {

   
    const distinctCategories = categoriesAsSet(store.getState().couponsState.coupons);
    const [, setCategories] = useState(distinctCategories);

    useEffect(() => {
        store.subscribe(() => setCategories(categoriesAsSet(store.getState().couponsState.coupons)));
    })

    function categoriesAsSet(arr: any[]){
        return [...new Set(arr.map(c => formatName(c.category)))];
    }

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
			{distinctCategories.map(c => <CheckBox key={c} filterKey={FilterTypes.CATEGORIES} filterValue={c} />)}
        </div>
    );
}

export default CategoriesFilter;