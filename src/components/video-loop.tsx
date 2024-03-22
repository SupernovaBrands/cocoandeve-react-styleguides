
const VideoLoop = (props) => {
    const { gif } = props;
	return (
		<div className="video-loop inline-block relative">
            <video autoPlay={true} loop={true} muted={true} playsInline={true}>
                <source type="video/mp4" src="https://cdn.shopify.com/videos/c/o/v/ad2608e82d61408cb7527055a02632cf.mp4" />
            </video>
        </div>
	);
}

export default VideoLoop;