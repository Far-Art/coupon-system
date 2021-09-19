import "./Header.css";
import logo from "../../../Assets/Logo/logo-bordo.svg"
import { NavLink } from "react-router-dom";
import { RouteUrls } from "../../../Services/RouteUrls";

export default function Header(): JSX.Element {
    return (
        <div className="Header">
            <NavLink to={RouteUrls.HOME}>
                <div className="Header_Background">
                    <img id="logo" src={logo} alt="logo" />
                    <h1>Coupon As Art</h1>
                </div>
            </NavLink>
        </div>
    );
}