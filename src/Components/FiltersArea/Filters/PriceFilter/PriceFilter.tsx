import { useEffect, useState } from "react";
import { FilterType } from "../../../../Models/FilterType";
import { addFilter } from "../../../../Redux/Actions/FilterAction";
import { useAppSelector } from "../../../../Redux/Hooks/hooks";
import { store } from "../../../../Redux/Store/Store";
import "./PriceFilter.css";

interface PriceFilterProps {
    maxNumber: number;
}

export default function PriceFilter(props: PriceFilterProps): JSX.Element {

    const [value, setValue] = useState(0);

    const isActive = useAppSelector(state =>
        state.filterAppState.filtersActive
    );

    useEffect(() => {
        if (!isActive) {
            setValue(props.maxNumber);
        }
    }, [isActive, props.maxNumber])

    useEffect(() => {
        setValue(props.maxNumber);
    }, [props.maxNumber])

    function handleDispatchValue(event: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) {
        store.dispatch(addFilter(FilterType.PRICE, evalNumber(event.currentTarget.value)));
    }

    function handleCHange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(evalNumber(event.currentTarget.value));
    }

    function evalNumber(number: string | number) {
        if (typeof number === "number") {
            return Math.trunc(number);
        }
        return Math.trunc(parseFloat(number));
    }

    return (
        <div className="PriceFilter">
            <p>Price</p>
            <div className="PriceFilterContainer">
                <input className="PriceFilterRange"
                       onChange={(event) => handleCHange(event)}
                       value={value}
                       onTouchEnd={(event) => handleDispatchValue(event)}
                       onMouseUp={(event) => handleDispatchValue(event)}
                       min={0}
                       max={evalNumber(props.maxNumber) + 1}
                       type="range"></input>
                <span>{value === 0 ? "Free" : value}</span>
            </div>
        </div>
    );
}