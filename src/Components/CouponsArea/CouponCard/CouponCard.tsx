import { toast } from "react-toastify";
import { CouponModel } from "../../../Models/CouponModel";
import { addToCart } from "../../../Redux/Actions/CartAction";
import { store } from "../../../Redux/Store/Store";
import "./CouponCard.css";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Icon from '@material-ui/core/Icon';
import AppCurrencySymbol from "../../../Services/Currency";

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

    function validStartDate(): Boolean {
        if (props.coupon && new Date(props.coupon.startDate + "Z").getTime() >= Date.now()) {
            return false;
        }
        return true;
    }

    function formatDate(date:Date){
        const jsDate = new Date(date + "Z");
        const year:number = jsDate.getFullYear();
        const month:number = jsDate.getMonth() + 1;
        const day:number = jsDate.getDate();
        return `${day}.${month}.${year}`;
    }

    return (
        <div className="CouponCard">
            <div className={"CouponCardState " + (validStartDate() ? "" : "ComingSoon")}>
                <div className="ComingSoon_tag">
                    <p>{`Get me from ${formatDate(props.coupon.startDate)}`}</p>
                </div>
            </div>
            <div className="CouponCardData">
                    {validStartDate() && <div className="Price_tag">
                    <p className="Price">{props.coupon.price === 0 ? "FREE" : props.coupon.price.toFixed(2) + " " + AppCurrencySymbol}</p>
                </div>}
                <div className="Image_container">
                    <img className="Image" src={props.coupon.imageUrl} alt="coupon" />
                </div>
                <div className="Text_container">
                    <p className="Title">{props.coupon.title}</p>
                    <p className="Company">{`By ${props.coupon.companyName}`}</p>
                    <p className="Category">{props.coupon.category}</p>
                    <p className="Description">{props.coupon.description}</p>
                    <p className="EndDate">{`Ends on ${formatDate(props.coupon.endDate)}`}</p>
                </div>
            </div>
            {validStartDate() && <button className="CardButton APP__BUTTON" onClick={() => emitToast(props.coupon)}>Add to Cart</button>}
        </div>
    );
}