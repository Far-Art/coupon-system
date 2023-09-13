import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./HelpComponent.css";

export default function HelpComponent(): JSX.Element {
    const [displayed, setDisplayed] = useState<"HelpDisplayed" | "">("");

    function handleDisplayed() {
        if (displayed === "HelpDisplayed") {
            setDisplayed("");
        } else {
            setDisplayed("HelpDisplayed");
        }
    }
    return (
        <>
            <div
                className="HelpComponent APP__BUTTON"
                onClick={() => handleDisplayed()}>
                {displayed === "HelpDisplayed" ? "X" : "?"}
            </div>
            <div className={`HelpComponentContainer ${displayed}`}>
                <div
                    className={`HelpComponentContent`}>
                    <h2>Welcome to Coupon as art pet project</h2>
                    <p>In order to start, Login as client</p>
                    <ul>
                        <li>You can login as demo client by clicking on login button and select desired client below</li>
                        <br />
                        <li onClick={() => { setDisplayed("") }}><NavLink to="/documentation">To full documentation page click here</NavLink></li>
                    </ul>
                </div>
            </div>
        </>
    );
}