import { ClientType } from "../../../Models/ClientType";
import "./CreateNewItem.css";

interface CreateNewItemProps {
    clientType:ClientType;
}

function CreateNewItem(props:CreateNewItemProps): JSX.Element {

    function companyOptions(){
        return (
            <>
                <a href="#">Add Coupon</a>
            </>
        )
    }

    function adminOptions(){
        return (
            <>
                <a href="#">Add Customer</a>
                <a href="#">Add Company</a>
            </>
        )
    }

    function render(){
        switch(props.clientType){
            case ClientType.COMPANY:
                return companyOptions();
            case ClientType.ADMIN:
                return adminOptions();
        }
    }

    return (
        <div className="CreateNewItem DropDown">
            <button className="DropBtn" >add</button>
            <div className="DropDownContent">
                {render()}
            </div>
        </div>
    );
}

export default CreateNewItem;