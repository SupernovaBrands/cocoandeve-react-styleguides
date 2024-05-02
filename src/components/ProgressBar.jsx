const ProgressBar = (props) => {
    return (
        <div className="reading-proggress-bar no-gutters__in-container w-full m-0 hidden">
            <div className="reading-proggress-bar__proggress" style={{width: props.width}}></div>
        </div>
    );
};


export default ProgressBar;