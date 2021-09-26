import { NavLink } from "react-router-dom";
import { logoutAction } from "../../../Redux/Actions/ClientAction";
import { persistor, store } from "../../../Redux/Store/Store";
import GlobalDataStreamer from "../../../Services/GlobalDataStreamer";
import { RouteUrls } from "../../../Services/RouteUrls";
import "./Logout.css";

// dispatch logout action to server
function sendLogout() {
    GlobalDataStreamer.logout();
}

// clear state in local storage
function clearState() {
    persistor.pause();
    persistor.purge();
    persistor.persist();
    store.dispatch(logoutAction());
}

// logout
export function logout() {
    sendLogout();
    clearState();
}

export default function Logout(): JSX.Element {
    return (
        <section className="Logout">
            <NavLink to={RouteUrls.HOME}>
                <button onClick={() => {
                    logout();
                }} className="APP__BUTTON" type="button">Logout</button>
            </NavLink>
        </section>
    );
}