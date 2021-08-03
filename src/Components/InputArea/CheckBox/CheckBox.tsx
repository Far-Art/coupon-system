import React from "react";
import "./CheckBox.css";

function CheckBox(): JSX.Element {

    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked(!checked);
      };

    return (
        
        <div className="CheckBox">
			<label>
                <input 
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                />
                Some Value
            </label>
        </div>
    );
}

export default CheckBox;
