import "../../../ToastifyNotifications/ToastifyStyle.css"
import "react-toastify/dist/ReactToastify.css";
import slide_in_right from "../../../ToastifyNotifications/ToastTransition";
import "./GlobalStyles.css";
import "./Layout.css";
import { ToastContainer } from "react-toastify";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import Footer from "../Footer/Footer";
import IdleTimerApi from "../../../Services/IdleTimerApi";
import DarkMode from "../DarkMode/DarkMode";
import { useAppSelector } from "../../../Redux/Hooks/hooks";

export default function Layout(): JSX.Element {

    // store color palette subscribe
    const colorPalette = useAppSelector(state => state.colorPaletteState.palette);

    /* init Idle timer api class */
    new IdleTimerApi();

    return (
        <div onClick={() => IdleTimerApi.clientMadeAction()} className="Layout" color-palette={colorPalette}>
            <DarkMode />
            <ToastContainer
                limit={7}
                autoClose={3000}
                transition={slide_in_right}
                pauseOnHover={false}
            />
            <header>
                <Header />
            </header>
            <nav>
                <NavBar />
                <Menu />
            </nav>
            <main>
                <Routing />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}