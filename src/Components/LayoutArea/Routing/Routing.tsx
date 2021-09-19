import { Redirect, Route, Switch } from "react-router-dom";
import { ClientInfoModel } from "../../../Models/ClientInfoModel";
import { ClientType } from "../../../Models/ClientType";
import { useAppSelector } from "../../../Redux/Hooks/hooks";
import { RouteUrls } from "../../../Services/RouteUrls";
import Cart from "../Cart/Cart";
import CompaniesContainer from "../CompaniesContainer/CompaniesContainer";
import CouponsContainer from "../CouponsContainer/CouponsContainer";
import CreateCompanyForm from "../CreateCompanyForm/CreateCompanyForm";
import CreateCouponForm from "../CreateCouponForm/CreateCouponForm";
import CreateCustomerForm from "../CreateCustomerForm/CreateCustomerForm";
import CustomersContainer from "../CustomersContainer/CustomersContainer";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import MainView from "../MainView/MainView";
import ProfileView from "../ProfileView/ProfileView";
import Sign_up from "../Sign_up/Sign_up";

function Routing(): JSX.Element {
    const client = useAppSelector(state => 
        state.currentClientState.client
    );
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
                <Route path={RouteUrls.CART} component={Cart} exact />
                <Route path={RouteUrls.PROFILE} component={ProfileView} exact />
                {(client as ClientInfoModel)?.active && client?.clientType === ClientType.COMPANY && <Route path={RouteUrls.CREATE_COUPON} component={CreateCouponForm} exact />}
                {client?.clientType === ClientType.ADMIN && <Route path={RouteUrls.CREATE_COMPANY} component={CreateCompanyForm} exact />}
                {client?.clientType === ClientType.ADMIN && <Route path={RouteUrls.CREATE_CUSTOMER} component={CreateCustomerForm} exact />}
                <Redirect from="/" to={RouteUrls.HOME} exact/>
                <Route>
                    <EmptyView text="Page not found" />
                </Route>
            </Switch>
        </div>
    );
}

export default Routing;