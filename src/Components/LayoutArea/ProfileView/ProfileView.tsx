import { useEffect } from "react";
import { ClientInfoModel } from "../../../Models/ClientInfoModel";
import { ClientType } from "../../../Models/ClientType";
import { useAppSelector } from "../../../Redux/Hooks/hooks";
import GlobalDataStreamer from "../../../Services/GlobalDataStreamer";
import ClientCard from "../ClientCard/ClientCard";
import CouponsContainer from "../../CouponsArea/CouponsContainer/CouponsContainer";
import "./ProfileView.css";

export default function ProfileView(): JSX.Element {

    const client = useAppSelector(state =>
        state.currentClientState.client
    );

    const clientCoupons = useAppSelector(state =>
        state.clientCouponsState.clientCouponsList
    );

    useEffect(() => {
        GlobalDataStreamer.fetchClientInfo();
    }, []);

    return (
        <div className="ProfileView">
            <ClientCard client={client as ClientInfoModel} />
            {client?.clientType === ClientType.CUSTOMER && <CouponsContainer ignoreFields={["id", "companyemail", "startdate", "enddate", "amount"]} couponsList={clientCoupons} />}
        </div>
    );
}