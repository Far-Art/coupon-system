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
                    <p>In order to start Login as client</p>
                    <ul>
                        <li>You can register new customer or login to existing one</li>
                        <li>Existing Customer email: <span className="ImportantField">arturfarmanov91@gmail.com</span> password: <span className="ImportantField">1234aA </span></li>
                        <li>There is also an option to login as Admin</li>
                        <li>Existing Admin email: <span className="ImportantField">admin@admin.com</span> password: <span className="ImportantField">Admin123</span></li>
                        <br />
                        <li onClick={() => { setDisplayed("") }}><NavLink to="/documentation">To full documentation page click here</NavLink></li>
                    </ul>
                </div>
            </div>
        </>
    );
}