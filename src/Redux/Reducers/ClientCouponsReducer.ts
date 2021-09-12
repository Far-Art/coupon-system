import { ClientAction, ClientActionType } from "../Actions/ClientAction";
import { CouponAction, CouponActionType } from "../Actions/CouponAction";
import { RevertAction, RevertActionType } from "../Actions/RevertAction";
import { ClientCouponsAppState } from "../States/ClientCouponsAppState";

export function clientCouponsReducer(currentState:ClientCouponsAppState = new ClientCouponsAppState(), action:CouponAction | ClientAction | RevertAction): ClientCouponsAppState {

    const newState = {...currentState};

    switch (action.type) {
        case CouponActionType.FETCH_BY_COMPANY:
            newState.clientCouponsList = action.payload;
            break;
        case CouponActionType.FETCH_BY_CUSTOMER:
            newState.clientCouponsList = action.payload;
            break;
        case CouponActionType.UPDATE:
            // newState.clientCouponsList = updateCoupon(newState.clientCouponsList, action.payload);
            // newState.clientCouponsList = newState.clientCouponsList.map(c => {
            //     if(c.id === (action.payload as CouponModel).id){
            //         return action.payload;
            //     }
            //     return c;
            // })
            // console.log(newState.clientCouponsList);
            break;
        case ClientActionType.LOGOUT:
            newState.clientCouponsList = [];
            break;
        case RevertActionType.REVERT_STATE:
            return currentState;
        default:
            return currentState;
    }
    newState.clientCouponsList = action.payload;

    return newState;
}

// TODO CHECK THIS FOR PROPER FUNCTIONING
// function updateCoupon(couponsList:CouponModel[], toUpdate:CouponModel):CouponModel[]{
//     for(let i = 0; i < couponsList.length; i++){
//         if(couponsList[i].id === toUpdate.id){
//             couponsList[i] = {...toUpdate};
//         }
//     }
//     return couponsList;
// }