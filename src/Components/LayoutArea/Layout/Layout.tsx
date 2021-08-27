import { BrowserRouter } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import Routing from "../Routing/Routing";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";
import "./Layout.css";
import "../../../ToastifyNotifications/ToastifyStyle.css"
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import slide_in_right from "../../../ToastifyNotifications/ToastTransition";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <BrowserRouter>
                {/* ToastContainer renders app notifications */}
                <ToastContainer limit={7} autoClose={3000} transition={slide_in_right} /> 
                <header>
                    <Header />
                    <nav>
                        <NavBar />
                    </nav>
                </header>
                <main>
                    <Routing />
                    <WelcomeScreen />
                </main>
                <footer>
                    <Footer />
                </footer>
            </BrowserRouter>
        </div>
    );
}

export default Layout;
