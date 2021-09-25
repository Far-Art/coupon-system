class Globals{
}

class DevelopmentGlobals extends Globals{
    public urls = {
        signup: "http://localhost:8080/register",
        login: "http://localhost:8080/login",
        logout: "http://localhost:8080/logout",
        extendToken: "http://localhost:8080/extendtoken",
        clientInfo: "http://localhost:8080/client/info",
        admin: "http://localhost:8080/admin",
        companies: "http://localhost:8080/companies",
        customers: "http://localhost:8080/customers",
        coupons: "http://localhost:8080/coupons",
        couponImage: "http://localhost:8080/coupons/images",
        categories: "http://localhost:8080/coupons/categories",
        purchase : "http://localhost:8080/customers/purchase"
    }
}

class ProductionGlobals extends Globals{
    public urls = {
        signup: "http://localhost:8080/register",
        login: "http://localhost:8080/login",
        logout: "http://localhost:8080/logout",
        extendToken: "http://localhost:8080/extendtoken",
        clientInfo: "http://localhost:8080/client/info",
        admin: "http://localhost:8080/admin",
        companies: "http://localhost:8080/companies",
        customers: "http://localhost:8080/customers",
        coupons: "http://localhost:8080/coupons",
        couponImage: "http://localhost:8080/coupons/images",
        categories: "http://localhost:8080/coupons/categories",
        purchase : "http://localhost:8080/customers/purchase"
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;