import { useEffect } from "react";
import GlobalDataStreamer from "../../../Services/GlobalDataStreamer";
import { ClientType } from "../../../Models/ClientType";
import { useAppSelector } from "../../../Redux/Hooks/hooks";
import CouponsContainer from "../../CouponsArea/CouponsContainer/CouponsContainer";
import "./MainView.css";
import { CouponModel } from "../../../Models/CouponModel";
import { CompanyModel } from "../../../Models/CompanyModel";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import ClientsContainer from "../ClientsContainer/ClientsContainer";
import { store } from "../../../Redux/Store/Store";
import { clearFilters } from "../../../Redux/Actions/FilterAction";

export default function MainView(): JSX.Element {

    const client = useAppSelector(state =>
        state.currentClientState.client
    );

    const clientCoupons: CouponModel[] = useAppSelector(state =>
        state.clientCouponsState.clientCouponsList
    );

    const appCoupons: CouponModel[] = useAppSelector(state =>
        state.couponsAppState.appCouponsList
    );

    useEffect(() => {
        store.dispatch(clearFilters());
        GlobalDataStreamer.fetchAllCategories();
    }, [])

    useEffect(() => {
        switch (client?.clientType) {
            case ClientType.COMPANY:
                if ((client as CompanyModel).active) {
                    GlobalDataStreamer.fetchCouponsByCompany();
                }
                break;
            case ClientType.CUSTOMER:
                GlobalDataStreamer.fetchCouponsByCustomer();
                GlobalDataStreamer.fetchAllCoupons();
                break;
            case ClientType.ADMIN:
                GlobalDataStreamer.fetchAllCustomers();
                GlobalDataStreamer.fetchAllCompanies();
                break;
            default:
                GlobalDataStreamer.fetchAllCoupons();
                break;
        }
    }, [client]);

    function render() {
        switch (client?.clientType) {
            case ClientType.COMPANY:
                if ((client as CompanyModel).active) {
                    return <CouponsContainer couponsList={clientCoupons} asList={true} editable={true} ignoreFields={["companyentity", "companyemail", "companyname"]} />;
                } else {
                    return <EmptyView text={"Your company is pending for admin approval"} />
                }
            case ClientType.ADMIN:
                return <ClientsContainer />
            default:
                return <CouponsContainer couponsList={appCoupons} onlyValid={true} ignoreFields={["companyemail", "amount"]} />;
        }
    }

    return (
        <div className="MainView">
            {render()}
        </div>
    );
}