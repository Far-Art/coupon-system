import "./EmptyView.css";

interface EmptyViewProps {
    text?: string;
    state?: "happy";
}

export default function EmptyView(props: EmptyViewProps): JSX.Element {

    return (
        <div className="EmptyView">
            {props.state === "happy" ? (
                <>
                    <iframe
                        className="iframegif"
                        scrolling="no"
                        src="https://c.tenor.com/Ohbgk_umVtgAAAAC/tom-and-jerry-dancing.gif"
                        width="500"
                        height="330"
                        title="Tom and Jerry upset on rails"
                    >
                    </iframe>
                </>
            ) : (
                <>
                    <p className="EmptyViewText">{props.text ? props.text : ""}</p>
                    <iframe
                        className="iframegif"
                        scrolling="no"
                        src="https://mrwgifs.com/wp-content/uploads/2014/01/Tom-and-Jerry-Depressed-By-On-The-Train-Tracks-In-Sad-Episode.gif"
                        width="480"
                        height="190"
                        title="Tom happy dancing"
                    >
                    </iframe>
                </>
            )}
        </div>
    );
}