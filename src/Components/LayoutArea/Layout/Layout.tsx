import { BrowserRouter } from "react-router-dom";
import Cart from "../Cart/Cart";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import NavBar from "../NavBar/NavBar";
import Routing from "../Routing/Routing";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <BrowserRouter>
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
