import { Container } from "react-bootstrap";

const VideoLoop = (props) => {
    const { gif } = props;
	return (
		<>
            {gif ? (
                <div className="video-loop-gif">
                    <img src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/haircut2.jpg?v=1658810967" alt="Hair image" loading="lazy" />
                    <details open>
                        <summary role="button" aria-label="static image"></summary>
                        <img src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/haircut2.gif?v=1658808652" alt="Hair video animated GIF" loading="lazy" />
                    </details>
                </div>
            ) : (
                <div className="video-loop d-inline-block position-relative">
                    <video autoplay="autoplay" loop="loop" muted="muted" playsinline="playsinline">
                        <source type="video/mp4" src="https://cdn.shopify.com/videos/c/o/v/ad2608e82d61408cb7527055a02632cf.mp4" />
                    </video>
                    <button className="video-loop__action rounded-circle" aria-label="Pause"></button>
                </div>
            )}
            
		</>
	);
}

export default VideoLoop;