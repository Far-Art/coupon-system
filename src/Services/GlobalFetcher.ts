import axios from "axios";
import { CompanyModel } from "../Models/CompanyModel";
import { CouponModel } from "../Models/CouponModel";
import { CustomerModel } from "../Models/CustomerModel";
import { fetchAllCompanies } from "../Redux/Actions/CompanyAction";
import { fetchAllCoupons, fetchCouponsByCompany, fetchCouponsByCustomer } from "../Redux/Actions/CouponAction";
import { fetchAllCustomers } from "../Redux/Actions/CustomerAction";
import {store} from "../Redux/Store/Store";
import globals from "./Globals";
import coupons from "../dummycoupons.json";

/* Fetch Data from db and update store when there is db change */
export default class GlobalFetcher {

    public async fetchAllCustomers(){
        const response:any = await axios.get<CustomerModel[]>(globals.urls.customers, this.appendBody());
        store.dispatch(fetchAllCustomers(response.data));
    }

    public async fetchAllCompanies(){
        const response:any = await axios.get<CompanyModel[]>(globals.urls.companies, this.appendBody());
        store.dispatch(fetchAllCompanies(response.data));
    }

    public async fetchAllCoupons(){
        const response:any = await axios.get<CouponModel[]>(globals.urls.coupons);        
        store.dispatch(fetchAllCoupons(response.data));
    }

    // for testing
    // public fetchAllCoupons(){
    //     console.log("in convert");
    //     const couponsList = coupons as unknown;
    //     store.dispatch(fetchAllCoupons(couponsList as CouponModel[]));
    // }

    public async fetchCouponsByCompany(){
        try {
            const response:any = await axios.get<CouponModel[]>(globals.urls.companies + "/coupons", this.appendBody());
            store.dispatch(fetchCouponsByCompany(response.data));
        } catch (error:any) {
            console.log(error.response.data);
        }

    }

    public async fetchCouponsByCustomer(){
        const response:any = await axios.get<CouponModel[]>(globals.urls.customers + "/coupons", this.appendBody());
        
        store.dispatch(fetchCouponsByCustomer(response.data));
    }

    // TODO FIX THIS METHOD
    public async purchaseCoupon(couponId:number){
        const response:any = await axios.post(globals.urls.purchaseSingle + "/" + couponId, {} , {
            headers:{
                "Authorization": store.getState().currentClientState.token
            }
        });
        store.dispatch(fetchCouponsByCustomer(response.data));
    }

    private appendBody(){
        return {
            headers:{
                "authorization": store.getState().currentClientState.token
            }
        }
    }
}