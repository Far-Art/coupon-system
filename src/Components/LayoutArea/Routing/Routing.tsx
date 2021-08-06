import { Redirect, Route, Switch } from "react-router-dom";
import Page404 from "../../SharedArea/Page404/Page404";
import CompaniesContainer from "../CompaniesContainer/CompaniesContainer";
import CouponsContainer from "../CouponsContainer/CouponsContainer";
import CustomersContainer from "../CustomersContainer/CustomersContainer";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import Sign_up from "../Sign_up/Sign_up";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Switch>
                <Route path="/home" component={Home} exact />
                <Route path="/coupons" component={CouponsContainer} exact />
                <Route path="/coupons/:id" component={CouponsContainer} exact />
                <Route path="/coupons/:name" component={CouponsContainer} exact />
                <Route path="/customers" component={CustomersContainer} exact />
                <Route path="/companies" component={CompaniesContainer} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/signup" component={Sign_up} exact />
                <Route path="/logout" component={Logout} exact />
                <Redirect from="/" to="/home" exact/>
                <Route component={Page404} exact />
            </Switch>
        </div>
    );
}

export default Routing;
