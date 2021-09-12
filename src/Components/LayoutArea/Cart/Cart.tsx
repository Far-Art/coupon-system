import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';
import { toast } from "react-toastify";
import { clearCart } from "../../../Redux/Actions/CartAction";
import { useAppSelector } from "../../../Redux/Hooks/hooks";
import { store } from "../../../Redux/Store/Store";
import AppCurrencySymbol from "../../../Services/Currency";
import GlobalDataStreamer from "../../../Services/GlobalDataStreamer";
import CouponsContainer from "../CouponsContainer/CouponsContainer";
import EmptyView from "../EmptyView/EmptyView";
import "./Cart.css";

function Cart(): JSX.Element {

    const coupons = useAppSelector(state => 
        state.cartAppState.forPurchaseCouponsList
    );

    // TODO Make this function work correctly
    function buyHandler(){
        const coupon = coupons[0];
        GlobalDataStreamer.purchaseCoupon(coupon.id);
    }

    function clearCartHandler(){
        toast.warning( 
        <div>
            <span>All coupons will be deleted from your cart</span>
            <button onClick={() => store.dispatch(clearCart())} className="Toast__button" ><Icon component={CheckIcon} /></button>
            <button onClick={() => toast.dismiss("Cart_Clean")} className="Toast__button" ><Icon component={CloseIcon} /></button>
        </div>,
        {
            toastId: "Cart_Clean",
            theme:"colored",
            position:"top-center",
            autoClose: 10000
        });
    }

    function classNameHandler(){
        if(coupons.length > 0){
            return "";
        } else {
            return "DISABLED_BUTTON";
        }
    }

    function isDisabledHandler(){
        if(coupons.length > 0){
            return false;
        } else {
            return true;
        }
    }
    
    return (
        <div className="Cart">
			{coupons.length > 0 ? 
                <CouponsContainer couponsList={coupons} asList={true} ignoreFields={["startdate", "amount", "id", "company", "companyemail"]} />
                :
                <>
                    <p className="Cart__empty_view EMPHASIZE_TEXT_COLOR"> Your cart is empty </p>
                    <EmptyView />
                </>
            }
            
            <div className="Button__Container">
                <button disabled={isDisabledHandler()} onClick={() => buyHandler()} className={"APP__BUTTON " + classNameHandler()} >Buy</button>
                <p className="CartInfoField EMPHASIZE_TEXT_COLOR">{coupons.length} {coupons.length === 1 ? <span>coupon</span> : <span>coupons</span>} in cart</p>
                <p className="CartInfoField EMPHASIZE_TEXT_COLOR">Total price {coupons.reduce((sum, currentCoupon) => sum + currentCoupon.price, 0)}{AppCurrencySymbol}</p>
                <button disabled={isDisabledHandler()} onClick={() => clearCartHandler()} className={"APP__BUTTON " + classNameHandler()} >Clear cart</button>
            </div>
        </div>   
    );
}

export default Cart;