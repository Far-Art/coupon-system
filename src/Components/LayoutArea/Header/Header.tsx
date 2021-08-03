import "./Header.css";
import logo from "../../../Assets/Logo/icon.svg"
import { NavLink } from "react-router-dom";
import { ApisUrls } from "../../../Services/ApisUrls";

function Header(): JSX.Element {
    return (
        <div className="Header TRANSPARENT">
            <NavLink to={ApisUrls.HOME}>
                <img id="logo" src={logo} alt="logo" />
                <h1>Coupon As Art</h1>
            </NavLink>
        </div>
    );
}

export default Header;
