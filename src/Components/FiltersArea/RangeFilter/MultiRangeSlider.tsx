import "./MultiRangeSlider.css";
import PropTypes from "prop-types";
import { useState } from "react";

interface MultiRangeSliderProps {
    name:string;
    minValue?:number;
    maxValue?:number;
    defaultValue?:number;
}

function MultiRangeSlider(props:MultiRangeSliderProps): JSX.Element {
    // const MultiRangeSlider = ({min, max, onChange}) => {};
    
    // Set the type of each prop
    // MultiRangeSlider.propTypes = {
    //     min: PropTypes.number.isRequired,
    //     max: PropTypes.number.isRequired,
    //     onChange: PropTypes.func.isRequired
    // };

    // Creating the state variables
    // const [minVal, setMinVal] = useState(min);
    // const [maxVal, setMaxVal] = useState(max);


    return (
        <div className="MultiRangeSlider">
            double value range slider here
            <div className="slider-track" />
            <div className="slider-range" />
			<p>{props.name}</p>
            {/* <p>{props.minValue}</p> */}
            <input 
                type="range" 
                min={props.minValue} 
                max={props.maxValue} 
                value={props.defaultValue}
                className="value left-value"
            />
            <input 
                type="range" 
                min={props.minValue} 
                max={props.maxValue} 
                value={props.defaultValue}
                className="value right-value"
            />
            {/* <p>{props.maxValue}</p> */}
        </div>
    );
}

export default MultiRangeSlider;
