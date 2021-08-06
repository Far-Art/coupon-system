import axios from "axios";
import { useEffect } from "react";
import { CompanyModel } from "../../Models/CompanyModel";
import { CouponModel } from "../../Models/CouponModel";
import { CustomerModel } from "../../Models/CustomerModel";
import { fetchAllCompanies } from "../../Redux/Actions/CompanyAction";
import { fetchAllCoupons } from "../../Redux/Actions/CouponAction";
import { fetchAllCustomers } from "../../Redux/Actions/CustomerAction";
import store from "../../Redux/Store/Store";
import globals from "../../Services/Globals";

/* Fetch Data from db and update store when there is db change */
function State_Data_Fetcher() {

    async function fetchCustomers(){
        const response:any = await axios.get<CustomerModel[]>(globals.urls.customers);
        store.dispatch(fetchAllCustomers(response.data));
    }

    async function fetchCompanies(){
        const response:any = await axios.get<CompanyModel[]>(globals.urls.companies);
        store.dispatch(fetchAllCompanies(response.data));
    }

    async function fetchCoupons(){
        const response:any = await axios.get<CouponModel[]>(globals.urls.coupons);
        store.dispatch(fetchAllCoupons(response.data));
    }
    
    useEffect(() => {
        fetchCustomers();
        fetchCompanies();
        fetchCoupons();
    })

    return (
        null
    );

}

export default State_Data_Fetcher;
