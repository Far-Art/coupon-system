import { NavLink } from "react-router-dom";
import { ApisUrls } from "../../../Services/ApisUrls";
import Cart from "../Cart/Cart";
import Menu from "../Menu/Menu";
import "./NavBar.css";

function NavBar(): JSX.Element {
    return (
        <div className="NavBar TRANSPARENT">
            <p>Hello {} guest, please <NavLink className="LINK" to={ApisUrls.LOGIN} exact>Login</NavLink> or <NavLink className="LINK" to={ApisUrls.SIGNUP} exact>Sign-up</NavLink></p>
            <Menu />
            <Cart />
        </div>
    );
}

export default NavBar;
