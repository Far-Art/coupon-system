import "./MultiRangeSlider.css";
import PropTypes from "prop-types";
import { useState } from "react";

interface MultiRangeSliderProps {
    name?:string;
    minValue:number;
    maxValue:number;
}

function MultiRangeSlider(props:MultiRangeSliderProps): JSX.Element {    

    return (
        <div className="MultiRangeSlider">
            <div className="slider-track" />
            <div className="slider-range" />
            <p>{props.minValue}</p>
            <input 
                type="range" 
                min={props.minValue} 
                max={props.maxValue} 
                className="value left-value"
            />
            <input 
                type="range" 
                min={props.minValue} 
                max={props.maxValue} 
                className="value right-value"
            />
            <p>{props.maxValue}</p>
        </div>
    );
}

export default MultiRangeSlider;
