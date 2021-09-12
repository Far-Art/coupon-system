import { NavLink } from "react-router-dom";
import { logoutAction } from "../../../Redux/Actions/ClientAction";
import {persistor, store} from "../../../Redux/Store/Store";
import GlobalDataStreamer from "../../../Services/GlobalDataStreamer";
import { RouteUrls } from "../../../Services/RouteUrls";
import "./Logout.css";

function Logout(): JSX.Element {
    
    function clearState(){
        persistor.pause();
        persistor.purge();
        persistor.persist();
        store.dispatch(logoutAction());
    }

    function sendLogout(){
        GlobalDataStreamer.logout();
    }

    return (
        <section className="Logout">
			<NavLink to={RouteUrls.HOME}>
                <button onClick={() => {
                    sendLogout();
                    clearState();
                }} className="APP__BUTTON" type="button">Logout</button>
            </NavLink>
        </section>
    );
}

export default Logout;