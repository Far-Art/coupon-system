import { toast } from "react-toastify";
import { CouponModel } from "../../../Models/CouponModel";
import CouponCard from "../../CouponsArea/CouponCard/CouponCard";
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import "./CouponsContainer.css";
import { store } from "../../../Redux/Store/Store";
import { deleteFromCart } from "../../../Redux/Actions/CartAction";
import AppCurrencySymbol from "../../../Services/Currency";
import EmptyView from "../EmptyView/EmptyView";
import EditableTableRow from "./EditableTableRow";
import { useState } from "react";
import GlobalDataStreamer from "../../../Services/GlobalDataStreamer";

interface ContainerProps{
    couponsList: CouponModel[]; // coupons list
    editable?: boolean; // allow coupons to be edited
    asList?: boolean; // show coupons as list instead of cards
    onlyValid?: boolean; // omit coupons with zero amount and expired date
    ignoreFields?: string[]; // omit specified fields when rendering coupons
}

function CouponsContainer(props:ContainerProps): JSX.Element {

    const [editCouponWithId, setEditCouponWithId] = useState<number>(0);

    // This function invoked on list render
    function renderAsList(coupons:CouponModel[]){
        return(
            <table className="Coupons__table">
                <thead>
                    <tr >
                        {couponEntries(new CouponModel()).map(attr => <th key={attr.key}>{attr.key.split(/(?=[A-Z])/).map(str => str.toLowerCase()).join(' ')}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {coupons.map(c => 
                        c.id === editCouponWithId ? 
                        <EditableTableRow  
                            key={c.id} 
                            className={setWarningClass(c)} 
                            tdClassName="table__center_text" 
                            ignoreFields={props.ignoreFields} 
                            nonEditableFields={["id"]} 
                            onSave={setEditCouponWithId}
                            coupon={c} />
                        :
                        <EditableTableRow 
                            onClick={() => emitToast(c)} 
                            key={c.id} 
                            editable={false} 
                            className={setWarningClass(c)} 
                            tdClassName="table__center_text" 
                            ignoreFields={props.ignoreFields} 
                            coupon={c} />
                        )}
                </tbody>
            </table>
        );
    }

    /* if amount is zero or end date is near, set warn class */
    function setWarningClass (coupon:CouponModel){
        const timeNowInMillis = Date.parse(new Date().toLocaleDateString());
        if(coupon.amount === 0 || Date.parse(new Date(coupon.endDate).toLocaleDateString()) <= timeNowInMillis){
            return "Warn";
        }
        return "";
    }

    // This function invoked on cards render
    function renderAsCards(coupons:CouponModel[]){
        return coupons.map(c => <CouponCard coupon={c} key={c.id} />);
    }

    // This function invoked when coupons list is empty
    function renderEmptyView(){
        return(
            <>
                <h1>No Coupons left</h1>
                <EmptyView />
            </>);
    }

    function deleteFromCartHandler(coupon:CouponModel){
        toast.dismiss(coupon.id);
        store.dispatch(deleteFromCart(coupon));
    }

    const emitToast = (coupon:CouponModel) => {
        toast.dismiss(); // close previous toasts
        toast.warning(
            () => {
                // Editable case
                if(props.editable){
                    return( 
                        <div>
                            <span>Coupon id <span className="Coupon__title">'{coupon.id}'</span> action</span>
                            
                            {/* edit button */}
                            <button onClick={() => {
                                    setEditCouponWithId(coupon.id); 
                                    toast.dismiss(coupon.id);
                                }} 
                                className="Toast__button"> <Icon component={EditIcon} /> 
                            </button>

                            {/* delete button */}
                            <button onClick={() => {
                                    GlobalDataStreamer.deleteCoupon(coupon.id);
                                    toast.dismiss(coupon.id);
                                    setEditCouponWithId(-1);
                                }} 
                                className="Toast__button"> <Icon component={DeleteIcon} /> 
                            </button>
                        </div>
                    )
                } 
                // Non editable case
                return (
                    <div>
                        <span>Delete coupon <span className="Coupon__title">'{coupon.title}'</span> ?</span>
                        <button onClick={() => deleteFromCartHandler(coupon)} className="Toast__button"> <Icon component={CheckIcon} /> </button>
                        <button onClick={() => toast.dismiss(coupon.id)} className="Toast__button"> <Icon component={CloseIcon} /> </button>
                    </div>
                )
            }
            , 
            // toast properties
            {
                toastId: coupon.id, // prevent duplicate
                position: "top-center",
                theme:"colored",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
    }

    /* retrieve coupon values and store as object array of key value */
    function couponEntries(coupon:CouponModel){
        const entries:{key:string, value:any}[] = [];
        mainLoop:
            for(const [key, value] of Object.entries(coupon)){
                // check for ignored fields
                if(props.ignoreFields !== undefined && props.ignoreFields.length > 0){
                    for(const ignored of props.ignoreFields){
                        if(key.toLowerCase() === ignored){
                            continue mainLoop;
                        }
                    }
                }
                // append currency symbol to price
                if(key.includes("price")){
                    entries.push({key:key, value:value + AppCurrencySymbol});
                } else {
                    entries.push({key:key, value:value});
                }
            }
        return entries;
    }

    // rendering logic
    const render = () =>{
        let couponsList;
        if(!props.couponsList || props.couponsList.length === 0){
            return renderEmptyView();
        }

        if(props.onlyValid){
            // TODO try Make direct date comparison
            const timeNowInMillis = Date.parse(new Date().toLocaleDateString());
            couponsList = props.couponsList.filter(c => 
                {
                    if(c.amount === 0 ){
                        return false;
                    } else if (Date.parse(new Date(c.endDate).toLocaleDateString()) < timeNowInMillis){
                        return false;
                    }
                    return true;
                }
            );
        } else {
            couponsList = props.couponsList;
        }

        if(couponsList.length === 0){
            return renderEmptyView();
        }

        return (
            <>
                <div className="CouponsCounter">
                    <span>{couponsList.length}</span> <span>coupon{couponsList.length === 1 ? "" : "s"} displayed</span>
                </div>
                {props.asList ? renderAsList(couponsList) : renderAsCards(couponsList)}
            </>
        );
    }

    // paint component
    return (
        <div className="CouponsContainer">
            {render()}
        </div>
    );
}
export default CouponsContainer;