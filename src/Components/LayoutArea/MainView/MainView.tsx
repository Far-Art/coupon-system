import { useEffect } from "react";
import GlobalDataStreamer from "../../../Services/GlobalDataStreamer";
import { ClientType } from "../../../Models/ClientType";
import { useAppSelector } from "../../../Redux/Hooks/hooks";
import CouponsContainer from "../CouponsContainer/CouponsContainer";
import "./MainView.css";
import { CouponModel } from "../../../Models/CouponModel";
import { CompanyModel } from "../../../Models/CompanyModel";

export default function MainView(): JSX.Element {

    const client = useAppSelector(state => 
        state.currentClientState.client
    );

    const clientCoupons:CouponModel[] = useAppSelector(state => 
        state.clientCouponsState.clientCouponsList
    );

    const appCoupons:CouponModel[] = useAppSelector(state => 
        state.couponsAppState.appCouponsList
    );

    useEffect(() => {
        GlobalDataStreamer.fetchAllCategories();
    },[])

    useEffect(() => {
        switch (client?.clientType) {
            case ClientType.COMPANY:
                if((client as CompanyModel).active){
                    GlobalDataStreamer.fetchCouponsByCompany();
                }
                break;
            default:
                GlobalDataStreamer.fetchAllCoupons();
                break;
        }
    },[client]);

    function render() { 
        switch (client?.clientType) {
            case ClientType.COMPANY:
                if((client as CompanyModel).active){
                    return <CouponsContainer couponsList={clientCoupons} asList={true} editable={true} ignoreFields={["companyentity", "companyemail", "companyname"]} />;
                } else {
                    return <div className="Pending">Your company is pending for admin approval</div>
                }
            default:
                return <CouponsContainer couponsList={appCoupons} onlyValid={true} ignoreFields={["id", "companyemail", "amount", "startdate"]} />;
        }
    }

    return (
        <div className="MainView">
            {render()}
        </div>
    );
}