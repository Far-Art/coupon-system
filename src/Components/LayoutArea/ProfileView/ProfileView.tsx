import { useEffect } from "react";
import { ClientInfoModel } from "../../../Models/ClientInfoModel";
import { ClientType } from "../../../Models/ClientType";
import { useAppSelector } from "../../../Redux/Hooks/hooks";
import GlobalDataStreamer from "../../../Services/GlobalDataStreamer";
import ClientCard from "../ClientCard/ClientCard";
import CouponsContainer from "../../CouponsArea/CouponsContainer/CouponsContainer";
import "./ProfileView.css";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import { store } from "../../../Redux/Store/Store";
import { clearFilters } from "../../../Redux/Actions/FilterAction";

export default function ProfileView(): JSX.Element {

    const client = useAppSelector(state =>
        state.currentClientState.client
    );

    const clientCoupons = useAppSelector(state =>
        state.clientCouponsState.clientCouponsList
    );

    useEffect(() => {
        store.dispatch(clearFilters());
        GlobalDataStreamer.fetchClientInfo();
        if (client?.clientType === ClientType.CUSTOMER) {
            GlobalDataStreamer.fetchCouponsByCustomer();
        }
    }, [clientCoupons.length, client?.clientType]);

    function handleClick() {
        GlobalDataStreamer.dismissAllCoupons();
    }

    function render() {
        return (
            <>
                <ClientCard client={client as ClientInfoModel} />
                {client?.clientType === ClientType.CUSTOMER && ((clientCoupons && clientCoupons.length) > 0 ? <CouponsContainer asList={true} insteadOfDisplayedText={"in possession"} ignoreFields={["id", "companyemail", "startdate", "enddate", "amount"]} couponsList={clientCoupons} /> : <EmptyView text="you have no purchased coupons" />)}
                {client?.clientType === ClientType.CUSTOMER && ((clientCoupons && clientCoupons.length) > 0 && <button onClick={() => handleClick()} className="APP__BUTTON">Use my coupons</button>)}
            </>
        );
    }

    return (
        <div className="ProfileView">
            {render()}
        </div>
    );
}