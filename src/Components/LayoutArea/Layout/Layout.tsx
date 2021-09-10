import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import Routing from "../Routing/Routing";
import "./Layout.css";
import "./GlobalStyles.css";
import "../../../ToastifyNotifications/ToastifyStyle.css"
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import slide_in_right from "../../../ToastifyNotifications/ToastTransition";
import Menu from "../Menu/Menu";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
                {/* ToastContainer renders app notifications */}
                <ToastContainer 
                    limit={7} 
                    autoClose={3000} 
                    transition={slide_in_right} 
                    pauseOnHover={false} 
                />
                <section className="HEADER_BG">
                    <header>
                        <Header /> 
                    </header>
                    <nav>
                        <NavBar />
                        <Menu />
                    </nav>
                </section>
                <main>
                    <Routing />
                </main>
                <footer>
                    <Footer />
                </footer>
        </div>
    );
}

export default Layout;