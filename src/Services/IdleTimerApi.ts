import { useEffect } from "react";
import { LoginResponseModel } from "../Models/LoginResponseModel";
import { logoutAction } from "../Redux/Actions/ClientAction";
import { useAppSelector } from "../Redux/Hooks/hooks";
import { store } from "../Redux/Store/Store";

export default function IdleTimerApi() {

    const client = useAppSelector(state => 
        state.currentClientState
    );

    useEffect(() => {
        if(client.loginTime !== undefined){
            
            // console.log((Date.now() - client.loginTime?.getDate()) * 60);
            // if(client.loginTime)
            setTimer((client.client as LoginResponseModel).idleDisconnectTime);
        }

    },[client.client?.id])

    const setTimer = (minutes:number) => {
        if(client.loginTime && client.idlingTime){
            const timeNow = new Date();
            timeNow.setMinutes(timeNow.getMinutes() + minutes);
            console.log(Date.now() - client.loginTime);
            if((Date.now() - client.loginTime) / 60_000 >= (client.idlingTime ? client.idlingTime : 0)){
                store.dispatch(logoutAction());
            }
        }
    }
}