import { useState } from "react";
import { useEffect } from "react";
import {store} from "../../../../Redux/Store/Store";
import MultiRangeSlider from "../RangeFilter/MultiRangeSlider";
import "./PriceFilter.css";

function PriceFilter(): JSX.Element {

    const [priceArr, setPriceArr] = useState([0, 0]);

    useEffect(() => {
        store.subscribe(() => {
            const pricesArr:number[] = store.getState().couponsAppState.appCouponsList.map(c => c.price);

            setPriceArr(
                [Math.min(...pricesArr), Math.max(...pricesArr)]
            )
        });
    })
    
    return (
        <div className="PriceFilter">
            <p>Price</p>
			<MultiRangeSlider minValue={priceArr[0]} maxValue={priceArr[1]} />
        </div>
    );
}

export default PriceFilter;
