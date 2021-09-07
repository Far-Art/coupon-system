import "./EmptyView.css";

function EmptyView(): JSX.Element {
    return (
        <div className="EmptyView">
			<iframe 
                src="https://giphy.com/embed/39Zs6k1mvNkZ2"
                width="420"
                height="175"
                className="giphy-embed"
            >
            </iframe>
            <p>
                <a href="https://giphy.com/gifs/tom-and-jerry-cat-sad-39Zs6k1mvNkZ2"></a>
            </p>
        </div>
    );
}

export default EmptyView;