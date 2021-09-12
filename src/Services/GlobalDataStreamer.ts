import axios from "axios";
import { CompanyModel } from "../Models/CompanyModel";
import { CouponModel } from "../Models/CouponModel";
import { CustomerModel } from "../Models/CustomerModel";
import { fetchAllCompanies } from "../Redux/Actions/CompanyAction";
import { fetchAllCoupons, fetchCouponsByCompany} from "../Redux/Actions/CouponAction";
import { fetchAllCustomers } from "../Redux/Actions/CustomerAction";
import {store} from "../Redux/Store/Store";
import globals from "./Globals";
import { syncCategories } from "../Redux/Actions/CategoriesAction";
import { toast } from "react-toastify";
import { LoginRequestModel } from "../Models/LoginRequestModel";
import { LoginResponseModel } from "../Models/LoginResponseModel";
import { loginAction, logoutAction } from "../Redux/Actions/ClientAction";

// static class for data streams
export default class GlobalDataStreamer {

    public static async login(login:LoginRequestModel){
        this.emitToast("Login", "Loggin in...");
        return axios.post<LoginResponseModel>(globals.urls.login, login)
            .then((response) => {
                this.successToast("Login", "Welcome " + response.data.name);
                store.dispatch(loginAction(response.data));
                return true;
            })
            .catch((error:any) => {
                this.errorToast("Login", error);
                return false;
            });
    }

    public static async logout(){
        toast.dismiss();
        this.emitToast("Logout", "Loggin out...");
        return axios.delete<LoginResponseModel>(globals.urls.logout, this.appendBody())
            .then((response) => {
                this.warnToast("Logout", response.data);
                store.dispatch(logoutAction());
                return true;
            })
            .catch((error:any) => {
                this.errorToast("Logout", error);
                return false;
            });
    }

    public static async fetchAllCustomers(){
        await axios.get<CustomerModel[]>(globals.urls.customers, this.appendBody()).then((response) => {
            store.dispatch(fetchAllCustomers(response.data));
        });
    }

    public static async fetchAllCompanies(){
        await axios.get<CompanyModel[]>(globals.urls.companies, this.appendBody()).then((response) => {
            store.dispatch(fetchAllCompanies(response.data));
        });
    }

    public static async fetchAllCoupons(){
        await axios.get<CouponModel[]>(globals.urls.coupons).then((response) => {
            store.dispatch(fetchAllCoupons(response.data));
        });        
    }

    public static async fetchCouponsByCompany(){
        this.emitToast("allByCompany", "Fetching coupons ...");
        return axios.get<CouponModel[]>(globals.urls.companies + "/coupons", this.appendBody())
            .then((response) => {
                this.successToast("allByCompany", "Your coupons loaded");
                store.dispatch(fetchCouponsByCompany(response.data));
                return true;
            })
            .catch((error:any) => {
                this.errorToast("allByCompany", error);
                return false;
            });
    }

    public static async fetchCouponsByCustomer(){
        this.emitToast("allByCustomer", "Fetching coupons ...");
        return axios.get<CouponModel[]>(globals.urls.customers + "/coupons", this.appendBody())
            .then((response) => {
                this.successToast("allByCustomer", "Your coupons loaded");
                store.dispatch(fetchCouponsByCompany(response.data));
                return true;
            })
            .catch((error:any) => {
                this.errorToast("allByCustomer", error);
                return false;
            });
    }

    // TODO FIX THIS METHOD
    public static async purchaseCoupon(couponId:number){
        // const request = axios.post(globals.urls.purchaseSingle + "/" + couponId, {} , {
        //     headers:{
        //         "Authorization": store.getState().currentClientState.token
        //     }
        // });
        // store.dispatch(fetchCouponsByCustomer(response.data));
        // this.emitToast("Updating coupon...", request, updateCoupon(coupon));
    }

    public static async fetchAllCategories(){
        await axios.get<string[]>(globals.urls.categories).then((repsonse) => {
            store.dispatch(syncCategories(repsonse.data));
        });
    }

    public static async updateCoupon(coupon:CouponModel){
        this.emitToast(coupon.id, "Updating coupon ...");
        return axios.put<string[]>(globals.urls.companies + "/coupons", coupon, this.appendBody())
            .then((response) => {
                this.successToast(coupon.id, response.data);
                return true;
            })
            .catch((error:any) => {
                this.errorToast(coupon.id, error);
                return false;
            });
    }

    public static async deleteCoupon(couponId:number){
        this.emitToast(couponId, "Deleting coupon...");
        axios.delete<string[]>(globals.urls.companies + "/coupons/" + couponId, this.appendBody())
            .then((response) => this.successToast(couponId, response))
            .catch((error:any) => this.errorToast(couponId, error));
    }

    private static appendBody(){
        return {
            headers:{
                "authorization" : store.getState().currentClientState.token,
                "clientType" : store.getState().currentClientState.client?.clientType
            }
        }
    }

    private static emitToast = (toastId:any, onLoading:string) => {
        toast.loading(onLoading, {
            toastId: toastId,
            theme:"colored",
            closeOnClick: true
        });
    }

    private static successToast = (toastId:any, response:any) => {
        toast.update(toastId, {
            render: response,
            type: "success",
            isLoading: false,
            autoClose: 5000
        });
    }

    private static warnToast = (toastId:any, response:any) => {
        toast.update(toastId, {
            render: response,
            type: "warning",
            isLoading: false,
            autoClose: 5000
        });
    }

    private static errorToast = (couponId:any, error:any) => {
        toast.update(couponId, {
            render: error.response !== undefined ? error.response.data : "No response from server",
            type: "error",
            isLoading: false,
            autoClose: 5000
        });
    }

    // private static emitToast = (onLoading:string, axiosFunction: Promise<any>, storeDispatchAction:Function, functionParam?:any, dispatchResponse?:boolean) => {
    //     // emit loading toast
    //     toast.loading(onLoading, {
    //         toastId: "axios" + onLoading,
    //         theme:"colored",
    //         closeOnClick: true
    //     });

    //     axiosFunction.then((response:any) => {
    //         if(functionParam !== undefined){
    //             console.log("in if");
    //             store.dispatch(storeDispatchAction(functionParam));
    //         } else {
    //             console.log("in else");
    //             store.dispatch(storeDispatchAction(response.data));
    //         }
    //         toast.update("axios" + onLoading, {
    //             render: response.data,
    //             type: "success",
    //             isLoading: false,
    //         });
    //     })
    //     // on error
    //     .catch((error:any) => {
    //         toast.update("axios" + onLoading, {
    //             render: error.response !== undefined ? error.response.data : "No response from server",
    //             type: "error",
    //             isLoading: false,
    //         });
    //     });
    // }
}