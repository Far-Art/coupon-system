import "./FlippableCard.css";
import { ReactElement, useState } from "react";
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';

interface FlippableProps {
    mainButtonText?: string;
    frontElement?: ReactElement<any, any>;
    backElement?: ReactElement<any, any>;
    frontButtonText?: string;
    backButtonText?: string;
    buttonStyleClass?: string;
}

function FlippableCard(props: FlippableProps): JSX.Element {


    const [isDisplayed, setIsDisplayed] = useState(false);
    const [displayed, setdisplayed] = useState("");

    const [isFlipped, setIsFlipped] = useState(false);
    const [flipped, setflipped] = useState("");

    function flip() {
        if (isFlipped) {
            setIsFlipped(false);
            setflipped("");
        } else {
            setIsFlipped(true);
            setflipped("flipped");
        }
    }

    function display() {
        if (isDisplayed) {
            setIsDisplayed(false);
            setdisplayed("");
        } else {
            setIsDisplayed(true);
            setdisplayed("ShowLoginMenu");
        }
    }

    return (
        <>
            <div className="FlippableCard">
                <button onClick={() => display()} className={props.buttonStyleClass ? props.buttonStyleClass : ""} > {!isDisplayed ? props.mainButtonText ? props.mainButtonText : "2 Sided Card" : <Icon component={CloseIcon} />}</button>
                <div className={"card " + flipped + " " + displayed}>
                    <div className="front face">
                        <button onClick={() => flip()} className={"ROTATE " + props.buttonStyleClass ? props.buttonStyleClass : ""}> {props.frontButtonText ? props.frontButtonText : "Rotate"} </button>
                        {props.frontElement ? props.frontElement : <div>Face of a card</div>}
                    </div>
                    <div className="back face">
                        <button onClick={() => flip()} className={"ROTATE " + props.buttonStyleClass ? props.buttonStyleClass : ""}> {props.backButtonText ? props.backButtonText : "Rotate"} </button>
                        {props.backElement ? props.backElement : <div>Back of a card</div>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default FlippableCard;