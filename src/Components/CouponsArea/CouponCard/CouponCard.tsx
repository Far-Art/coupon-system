import { Component } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import "./CouponCard.css";

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
                    <p className="company CENTERED">{"By " + this.props.coupon.company}</p>
                    <p className="category CENTERED">{this.props.coupon.category}</p>
                    
                    <div className="Price_tag">
                        <p className="price CENTERED">{this.props.coupon.price === 0 ? "FREE" : this.props.coupon.price +"$" }</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default CouponCard;
