import { Component } from "react";
import { toast } from "react-toastify";
import { CouponModel } from "../../../Models/CouponModel";
import { addToCart, deleteFromCart } from "../../../Redux/Actions/CartAction";
import {store} from "../../../Redux/Store/Store";
import "./CouponCard.css";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Icon from '@material-ui/core/Icon';

interface CardProps {
    coupon:CouponModel;
}

class CouponCard extends Component<CardProps> {

    public constructor(props: CardProps){
        super(props);
    }
      
    public render():JSX.Element {
        return (
            <div className="CouponCard" >
                <div className="Dashed_border">
                    <div className="Image_container">
                        <img className="CENTERED" src={this.props.coupon.image} alt="coupon_image" />
                    </div>
                    
                    <p className="title CENTERED">{this.props.coupon.title}</p>
                    <p className="company CENTERED">{"By ''" + this.props.coupon.companyName + "''"}</p>
                    <p className="category CENTERED">{this.props.coupon.category}</p>
                    <button onClick={() => {
                        store.dispatch(addToCart(this.props.coupon));
                        toast.success(
                            <div className="Toast__element">
                                <p>"{this.props.coupon.title}"</p>
                                <p>added to cart</p>
                            </div>,{
                                theme:"colored",
                                icon: <Icon component={ShoppingCartIcon}/>
                            });
                    }}>Add to Cart</button>
                    <button onClick={() => {
                        store.dispatch(deleteFromCart(this.props.coupon));
                    }}>Delete from Cart</button>
                    
                    <div className="Price_tag">
                        <p className="price CENTERED">{this.props.coupon.price === 0 ? "FREE" : this.props.coupon.price +"$" }</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default CouponCard;