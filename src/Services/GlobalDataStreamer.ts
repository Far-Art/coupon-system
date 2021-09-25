import axios from "axios";
import { CompanyModel } from "../Models/CompanyModel";
import { CouponModel } from "../Models/CouponModel";
import { CustomerModel } from "../Models/CustomerModel";
import { fetchAllCompanies } from "../Redux/Actions/CompanyAction";
import { fetchAllCoupons, fetchCouponsByCompany, fetchCouponsByCustomer } from "../Redux/Actions/CouponAction";
import { fetchAllCustomers } from "../Redux/Actions/CustomerAction";
import { store } from "../Redux/Store/Store";
import globals from "./Globals";
import { syncCategories } from "../Redux/Actions/CategoriesAction";
import { toast } from "react-toastify";
import { LoginRequestModel } from "../Models/LoginRequestModel";
import { LoginResponseModel } from "../Models/LoginResponseModel";
import { loginAction, logoutAction, requestInfo } from "../Redux/Actions/ClientAction";
import { ClientInfoModel } from "../Models/ClientInfoModel";
import { clearCart } from "../Redux/Actions/CartAction";
import { SignupModel } from "../Models/SignupModel";

// static class for data streams
export default class GlobalDataStreamer {

    /*                      ADMIN METHODS 
    ****************************************************************/
    public static async fetchAllCustomers() {
        await axios.get<CustomerModel[]>(globals.urls.customers, this.appendBody()).then((response) => {
            store.dispatch(fetchAllCustomers(response.data));
        });
    }

    public static async fetchAllCompanies() {
        await axios.get<CompanyModel[]>(globals.urls.companies, this.appendBody()).then((response) => {
            store.dispatch(fetchAllCompanies(response.data));
        });
    }

    public static async addCompany(company: ClientInfoModel) {
        this.emitToast("addNewCompany", "Adding company ...");
        return axios.post<string>(globals.urls.admin + "/companies", company, this.appendBody())
            .then((response) => {
                this.successToast("addNewCompany", response.data);
                return true;
            })
            .catch((error: any) => {
                this.errorToast("addNewCompany", error);
                return false;
            });
    }

    public static async addCustomer(customer: ClientInfoModel) {
        this.emitToast("addNewCustomer", "Adding customer ...");
        return axios.post<string>(globals.urls.admin + "/customers", customer, this.appendBody())
            .then((response) => {
                this.successToast("addNewCustomer", response.data);
                return true;
            })
            .catch((error: any) => {
                this.errorToast("addNewCustomer", error);
                return false;
            });
    }

    /*                      CUSTOMER METHODS 
    ****************************************************************/
    public static async fetchCouponsByCustomer() {
        return axios.get<CouponModel[]>(globals.urls.customers + "/coupons", this.appendBody())
            .then((response) => {
                this.successToast("allByCustomer", "Your coupons loaded");
                store.dispatch(fetchCouponsByCustomer(response.data));
                return true;
            })
            .catch((error: any) => {
                this.emitToast("allByCustomer", "Fetching coupons ...");
                this.errorToast("allByCustomer", error);
                return false;
            });
    }

    public static async purchaseCoupons(couponIds: number[]) {
        this.emitToast("Purchase", couponIds.length === 1 ? "Purchasing coupon ..." : "Purchasing coupons ...");
        return axios.post<string>(globals.urls.purchase, couponIds, this.appendBody())
            .then((response) => {
                store.dispatch(clearCart());
                this.successToast("Purchase", response.data);
                return true;
            })
            .catch((error: any) => {
                this.errorToast("Purchase", error);
                return false;
            });
    }

    /*                      COMPANY METHODS 
    ****************************************************************/

    public static async addCoupon(coupon: CouponModel) {
        this.emitToast("addNewCoupon", "Adding coupon ...");
        return axios.post<string>(globals.urls.companies + "/coupons", coupon, this.appendBody())
            .then((response) => {
                this.successToast("addNewCoupon", response.data);
                return true;
            })
            .catch((error: any) => {
                this.errorToast("addNewCoupon", error);
                return false;
            });
    }

    public static async updateCoupon(coupon: CouponModel) {
        this.emitToast(coupon.id, "Updating coupon ...");
        return axios.put<string>(globals.urls.companies + "/coupons", coupon, this.appendBody())
            .then((response) => {
                this.successToast(coupon.id, response.data);
                return true;
            })
            .catch((error: any) => {
                this.errorToast(coupon.id, error);
                return false;
            });
    }

