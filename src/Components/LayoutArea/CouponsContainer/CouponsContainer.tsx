import axios from "axios";
import { Component } from "react";
import { Unsubscribe } from "redux";
import { CouponModel } from "../../../Models/CouponModel";
import { fetchAllCoupons } from "../../../Redux/Actions/CouponsActionCreators";
import store from "../../../Redux/Store/Store";
import globals from "../../../Services/Globals";
import CouponCard from "../../CouponsArea/CouponCard/CouponCard";
import "./CouponsContainer.css";

interface CouponsState {
    coupons:CouponModel[];
}

class CouponsContainer extends Component<{}, CouponsState> {
    
    private unsubscribe!: Unsubscribe;
    
    public constructor(props: {}) {
        super(props);
        this.state = {
            coupons: []
        };
    }

    async componentDidMount(){
        const response = await axios.get<CouponModel[]>(globals.urls.coupons);
        this.unsubscribe = store.subscribe(() => {
            this.setState({coupons: store.getState().couponsState.coupons});
        });
        store.dispatch(fetchAllCoupons(response.data));
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    public render(): JSX.Element {
        return (
            <div className="CouponsContainer">
                {this.state.coupons.map(c => <CouponCard coupon={c} key={c.id} />)}
            </div>
        );
    }
}

export default CouponsContainer;

