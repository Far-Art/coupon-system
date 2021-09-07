import { toast } from "react-toastify";
import { CouponModel } from "../../../Models/CouponModel";
import CouponCard from "../../CouponsArea/CouponCard/CouponCard";
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import "./CouponsContainer.css";
import { useState } from "react";
import { store } from "../../../Redux/Store/Store";
import { deleteFromCart } from "../../../Redux/Actions/CartAction";
import AppCurrencySymbol from "../../../Services/Currency";

interface ContainerProps{
    couponsList: CouponModel[]; // coupons list
    editable?: boolean; // allow coupons to be edited
    asList?: boolean; // show coupons as list instead of cards
    onlyValid?: boolean; // omit coupons with zero amount and expired date
    ignoreFields?: string[]; // omit specified fields when rendering coupons
}

function CouponsContainer(props:ContainerProps): JSX.Element {

    function deleteFromCartHandler(coupon:CouponModel){
        toast.dismiss(coupon.id);
        store.dispatch(deleteFromCart(coupon));
    }

    function cancel(toastId:any){
        toast.dismiss(toastId);
    }

    const emitToast = (coupon:CouponModel) => {
        toast.dismiss(); // close previous toasts
        toast.warning(
            () => {
                // Editable case
                if(props.editable){
                    return( 
                        <div>
                            <span>Coupon id <span className="Coupon__title">'{coupon.id}'</span> </span>
                            <button className="Toast__button" ><Icon component={EditIcon} /></button>
                            <button className="Toast__button" ><Icon component={DeleteIcon} /></button>
                        </div>
                        )
                } 
                // Non editable case
                return (
                    <div>
                        <span>Delete coupon <span className="Coupon__title">'{coupon.title}'</span> ?</span>
                        <button onClick={() => deleteFromCartHandler(coupon)} className="Toast__button" ><Icon component={CheckIcon} /></button>
                        <button onClick={() => cancel(coupon.id)} className="Toast__button" ><Icon component={CloseIcon} /></button>
                    </div>
                )
            }
            , 
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

    // TODO This method executes 704 times every time re render hapens. make it performant
    /* retrieve coupon values and store as object array of key value */
    function couponEntries(coupon:CouponModel){
        const entries:{key:string, value:any}[] = [];
        mainLoop:
            for(const [key, value] of Object.entries(coupon)){
                // check for ignored fields
                if(props.ignoreFields !== undefined && props.ignoreFields.length > 0){
                    for(const ignored of props.ignoreFields){
                        if(key.includes(ignored)){
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
        if(props.couponsList.length === 0){
            return;
        }
        if(props.asList){
            return(
                <table className="Coupons__table">
                    <tbody>
                        <tr>
                            {couponEntries(new CouponModel()).map(attr => <th key={attr.key}>{attr.key.split(/(?=[A-Z])/).map(str => str.toLowerCase()).join(' ')}</th>)}
                        </tr>
                        {props.couponsList.map(c => 
                            <tr onClick={() => emitToast(c)} key={c.id}> 
                                {couponEntries(c).map(t => <td className="table__center_text" key={t.key}>{t.value}</td>)}          
                            </tr>)}
                    </tbody>
                </table>
            );
        }
        // TODO Make date comparison
        // TODO Parse date
        if(props.onlyValid){
            const timeNow = new Date;
            console.log(props.couponsList[1].endDate);
            // return(props.couponsList.map(c => <CouponCard coupon={c} key={c.id} />));
        }
        return (props.couponsList.map(c => <CouponCard coupon={c} key={c.id} />));
    }

    return (
        <div className="CouponsContainer">
            {render()}
        </div>
    );
}
export default CouponsContainer;