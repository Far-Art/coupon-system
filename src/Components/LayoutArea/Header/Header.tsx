import "./Header.css";
import logo from "../../../Assets/Logo/icon.svg"
import { NavLink } from "react-router-dom";
import { ApisUrls } from "../../../Services/ApisUrls";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <NavLink to={ApisUrls.HOME}>
                <div className="Header_Background">
                    <img id="logo" src={logo} alt="logo" />
                    <h1>Coupon As Art</h1>
                </div>
            </NavLink>
        </div>
    );
}

export default Header;
