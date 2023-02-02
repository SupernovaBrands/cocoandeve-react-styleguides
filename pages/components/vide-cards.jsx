import { Container } from "react-bootstrap";
import VideoCard from "@/components/video-card";

const VideoCards = () => {
	return (
		<Container className="mt-4 position-relative">
            <VideoCard title="Video Title" />
		</Container>
	);
}

export default VideoCards;