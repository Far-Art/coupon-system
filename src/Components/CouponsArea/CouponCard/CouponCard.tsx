import { toast } from "react-toastify";
import { CouponModel } from "../../../Models/CouponModel";
import { addToCart } from "../../../Redux/Actions/CartAction";
import { store } from "../../../Redux/Store/Store";
import "./CouponCard.css";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Icon from '@material-ui/core/Icon';
import AppCurrencySymbol from "../../../Services/Currency";
import globals from "../../../Services/Globals";

interface CardProps {
    coupon: CouponModel;
}

export default function CouponCard(props: CardProps): JSX.Element {

    function emitToast(coupon: CouponModel) {
        // coupon already in cart case
        if (store.getState().cartAppState.forPurchaseCouponsList.find(c => c.id === coupon.id) !== undefined) {
            toast.warn(
                <div className="Toast__element">
                    <p><span className="Coupon__title">{coupon.title}</span> already in your cart</p>
                </div>, {
                toastId: coupon.id,
                theme: "colored"
            });
        }

        // coupon not in cart case
        else {
            store.dispatch(addToCart(coupon));
            toast.success(
                <div className="Toast__element">
                    <p>"{coupon.title}"</p>
                    <p>added to cart</p>
                </div>, {
                theme: "colored",
                icon: <Icon component={ShoppingCartIcon} />
            });
        }
    }

    return (
        <div className="CouponCard" >
            <div className="CouponCardData">
                <div className="Price_tag">
                    <p className="Price">{props.coupon.price === 0 ? "FREE" : props.coupon.price + " " + AppCurrencySymbol}</p>
                </div>
                <div className="Image_container">
                    <img className="Image" src={globals.urls.couponImage + "/1"} alt="coupon image" />
                </div>
                <div className="Text_container">
                    <p className="Title">{props.coupon.title}</p>
                    <p className="Company">{`By ${props.coupon.companyName}`}</p>
                    <p className="Category">{props.coupon.category}</p>
                    <p className="Description">{props.coupon.description}</p>
                    <p className="EndDate">{`Ends on ${props.coupon.endDate}`}</p>
                </div>
            </div>
            <button className="CardButton APP__BUTTON" onClick={() => emitToast(props.coupon)}>Add to Cart</button>
        </div>
    );
}