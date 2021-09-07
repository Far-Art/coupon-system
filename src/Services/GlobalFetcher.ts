import axios from "axios";
import { CompanyModel } from "../Models/CompanyModel";
import { CouponModel } from "../Models/CouponModel";
import { CustomerModel } from "../Models/CustomerModel";
import { fetchAllCompanies } from "../Redux/Actions/CompanyAction";
import { fetchAllCoupons, fetchCouponsByCompany, fetchCouponsByCustomer } from "../Redux/Actions/CouponAction";
import { fetchAllCustomers } from "../Redux/Actions/CustomerAction";
import {store} from "../Redux/Store/Store";
import globals from "./Globals";

/* Fetch Data from db and update store when there is db change */
export default class GlobalFetcher {

    public async fetchAllCustomers(){
        const response:any = await axios.get<CustomerModel[]>(globals.urls.customers);
        store.dispatch(fetchAllCustomers(response.data));
    }

    public async fetchAllCompanies(){
        const response:any = await axios.get<CompanyModel[]>(globals.urls.companies);
        store.dispatch(fetchAllCompanies(response.data));
    }

    public async fetchAllCoupons(){
        const response:any = await axios.get<CouponModel[]>(globals.urls.coupons);
        store.dispatch(fetchAllCoupons(response.data));
    }

    public async fetchCouponsByCompany(){
        const response:any = await axios.get<CouponModel[]>(globals.urls.companies + "/coupons");
        store.dispatch(fetchCouponsByCompany(response.data));
    }

    public async fetchCouponsByCustomer(){
        const response:any = await axios.get<CouponModel[]>(globals.urls.customers + "/coupons");
        store.dispatch(fetchCouponsByCustomer(response.data));
    }

    // TODO FIX THIS METHOD
    public async purchaseCoupon(couponId:number){
        const response:any = await axios.post<string>(globals.urls.purchaseSingle + "/" + couponId);
        // store.dispatch(fetchCouponsByCustomer(response.data));
        console.log(response.data);
    }
}