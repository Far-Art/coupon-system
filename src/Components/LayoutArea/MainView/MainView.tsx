import { useEffect } from "react";
import { useState } from "react";
import GlobalFetcher from "../../../Services/GlobalFetcher";
import { ClientType } from "../../../Models/ClientType";
import { useAppSelector } from "../../../Redux/Hooks/hooks";
import {store} from "../../../Redux/Store/Store";
import CouponsContainer from "../CouponsContainer/CouponsContainer";
import "./MainView.css";
import { CouponModel } from "../../../Models/CouponModel";

function MainView(): JSX.Element {

    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const [fetcher] = useState(new GlobalFetcher());
    const client = useAppSelector(state => 
        state.currentClientState.client
    );

    useEffect(() => {
        switch (client?.clientType) {
            case ClientType.COMPANY:
                fetcher.fetchCouponsByCompany().then(() => {
                    setCoupons(store.getState().clientCouponsState.clientCouponsList);
                });
                break;
            default:
                setCoupons(store.getState().couponsAppState.appCouponsList);
                break;
        }
    },[client, fetcher]);

    function render() { 
        switch (client?.clientType) {
            case ClientType.COMPANY:
                return <CouponsContainer couponsList={coupons} asList={true} editable={true} ignoreFields={["company"]} />;
            default:
                return <CouponsContainer couponsList={coupons} onlyValid={true} ignoreFields={["id", "companyEmail", "amount", "start"]} />;
        }
    }

    return (
        <div className="MainView">
            {render()}
        </div>
    );

}

export default MainView;