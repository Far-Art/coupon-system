class ApiGlobalLogic{
    forms = new Forms();
}

class Forms {
    public fieldsMinLength = {
        name: 4,
        email: 4,
        password: 6,
        telephone: 10
    }
}

const apiGlobalLogic = new ApiGlobalLogic();

export default apiGlobalLogic;