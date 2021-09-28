import { Redirect, Route, Switch } from "react-router-dom";
import { ClientInfoModel } from "../../../Models/ClientInfoModel";
import { ClientType } from "../../../Models/ClientType";
import { useAppSelector } from "../../../Redux/Hooks/hooks";
import { RouteUrls } from "../../../Services/RouteUrls";
import Cart from "../Cart/Cart";
import CreateCompanyForm from "../../InputArea/CreateCompanyForm/CreateCompanyForm";
import CreateCouponForm from "../../InputArea/CreateCouponForm/CreateCouponForm";
import CreateCustomerForm from "../../InputArea/CreateCustomerForm/CreateCustomerForm";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import MainView from "../MainView/MainView";
import ProfileView from "../ProfileView/ProfileView";
import CreditsPage from "../CreditsPage/CreditsPage";

export default function Routing(): JSX.Element {
    const client = useAppSelector(state =>
        state.currentClientState.client
    );

    return (
        <div className="Routing">
            <Switch>
                <Route path={RouteUrls.HOME} component={MainView} exact />
                <Route path={"/credits"} component={CreditsPage} exact />
                {client !== undefined && <Route path={RouteUrls.PROFILE} component={ProfileView} exact />}
                {(client === undefined || client?.clientType === ClientType.CUSTOMER) && <Route path={RouteUrls.CART} component={Cart} exact />}
                {(client as ClientInfoModel)?.active && client?.clientType === ClientType.COMPANY && <Route path={RouteUrls.CREATE_COUPON} component={CreateCouponForm} exact />}
                {client?.clientType === ClientType.ADMIN && <Route path={RouteUrls.CREATE_COMPANY} component={CreateCompanyForm} exact />}
                {client?.clientType === ClientType.ADMIN && <Route path={RouteUrls.CREATE_CUSTOMER} component={CreateCustomerForm} exact />}
                <Redirect from="/" to={RouteUrls.HOME} exact />
                <Route>
                    <EmptyView text="Page not found" />
                </Route>
            </Switch>
        </div>
    );
}