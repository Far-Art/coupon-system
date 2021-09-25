import { toast } from "react-toastify";
import { logout } from "../Components/LayoutArea/Logout/Logout";
import { extendToken } from "../Redux/Actions/ClientAction";
import { store } from "../Redux/Store/Store";
import GlobalDataStreamer from "./GlobalDataStreamer";

export default class IdleTimerApi {

    // this timeout starts when client logged in to system 
    private static idleTimeout: NodeJS.Timeout = setTimeout(() => undefined, 0);

    // this timer starts when client logged in to system 
    private static idleIntervalTimerActions: NodeJS.Timeout = setInterval(() => undefined, 0);

    // this variable represent idle timer value
    private static idleTimer: number = 0;

    // this variable represent time of interval updates in millis
    private static idleTimerUpdateInterval: number = 1000;

    // this variable represent clients login time
    private static clientLoginTime: number = -99;

    // this variable represent threshold when the client will be logged out if idle for amount of time
    private static idleTimerThresholdInterval: number = -99;

    // this variable mirrors idleTimerThresholdInterval and is used for client notification
    private static initialIdleTimerThresholdInterval: number = 0;

    // this variable represent threshold when the client will be notified of being idle for too long
    private static emitToastThresholdInterval: number = 0;

    // this variable represent dynamic range for emitToastThresholdInterval value
    private static emitToastValuePercentage = 0.86; // (1 is 100%)

    // this variable represent threshold for auto dispatch token update without notice
    private static dispatchTokenUpdateThresholdInterval: number = 0;

    // this variable represent dynamic range for dispatchTokenUpdateThresholdInterval value
    private static dispatchTokenUpdateValuePercentage = 0.7; // (1 is 100%)

    /* run this function on mount to check if user session expired
    ****************************************************************************/
    private onMount = (function ifExpired() {
        IdleTimerApi.updateData(); // refresh data
        if (IdleTimerApi.clientLoginTime + IdleTimerApi.idleTimerThresholdInterval > 0) {
            if (Date.now() - IdleTimerApi.clientLoginTime > IdleTimerApi.idleTimerThresholdInterval) {
                IdleTimerApi.logoutAction();
            }
        }
    }());

    /* start idle timer
    ****************************************************************************/
    static startIdleTimer() {
        IdleTimerApi.updateData(); // refresh data
        IdleTimerApi.resetIdleTimeout(); // start idle timeout
    }

    /* logic of client makes any action on website 
    ****************************************************************************/
    static clientMadeAction() {
        // refresh data
        IdleTimerApi.updateData();
        // check if store holds client data
        if (IdleTimerApi.clientLoginTime + IdleTimerApi.idleTimerThresholdInterval > 0) {
            // if session time matches update threshold
            if (Date.now() - IdleTimerApi.clientLoginTime >= IdleTimerApi.dispatchTokenUpdateThresholdInterval) {
                IdleTimerApi.updateLoginTime();
                IdleTimerApi.resetIdleTimeout();
            }
        }
    }

    /* this function resets and start timer to logout action 
    ****************************************************************************/
    private static resetIdleTimeout() {
        /* run this function only if client data is present */
        if (IdleTimerApi.idleTimerThresholdInterval > 0) {
            /* reset data */
            IdleTimerApi.idleTimer = 0;
            clearTimeout(IdleTimerApi.idleTimeout);
            clearInterval(IdleTimerApi.idleIntervalTimerActions);
            /* set logout timeout */
            IdleTimerApi.idleTimeout = setTimeout(() => IdleTimerApi.logoutAction(), IdleTimerApi.idleTimerThresholdInterval);
            /* set idle interval timer */
            IdleTimerApi.idleIntervalTimerActions = setInterval(() => {
                // increment timer
                IdleTimerApi.idleTimer += IdleTimerApi.idleTimerUpdateInterval;
                // check if idle time matches toast emit threshold
                if ((Date.now() - IdleTimerApi.clientLoginTime) >= IdleTimerApi.emitToastThresholdInterval) {
                    // emit toast
                    toast.warn("",
                        {
                            toastId: "IdleToast",
                            autoClose: false,
                            theme: "colored"
                        });
                    // update toast
                    toast.update("IdleToast",
                        {
                            render: `The system noticed you were idle for too long, 
                            please make action or you will be disconnected in ${(IdleTimerApi.idleTimerThresholdInterval - IdleTimerApi.idleTimer) / 1000} seconds`,
                            autoClose: false,
                            theme: "colored",
                            type: "warning"
                        });
                }
            }, IdleTimerApi.idleTimerUpdateInterval);
        }
    }

    /* update clients login time
    ****************************************************************************/
    private static updateLoginTime() {
        GlobalDataStreamer.extendTokenExpiration().then((response) => {
            if (response) {
                store.dispatch(extendToken());
                IdleTimerApi.updateData();
                toast.update("IdleToast",
                    {
                        toastId: "IdleToastReset",
                        render: "Thank you, idle time reset",
                        type: "success",
                        autoClose: 10_000,
                        theme: "colored"
                    });
            }
        });
    }

    /*  this function sets on login or updates data in case client closed or refreshed web page 
    ****************************************************************************/
    private static updateData() {
        const response = store.getState().currentClientState;
        if (response !== undefined && response.idleDisconnectIntervalInMillis !== undefined && response.loginTimeInMillis !== undefined) {
            IdleTimerApi.idleTimerThresholdInterval = response.idleDisconnectIntervalInMillis;
            IdleTimerApi.initialIdleTimerThresholdInterval = IdleTimerApi.idleTimerThresholdInterval;
            IdleTimerApi.clientLoginTime = response.loginTimeInMillis;
            IdleTimerApi.emitToastThresholdInterval = IdleTimerApi.idleTimerThresholdInterval * IdleTimerApi.emitToastValuePercentage;
            IdleTimerApi.dispatchTokenUpdateThresholdInterval = IdleTimerApi.idleTimerThresholdInterval * IdleTimerApi.dispatchTokenUpdateValuePercentage;
        } else {
            IdleTimerApi.cancelTimers();
        }
    }

    private static cancelTimers() {
        clearTimeout(IdleTimerApi.idleTimeout);
        clearInterval(IdleTimerApi.idleIntervalTimerActions);
        IdleTimerApi.idleTimerThresholdInterval = -99;
        IdleTimerApi.clientLoginTime = -99;
        IdleTimerApi.idleTimer = 0;
    }

    /* logout function 
    ****************************************************************************/
    private static logoutAction() {
        // clear values
        IdleTimerApi.cancelTimers();
        // dispatch logout
        logout();
        toast.dismiss();
        // emit client notification
        toast.warning(`You were logged out for idling ${IdleTimerApi.initialIdleTimerThresholdInterval / 60_000} minutes`, {
            toastId: "IdleLogout",
            autoClose: false,
            theme: "colored"
        });
    }
}