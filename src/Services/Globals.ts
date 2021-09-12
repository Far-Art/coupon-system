class Globals{
}

class DevelopmentGlobals extends Globals{
    public urls = {
        signup: "http://localhost:8080/register",
        login: "http://localhost:8080/login",
        logout: "http://localhost:8080/logout",
        companies: "http://localhost:8080/companies",
        customers: "http://localhost:8080/customers",
        coupons: "http://localhost:8080/coupons",
        categories: "http://localhost:8080/coupons/categories",
        purchaseSingle : "http://localhost:8080/customers/purchase"
    }
}

class ProductionGlobals extends Globals{
    public urls = {
        signup: "http://localhost:8080/register",
        login: "http://localhost:8080/login",
        logout: "http://localhost:8080/logout",
        companies: "http://localhost:8080/companies",
        customers: "http://localhost:8080/customers",
        coupons: "http://localhost:8080/coupons",
        categories: "http://localhost:8080/coupons/categories",
        purchaseSingle : "http://localhost:8080/customers/purchase"
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;