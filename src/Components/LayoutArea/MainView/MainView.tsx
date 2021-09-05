import { useEffect } from "react";
import { useState } from "react";
import GlobalFetcher from "../../../Services/GlobalFetcher";
import { ClientType } from "../../../Models/ClientType";
import { useAppSelector } from "../../../Redux/Hooks/hooks";
import { CurrentClientAppState } from "../../../Redux/States/CurrentClientAppState";
import {store} from "../../../Redux/Store/Store";
import CouponsContainer from "../CouponsContainer/CouponsContainer";
import "./MainView.css";
import { CouponModel } from "../../../Models/CouponModel";

function MainView(): JSX.Element {
    // TODO check if current client state can be deleted?
    const [currentClient, setCurrentClient] = useState<CurrentClientAppState>({client : undefined});

    const [coupons, setCoupons] = useState<CouponModel[]>([]);

    const [fetcher] = useState(new GlobalFetcher());

    const client = useAppSelector(state => state.currentClientState.client);

    /* fetch all coupons on component mount*/
    useEffect(() => {
        console.log("useEffect fetching all coupons");
        fetcher.fetchAllCoupons().then(() => {
            setCoupons(store.getState().couponsAppState.appCouponsList);
        });
    },[fetcher]);


    useEffect(() => {
        setCurrentClient({client : client}); // first run is undefined
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
        switch (currentClient.client?.clientType) {
            case ClientType.COMPANY:
                return <CouponsContainer couponsList={coupons}/>;
            default:
                return <CouponsContainer couponsList={coupons} />;
        }
    }

    return (
        <div className="MainView">
            {render()}
        </div>
    );

}

export default MainView;