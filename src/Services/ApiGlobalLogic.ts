export default class ApiGlobalLogic{

    public static patterns = {
        regex:{
            email: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
            password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
            complexDate: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
            simpleDate: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
            numbers: / \d+ /
        },
        string: {
            complexDate: "(?:19|20)(?:(?:[13579][26]|[02468][048])-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))|(?:[0-9]{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:29|30))|(?:(?:0[13578]|1[02])-31)))",
            integers: "[0-9]",
            price: "\d+(,\d{2})?"
        }
    }

    public static forms = {
        fieldsMinLength: {
            name: 4,
            companyName: 2,
            email: 4,
            password: 6,
            telephone: 9
        },

        fieldsMaxLength: {
            name: 30,
            companyName: 100,
            email: 30,
            password: 16,
            telephone: 10
        }
    }

    public static errorDescriptions = {
        minLength: {
            name: `Name must include at least ${ApiGlobalLogic.forms.fieldsMinLength.name} characters`,
            companyName: `Company name must include at least ${ApiGlobalLogic.forms.fieldsMinLength.companyName} characters`,
            email: `Email must include at least ${ApiGlobalLogic.forms.fieldsMinLength.email} characters`,
            password: `Password must include at least ${ApiGlobalLogic.forms.fieldsMinLength.password} symbols`,
            telephone: `Telephone must include at least ${ApiGlobalLogic.forms.fieldsMinLength.telephone} numbers`
        },

        maxLength: {
            name: `Name cannot exceed ${ApiGlobalLogic.forms.fieldsMaxLength.name} characters`,
            companyName: `Company name cannot exceed ${ApiGlobalLogic.forms.fieldsMaxLength.companyName} characters`,
            email: `Email cannot exceed ${ApiGlobalLogic.forms.fieldsMaxLength.email} characters`,
            password: `Password cannot exceed ${ApiGlobalLogic.forms.fieldsMaxLength.password} symbols`,
            telephone: `Telephone cannot exceed ${ApiGlobalLogic.forms.fieldsMaxLength.telephone} numbers`
        },

        badPattern: {
            email: "Bad email pattern",
            password: "Password must include at least one UPPERCASE letter, one lowercase letter and one digit"
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
                description: 300,
                price: 9999
            }
        }
    }
}