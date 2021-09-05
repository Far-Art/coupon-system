import { clearFilters } from "../../../Redux/Actions/FilterAction";
import {store} from "../../../Redux/Store/Store";
import UserLayoutPreferences from "../../LayoutArea/UserLayoutConfig/UserLayoutPreferences";
import CategoriesFilter from "../Filters/CategoriesFilter/CategoriesFilter";
import FreeTextFilter from "../Filters/FreeTextFilter/FreeTextFilter";
import PriceFilter from "../Filters/PriceFilter/PriceFilter";
import "./FiltersContainer.css";

function FiltersContainer(): JSX.Element {

    const clearFunction = () => {
        store.dispatch(clearFilters());
    }
    return (
        <div className="FiltersContainer">
            <CategoriesFilter />
            <PriceFilter />
            <FreeTextFilter />
            <UserLayoutPreferences />
            <button className="LINK" onClick={clearFunction}>Clear filters</button>
        </div>
    );
}

export default FiltersContainer;
