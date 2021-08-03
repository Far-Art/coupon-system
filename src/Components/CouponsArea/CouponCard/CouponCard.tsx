import { Component } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import "./CouponCard.css";

interface CardProps {
    coupon:CouponModel;
}

class CouponCard extends Component<CardProps> {

    public constructor(props:CouponModel){
        super({coupon: props});
    }
      
    public render():JSX.Element {
        return (
            <div style={{background:"url(" + this.props.coupon.image + ")"}} className="CouponCard" >
                <p className="title">{this.props.coupon.title}</p>
                <p className="company">{"By " + this.props.coupon.company}</p>
                <p className="category">{this.props.coupon.category.toLowerCase()}</p>
                <p className="description">{this.props.coupon.description}</p>
                <p className="endDate">{"Ends on " + this.props.coupon.endDate}</p>
                <p className="amount">{this.props.coupon.amount === 0 ? "SOLD OUT" : this.props.coupon.amount +" Left" }</p>
                <p className="price">{this.props.coupon.price === 0 ? "FREE" : this.props.coupon.price +"$" }</p>
            </div>
        );
    }
}

export default CouponCard;
