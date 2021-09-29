import "./Header.css";
import logo from "../../../Assets/Logo/logo-bordo.svg"
import { NavLink } from "react-router-dom";
import { RouteUrls } from "../../../Services/RouteUrls";
import { useAppSelector } from "../../../Redux/Hooks/hooks";
import { ClientType } from "../../../Models/ClientType";

export default function Header(): JSX.Element {

    const clientType = useAppSelector(state =>
        state.currentClientState.client?.clientType
    );

    return (
        <div className="Header">
            <NavLink to={RouteUrls.HOME}>
                <div className="Header_Background">
                    <img id="logo" className={clientType === ClientType.ADMIN ? "RotateLogo" : ""} src={logo} alt="logo" />
                    <h1>Coupons As Art</h1>
                </div>
            </NavLink>
        </div>
    );
}