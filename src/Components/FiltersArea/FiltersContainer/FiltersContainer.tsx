import { useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import { clearFilters } from "../../../Redux/Actions/FilterAction";
import {store} from "../../../Redux/Store/Store";
import UserLayoutPreferences from "../../LayoutArea/UserLayoutConfig/UserLayoutPreferences";
import CategoriesFilter from "../Filters/CategoriesFilter/CategoriesFilter";
import CompaniesFilter from "../Filters/CompaniesFilter/CompaniesFilter";
import FreeTextFilter from "../Filters/FreeTextFilter/FreeTextFilter";
import PriceFilter from "../Filters/PriceFilter/PriceFilter";
import "./FiltersContainer.css";

interface FiltersContainerProps {
    coupons: CouponModel[];
}

export default function FiltersContainer(props:FiltersContainerProps): JSX.Element {

    const clearFunction = () => {
        store.dispatch(clearFilters());
    }

    const [view, setView] = useState<string>();

    const toggleView = () => {
        if(view === "ShowFiltersContainer"){
            setView("");
        } else {
            setView("ShowFiltersContainer");
        }
    }

    return (
        <section className={"FiltersContainerSection"}>
            <div className={"FiltersContainer " + view}>
                <div className="FiltersView">
                    <CategoriesFilter categories={props.coupons.map(c => c.category)} />
                    <CompaniesFilter companies={props.coupons.map(c => c.companyName)} />
                    <PriceFilter maxNumber={Math.max(...props.coupons.map(c => c.price))} />
                    <FreeTextFilter />
                    <UserLayoutPreferences />
                </div>
                <button className="ClearFiltersButton APP__BUTTON" onClick={clearFunction}>Clear filters</button>
            </div>
            <button onClick={() => toggleView()} className="FiltersContainerButton  APP__BUTTON">
                <p className="FiltersText">{"filters"}</p> 
                <p className="FiltersArrow">{view === "" ? ">" : "<"}</p>
            </button>
        </section>
    );
}