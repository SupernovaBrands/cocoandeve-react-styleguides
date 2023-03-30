const ProgressBar = (props) => {
    return (
        <div className="reading-proggress-bar position-fixed no-gutters__in-container w-100 m-0">
            <div className="reading-proggress-bar__proggress" style={{width: props.width}}></div>
        </div>
    );
};


export default ProgressBar;