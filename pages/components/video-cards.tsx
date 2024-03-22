import VideoCard from "@/components/video-card";

const VideoCards = () => {
	const item = {
		label: 'Slide 1',
		title: 'Multi-masking #selfcaresunday with Janet Amrani',
		srcSet: 'https://via.placeholder.com/720x720',
		src: 'https://via.placeholder.com/592x592',
	};
	return (
		<div className="container mt-4 relative">
			<h1 className="mb-[0.625rem]">Video Card</h1>
            <VideoCard item={item} />
		</div>
	);
}

export default VideoCards;