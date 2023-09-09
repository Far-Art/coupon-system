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
                    <img
                        className="iframegif happygif"
                        width="444px"
                        height="334px"
                        alt="Tom dancing"
                    />

                </>
            ) : (
                <>
                    <p className="EmptyViewText">{props.text ? props.text : ""}</p>
                    <img
                        className="iframegif depressedgif"
                        alt="Tom and Jerry depressed"
                        width="480px"
                        height="198px"
                    />
                </>
            )}
        </div>
    );
}