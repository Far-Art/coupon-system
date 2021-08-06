import CategoriesFilter from "../Filters/CategoriesFilter/CategoriesFilter";
import MultiRangeSlider from "../RangeFilter/MultiRangeSlider";
import "./FiltersContainer.css";

function FiltersContainer(): JSX.Element {
    return (
        <div className="FiltersContainer">
            <CategoriesFilter />
            <MultiRangeSlider name="Price" minValue={0} maxValue={500} />
        </div>
    );
}

export default FiltersContainer;
