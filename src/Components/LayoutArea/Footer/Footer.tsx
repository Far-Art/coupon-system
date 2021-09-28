import { NavLink } from "react-router-dom";
import "./Footer.css";

export default function Footer(): JSX.Element {
    return (
        <div className="Footer WHITE__BG">
                <a href="https://far-art-portfolio.herokuapp.com/" target="_blank" rel="noreferrer">This coupon system mockup is a personal project of Artur Farmanov&copy; and is made only for skills demonstration.</a>
                <NavLink to="/credits">To documentation and credits page</NavLink>
        </div>
    );
}