export default class ApiGlobalLogic{

    public static patterns = {
        regex:{
            email: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
            password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
            complexDate: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
            simpleDate: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
            numbers: /^\d+$/
        },
        string: {
            complexDate: "(?:19|20)(?:(?:[13579][26]|[02468][048])-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))|(?:[0-9]{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:29|30))|(?:(?:0[13578]|1[02])-31)))",
            integers: "[0-9]",
            price: "d+(,d{2})?"
        }
    }

    public static forms = {
        fieldsMinLength: {
            email: 4,
            password: 6,
            telephone: 9
        },

        fieldsMaxLength: {
            email: 50,
            password: 16,
            telephone: 10
        }
    }

    public static items = {
        coupon: {
            fieldsMinLength: {
                title: 2,
                description: 0,
                amount: 0,
                price: 0
            },
    
            fieldsMaxLength: {
                title: 60,
                description: 200,
                price: 9999,
                amount: 2147483647
            }
        },
        customer: {
            fieldsMinLength: {
                name: 1
            },
            fieldsMaxLength: {
                name: 60
            }
        },
        company: {
            fieldsMinLength: {
                name: 2
            },
            fieldsMaxLength: {
                name: 200
            }
        },
    }

    public static errorDescriptions = {
        minLength: {
            customerName: `Name must include at least ${ApiGlobalLogic.items.customer.fieldsMinLength.name} characters`,
            companyName: `Company name must include at least ${ApiGlobalLogic.items.company.fieldsMinLength.name} characters`,
            email: `Email must include at least ${ApiGlobalLogic.forms.fieldsMinLength.email} characters`,
            password: `Password must include at least ${ApiGlobalLogic.forms.fieldsMinLength.password} symbols`,
            telephone: `Telephone must include at least ${ApiGlobalLogic.forms.fieldsMinLength.telephone} numbers`,
            couponTitle: `Title must include at least ${ApiGlobalLogic.items.coupon.fieldsMinLength.title} characters`,
            price: `Price must start from ${ApiGlobalLogic.items.coupon.fieldsMinLength.price}`
        },

        maxLength: {
            customerName: `Name cannot exceed ${ApiGlobalLogic.items.customer.fieldsMaxLength.name} characters`,
            companyName: `Company name cannot exceed ${ApiGlobalLogic.items.company.fieldsMaxLength.name} characters`,
            email: `Email cannot exceed ${ApiGlobalLogic.forms.fieldsMaxLength.email} characters`,
            password: `Password cannot exceed ${ApiGlobalLogic.forms.fieldsMaxLength.password} symbols`,
            telephone: `Telephone cannot exceed ${ApiGlobalLogic.forms.fieldsMaxLength.telephone} numbers`,
            amount: `Amount cannot exceed ${ApiGlobalLogic.items.coupon.fieldsMaxLength.amount}`,
            price: `Price cannot exceed ${ApiGlobalLogic.items.coupon.fieldsMaxLength.price}`,
            title: `Title cannot exceed ${ApiGlobalLogic.items.coupon.fieldsMaxLength.title} characters`,
            description: `Description cannot exceed ${ApiGlobalLogic.items.coupon.fieldsMaxLength.description} characters`
        },

        badPattern: {
            email: "Bad email pattern",
            password: "Password must include at least one UPPERCASE letter, one lowercase letter and one digit",
            amount: "Amount must be a whole positive number"
        }
    }
}