import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Unsubscribe } from "redux";
import { CouponModel } from "../../../Models/CouponModel";
import { FiltersAppState } from "../../../Redux/States/FiltersAppState";
import store from "../../../Redux/Store/Store";
import CouponCard from "../../CouponsArea/CouponCard/CouponCard";
import ReactPaginate from 'react-paginate';
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

            /* fetch coupons from global state */
            const allCouponsArray = store.getState().couponsState.coupons;
            
            /* check for props */
            if(id > 0){
                this.setState({coupons:allCouponsArray.filter(c => c.id === id)});
            } 
            
            /* Check for active filters */
            else if (store.getState().filterState.filtersActive){
                
                /* fetch filters */
                const categoriesFilter = store.getState().filterState.categories;
                const companiesFilter = store.getState().filterState.companies;
                const priceFilter = store.getState().filterState.price;
                const freeTextFilter = store.getState().filterState.freeText;

                /* init arrays with coupons by filters */
                const categoriesArr = allCouponsArray.filter(c => categoriesFilter.includes(this.convertString(c.category)));
                const companiesArr = allCouponsArray.filter(c => companiesFilter.includes(c.companyName));

                /* leave only distinct coupons */
                let distinctCoupons = Array.from(new Set<CouponModel>(categoriesArr.concat(companiesArr)));

                /* if categories or companies wasnt selected filter all coupons by price, else filter by price only from filtered coupons */
                // if(distinctCoupons.length === 0){
                //     distinctCoupons = store.getState().couponsState.coupons.filter(c => c.price >=priceFilter[0] && c.price <= priceFilter[1]);
                // } else {
                //     distinctCoupons = distinctCoupons.filter(c => c.price >=priceFilter[0] && c.price <= priceFilter[1]);
                // }

                /* filter by free text */
                if(freeTextFilter.length > 0){
                    if(distinctCoupons.length > 0){
                        distinctCoupons = this.findSubStringInCouponValues(freeTextFilter, distinctCoupons);
                    } else {
                        distinctCoupons = this.findSubStringInCouponValues(freeTextFilter, allCouponsArray);
                    }

                    
                }
                this.setState({coupons: distinctCoupons})
            }

            /* if no filter is active render all coupons */
            else {
                this.setState({coupons: allCouponsArray});
            }
        });
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    findSubStringInCouponValues = (text:string, searchArray:CouponModel[]) => {
        return searchArray.filter(function(coupon:CouponModel){
            return (coupon.title.toLowerCase().indexOf(text) > -1 ||
                (coupon.description === undefined ? coupon.title.toLowerCase().indexOf(text) > -1 : coupon.description.toLowerCase().indexOf(text) > -1) ||
                coupon.companyName.toString().toLowerCase().indexOf(text) > -1);
            }
        );
    }

    private convertString(str:string){
        let newString = str.substring(0,1).toUpperCase();
        newString += str.substring(1).toLowerCase();
        return newString.replace("_", " ");
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

