class Globals{
}

class DevelopmentGlobals extends Globals{
    public urls = {
        signup: "http://localhost:8080/customers/register",
        login: "http://localhost:8080/customers/login",
        companies: "http://localhost:8080/companies/",
        customers: "http://localhost:8080/customers/",
        coupons: "http://localhost:8080/coupons/"
    }
}

class ProductionGlobals extends Globals{
    public urls = {
        signup: "http://localhost:8080/customers/register",
        login: "http://localhost:8080/customers/login",
        companies: "http://localhost:8080/companies/",
        customers: "http://localhost:8080/customers/",
        coupons: "http://localhost:8080/coupons/"
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;