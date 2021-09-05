import { Redirect, Route, Switch } from "react-router-dom";
import { RouteUrls } from "../../../Services/RouteUrls";
import Page404 from "../../SharedArea/Page404/Page404";
import CompaniesContainer from "../CompaniesContainer/CompaniesContainer";
import CouponsContainer from "../CouponsContainer/CouponsContainer";
import CustomersContainer from "../CustomersContainer/CustomersContainer";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import MainView from "../MainView/MainView";
import Sign_up from "../Sign_up/Sign_up";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Switch>
                <Route path={RouteUrls.HOME} component={MainView} exact />
                <Route path={RouteUrls.COUPONS} component={CouponsContainer} exact />
                <Route path={RouteUrls.COUPONS + ":id"} component={CouponsContainer} exact />
                <Route path={RouteUrls.CUSTOMERS} component={CustomersContainer} exact />
                <Route path={RouteUrls.COMPANIES} component={CompaniesContainer} exact />
                <Route path={RouteUrls.LOGIN} component={Login} exact />
                <Route path={RouteUrls.SIGNUP} component={Sign_up} exact />
                <Route path={RouteUrls.LOGOUT} component={Logout} exact />
                <Redirect from="/" to={RouteUrls.HOME} exact/>
                <Route component={Page404} exact />
            </Switch>
        </div>
    );
}

export default Routing;