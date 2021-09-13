import { ClientType } from "../../../Models/ClientType";
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import "./AddItemElement.css";
import { NavLink } from "react-router-dom";
import { RouteUrls } from "../../../Services/RouteUrls";
import CreateCouponForm from "../CreateCouponForm/CreateCouponForm";

interface AddItemElementProps {
    clientType:ClientType;
}

export default function AddItemElement(props:AddItemElementProps): JSX.Element {

    function companyOptions(){
        return (
            <>
                <NavLink to={RouteUrls.CREATE_COUPON}>Add coupon</NavLink>
            </>
        )
    }

    function adminOptions(){
        return (
            <>
                <NavLink to={RouteUrls.CREATE_CUSTOMER}>Add customer</NavLink>
                <NavLink to={RouteUrls.CREATE_COMPANY}>Add company</NavLink>
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
        <div className="AddItemElement DropDown">
            <button className="DropBtn NAV__BUTTON" >
                <Icon onClick={() => {}} className="Menu__button" component={AddIcon} />
            </button>
            <div className="DropDownContent">
                {render()}
            </div>
        </div>
    );
}