import { Container } from "react-bootstrap";
import VideoCard from "@/components/video-card";

const VideoCards = () => {
	const item = {
		label: 'Slide 1',
		title: 'Multi-masking #selfcaresunday with Janet Amrani',
		srcSet: 'https://via.placeholder.com/720x720',
		src: 'https://via.placeholder.com/592x592',
	};
	return (
		<Container className="mt-4 position-relative">
            <VideoCard item={item} />
		</Container>
	);
}

export default VideoCards;