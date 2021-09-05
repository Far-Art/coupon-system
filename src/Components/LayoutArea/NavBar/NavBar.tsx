import { ClientType } from "../../../Models/ClientType";
import { CustomerModel } from "../../../Models/CustomerModel";
import { useAppSelector } from "../../../Redux/Hooks/hooks";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import "./NavBar.css";

function NavBar(): JSX.Element {

    const currentClient = useAppSelector(state => state.currentClientState.client);

    const timeNow = new Date();
    
    function renderClientInfo(){
        if(currentClient !== undefined){
            return <>
                <p>Good {timeOfDay()} {nameToCapital(currentClient.name) + " " + nameToCapital(currentClient.clientType !== ClientType.COMPANY ? (currentClient as CustomerModel).lastName : "")} </p> <Logout />
            </>;
        }
        return <> 
            <p>Good {timeOfDay()} guest, please </p> <Login /> <p>for better user experience</p>
        </>;
    }

    function nameToCapital(name:string){
        return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    }

    function timeOfDay(){
        if(timeNow.getHours() >= 18 && timeNow.getHours() < 21){
            return "evening";
        } else if(timeNow.getHours() >= 12 && timeNow.getHours() < 18) {
            return "afternoon";
        } else if(timeNow.getHours() >= 21 && timeNow.getHours() < 5){
            return "night";
        }
        return "morning";
    }

    return (
        <div className="NavBar WHITE__BG">
            <section id="InfoSection">
                {renderClientInfo()}
            </section>
            {/* <Menu /> */}
            {/* <Cart /> */}
        </div>
    );
}

export default NavBar;
