import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Unsubscribe } from "redux";
import { CouponModel } from "../../../Models/CouponModel";
import { FiltersAppState } from "../../../Redux/States/FiltersAppState";
import store from "../../../Redux/Store/Store";
import CouponCard from "../../CouponsArea/CouponCard/CouponCard";
import "./CouponsContainer.css";

interface RouteParam{
    id:string;
}

interface CouponsContainerState {
    coupons: CouponModel[];
    filters?: FiltersAppState;
}

interface CouponsContainerProps extends RouteComponentProps<RouteParam> {
    coupon:CouponModel;
}

class CouponsContainer extends Component<CouponsContainerProps, CouponsContainerState> {
    
    private unsubscribe!: Unsubscribe;
    
    public constructor(props: CouponsContainerProps) {
        super(props);
        this.state = {
            coupons: []
        };
    }

    componentDidMount(){   
        const id = +this.props.match.params.id;
        this.unsubscribe = store.subscribe(() => {
            if(id > 0){
                this.setState({coupons:store.getState().couponsState.coupons.filter(c => c.id == id)});
            } else {
                this.setState({coupons: store.getState().couponsState.coupons});
            }
        });
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

