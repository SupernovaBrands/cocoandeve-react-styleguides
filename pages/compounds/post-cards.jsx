import CarouselFull from "@/components/CarouselFull";
import PostCard from "@/components/PostCard";
import { Container } from "react-bootstrap";

const PostCards = () => {
	const postData = [
		{
			img: 'https://via.placeholder.com/770x513',
			time: '04 May, 2020',
			title: '5 things you’re doing wrong with your hair care routine',
			desc: 'Give these myths the brush off for a healthy scalp & shiny hair!',
			label: `Slide 1`,
			index: 0,
		},
		{
			img: 'https://via.placeholder.com/252x448',
			time: '04 May, 2020',
			title: '5 things you’re doing wrong with your hair care routine',
			desc: 'Give these myths the brush off for a healthy scalp & shiny hair!',
			label: `Slide 2`,
			index: 1,
		},
		{
			img: 'https://via.placeholder.com/528x793',
			time: '04 May, 2020',
			title: '5 things you’re doing wrong with your hair care routine',
			desc: 'Give these myths the brush off for a healthy scalp & shiny hair!',
			label: `Slide 3`,
			index: 2,
		}
	];
	return (
		<Container>
			<h1>POST CARD</h1>
			<PostCard src="https://via.placeholder.com/375x190.jpg/EFADBA" className="mb-4 mb-lg-3">
				<time>04 May, 2020</time>
                <h3 className="mt-1 mb-1">5 things you’re doing wrong with your hair care routine</h3>
                <p>Give these myths the brush off for a healthy scalp & shiny hair!</p>
			</PostCard>

			<h1>POST CARDS GRID</h1>
			<ul className="row mb-5 list-unstyled">
				{postData.map((post) => (
					<li key={post.index} className="col-12 col-lg-4">
						<PostCard src="https://via.placeholder.com/375x190.jpg/EFADBA" className="mb-4 mb-lg-3">
							<time>{post.time}</time>
							<h3 className="mt-1 mb-1">{post.title}</h3>
							<p>{post.desc}</p>
						</PostCard>
					</li>
				))}
			</ul>

			<h1>POST CARDS GRID NO IMAGE</h1>
			<ul className="row mb-5 list-unstyled">
				{postData.map((post) => (
					<li key={post.index} className="col-12 col-lg-4">
						<PostCard>
							<time>{post.time}</time>
							<h3 className="mt-1 mb-1">{post.title}</h3>
							<p>{post.desc}</p>
						</PostCard>
					</li>
				))}
			</ul>

			<h1>POST CARDS CAROUSEL</h1>
			<PostCard className="mb-4 mb-lg-3">
				<CarouselFull as="figure" id="groupedControls"
					items={postData}
					indicatorBorder={false}
					customArrows={true}
					groupedControls={true}
					className="carousel--fixed-height mb-2"
					parentClass="no-gutters__in-container" />
				<time>04 May, 2020</time>
                <h3 className="mt-1 mb-1">5 things you’re doing wrong with your hair care routine</h3>
                <p>Give these myths the brush off for a healthy scalp & shiny hair!</p>
			</PostCard>

		</Container>
	);
};

export default PostCards;