    public static async deleteCoupon(couponId: number) {
        this.emitToast(couponId, "Deleting coupon...");
        axios.delete<string>(globals.urls.companies + "/coupons/" + couponId, this.appendBody())
            .then((response) => this.successToast(couponId, response))
            .catch((error: any) => this.errorToast(couponId, error));
    }

    public static async fetchCouponsByCompany() {
        return axios.get<CouponModel[]>(globals.urls.companies + "/coupons", this.appendBody())
            .then((response) => {
                this.successToast("allByCompany", "Your coupons loaded");
                store.dispatch(fetchCouponsByCompany(response.data));
                return true;
            })
            .catch((error: any) => {
                this.emitToast("allByCompany", "Fetching coupons ...");
                this.errorToast("allByCompany", error);
                return false;
            });
    }

    /*                      SHARED METHODS 
    ****************************************************************/

    public static async login(login: LoginRequestModel) {
        toast.dismiss();
        this.emitToast("Login", "Loggin in...");
        return axios.post<LoginResponseModel>(globals.urls.login, login)
            .then((response) => {
                this.successToast("Login", "Welcome " + response.data.name);
                store.dispatch(loginAction(response.data));
                return true;
            })
            .catch((error: any) => {
                this.errorToast("Login", error);
                return false;
            });
    }

    public static async signup(signup: SignupModel) {
        toast.dismiss();
        this.emitToast("SignUp", "Signing up...");
        return axios.post<SignupModel>(globals.urls.signup, signup)
            .then((response) => {
                this.successToast("SignUp", response.data.email + " signed-up successfully");
                return true;
            })
            .catch((error: any) => {
                this.errorToast("SignUp", error);
                return false;
            });
    }

    public static async logout() {
        toast.dismiss();
        this.emitToast("Logout", "Loggin out...");
        return axios.delete<string>(globals.urls.logout, this.appendBody())
            .then((response) => {
                this.warnToast("Logout", response.data);
                store.dispatch(logoutAction());
                return true;
            })
            .catch((error: any) => {
                toast.dismiss("Logout");
                return false;
            });
    }

    public static async extendTokenExpiration() {
        return axios.put<boolean>(globals.urls.extendToken, {}, this.appendBody()).then((response) => {
            return response.data;
        }).catch((error: any) => {
            this.emitToast("extendingToken", "");
            this.errorToast("extendingToken", error);
            return false;
        })
    }

    public static async fetchClientInfo() {
        axios.get<ClientInfoModel>(globals.urls.clientInfo, this.appendBody())
            .then((response) => store.dispatch(requestInfo(response.data)))
            .catch((error: any) => {
                this.emitToast("fetchClient", "");
                this.errorToast("fetchClient", error);
            });
    }

    public static async fetchAllCategories() {
        await axios.get<string[]>(globals.urls.categories).then((repsonse) => {
            store.dispatch(syncCategories(repsonse.data));
        });
    }

    public static async fetchCouponImage(imageName: string | number) {
        this.emitToast("CouponImageFetching", "Fetching image...");
        return axios.get(globals.urls.couponImage + `/${imageName}`, { responseType: "blob" })
            .then((response) => {
                this.successToast("CouponImageFetching", "Fetch successful");
                return response;
            })
            .catch((error: any) => {
                this.errorToast("CouponImageFetching", error);
                return error;
            });
    }

    public static async fetchAllCoupons() {
        this.emitToast("allCoupons", "Fetching coupons...");
        await axios.get<CouponModel[]>(globals.urls.coupons)
            .then((response) => {
                toast.dismiss("allCoupons");
                store.dispatch(fetchAllCoupons(response.data));
            })
            .catch((error) => {
                this.errorToast("allCoupons", error);
            });
    }

    /*                      PRIVATE LOCAL METHODS 
    ****************************************************************/
    private static appendBody() {
        return {
            headers: {
                "authorization": store.getState().currentClientState.token,
                "clientType": store.getState().currentClientState.client?.clientType
            }
        }
    }

    private static emitToast = (toastId: any, onLoading: string) => {
        toast.loading(onLoading, {
            toastId: toastId,
            theme: "colored",
            closeOnClick: true,
            autoClose: 5000
        });
    }

    private static successToast = (toastId: any, response: any) => {
        toast.update(toastId, {
            render: response,
            type: "success",
            isLoading: false,
            autoClose: 5000
        });
    }

    private static warnToast = (toastId: any, response: any) => {
        toast.update(toastId, {
            render: response,
            type: "warning",
            isLoading: false,
            autoClose: 5000
        });
    }

    private static errorToast = (couponId: any, error: any) => {
        toast.update(couponId, {
            render: error.response !== undefined ? error.response.data : "No response from server",
            type: "error",
            isLoading: false,
            autoClose: 5000
        });
    }
}