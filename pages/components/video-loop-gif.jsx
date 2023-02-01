import { Container } from "react-bootstrap";
import VideoLoop from "@/components/video-loop";

const VideoLoopGif = () => {
	return (
		<Container className="mt-4 position-relative">
            <h1>Video Loop</h1>
            <VideoLoop />
            <br />
            <h1>Video Loop Gif</h1>
            <VideoLoop gif={true} />
		</Container>
	);
}

export default VideoLoopGif;