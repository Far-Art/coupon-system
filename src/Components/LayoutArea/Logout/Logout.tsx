import { NavLink, Redirect } from "react-router-dom";
import { logoutAction } from "../../../Redux/Actions/ClientAction";
import {persistor, store} from "../../../Redux/Store/Store";
import { RouteUrls } from "../../../Services/RouteUrls";
import "./Logout.css";

function Logout(): JSX.Element {
    // TODO make state clear on logout and redirect to home page
    function clearState(){
        persistor.pause();
        persistor.purge();
        persistor.persist();
        store.dispatch(logoutAction());
    }

    return (
        <section className="Logout">
			<NavLink to={RouteUrls.HOME}>
                <button onClick={() => clearState()} className="APP__BUTTON" type="button">Logout</button>
            </NavLink>
        </section>
    );
}

export default Logout;