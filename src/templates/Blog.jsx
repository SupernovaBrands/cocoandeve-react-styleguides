import { Container, Row } from "react-bootstrap";
import BlogNavTag from '@/compounds/blog-nav-tags';
import ArticleRecommendation from "@/sections/ArticleRecommendation";
import ArticleCard from "@/compounds/ArticleCard";
import UltimateHowTos from "@/sections/UltimateHowTos";
import Link from "next/link";
import CarouselCustom from "@/components/CarouselCustom";

const Blog = () => {
	const ARTICLE_LIST = [
		{
			id: 1,
			src: 'https://via.placeholder.com/375x190.jpg/EFADBA',
			title: '5 things you’re doing wrong with your hair care routine',
			desc: 'Give these myths the brush off for a healthy scalp & shiny hair!',
			tags: [
				{ class: 'bg-secondary-light text-gray-600', label: 'HAIR' },
				{ class: 'bg-primary text-white', label: 'HOT' },
			],
		},
		{
			id: 2,
			src: 'https://via.placeholder.com/375x190.jpg/EFADBA',
			title: '5 things you’re doing wrong with your hair care routine',
			desc: 'Give these myths the brush off for a healthy scalp & shiny hair!',
			tags: [
				{ class: 'bg-pink-light text-gray-600', label: 'BODY' },
				{ class: 'bg-gray-400 text-gray-600', label: 'FEATURED' },
			],
		},
		{
			id: 3,
			src: 'https://via.placeholder.com/375x190.jpg/EFADBA',
			title: '5 things you’re doing wrong with your hair care routine',
			desc: 'Give these myths the brush off for a healthy scalp & shiny hair!',
			tags: [
				{ class: 'bg-secondary-light text-gray-600', label: 'HAIR' },
				{ class: 'bg-primary text-white', label: 'HOT' },
			],
		},
		{
			id: 4,
			src: 'https://via.placeholder.com/375x190.jpg/EFADBA',
			title: '5 things you’re doing wrong with your hair care routine',
			desc: 'Give these myths the brush off for a healthy scalp & shiny hair!',
			tags: [
				{ class: 'bg-pink-light text-gray-600', label: 'BODY' },
				{ class: 'bg-gray-400 text-gray-600', label: 'FEATURED' },
			],
		},
		{
			id: 5,
			src: 'https://via.placeholder.com/375x190.jpg/EFADBA',
			title: '5 things you’re doing wrong with your hair care routine',
			desc: 'Give these myths the brush off for a healthy scalp & shiny hair!',
			tags: [
				{ class: 'bg-yellow-light text-gray-600', label: 'TAN' },
				{ class: 'bg-secondary text-white', label: 'NEW' },
			],
		},
		{
			id: 6,
			src: 'https://via.placeholder.com/375x190.jpg/EFADBA',
			title: '5 things you’re doing wrong with your hair care routine',
			desc: 'Give these myths the brush off for a healthy scalp & shiny hair!',
			tags: [
				{ class: 'bg-pink-light text-gray-600', label: 'BODY' },
				{ class: 'bg-gray-400 text-gray-600', label: 'FEATURED' },
			],
		}
	];
	const articleCarousel = [
		{
			id: 1,
			label: 'Slide 1',
			title: '5 things you’re doing wrong with your hair care routine',
			src: 'https://via.placeholder.com/375x190.jpg/EFADBA',
			tags: [
				{ class: 'bg-pink-light text-gray-600', label: 'BODY' },
				{ class: 'bg-gray-400 text-gray-600', label: 'FEATURED' },
			],
		},
		{
			id: 2,
			label: 'Slide 2',
			title: '5 things you’re doing wrong with your hair care routine',
			src: 'https://via.placeholder.com/375x190.jpg/EFADBA',
			tags: [
				{ class: 'bg-secondary-light text-gray-600', label: 'HAIR' },
				{ class: 'bg-primary text-white', label: 'HOT' },
			],
		},
		{
			id: 3,
			label: 'Slide 3',
			title: '5 things you’re doing wrong with your hair care routine',
			src: 'https://via.placeholder.com/375x190.jpg/EFADBA',
			tags: [
				{ class: 'bg-yellow-light text-gray-600', label: 'TAN' },
				{ class: 'bg-secondary text-white', label: 'NEW' },
			],
		},
		{
			id: 4,
			label: 'Slide 4',
			title: '5 things you’re doing wrong with your hair care routine',
			src: 'https://via.placeholder.com/375x190.jpg/EFADBA',
			tags: [
				{ class: 'bg-secondary-light text-gray-600', label: 'HAIR' },
				{ class: 'bg-primary text-white', label: 'HOT' },
			],
		}
	];
	return (
		<div className="mobile-wrapper">
			<Container className="mt-4">
				<h1 class="text-center mb-0">COCO & EVE BLOG</h1>
				<div className="blog-nav-tags mb-4 d-flex mt-2">
                    <BlogNavTag title="All" active={true} />
                    <BlogNavTag title="Hair"/>
                    <BlogNavTag title="Tan"/>
                    <BlogNavTag title="Body"/>
                    <BlogNavTag title="How to's"/>
                </div>
				<CarouselCustom
					id="articleLoop"
					articleCard={true}
					useCardTemplate={true}
					items={articleCarousel}
					slideNumber={4}
					className="col-12 col-lg-6"
					controlPrevClass="ms-lg-2 px-lg-0"
					controlNextClass="me-lg-2 px-lg-0"
					roundedControl={false}
					colLgGrid={4}
					useRow={true} />
				<Row className="article-list-wrapper mb-lg-4">
					<ArticleRecommendation />
					<div className="d-flex flex-wrap mb-0 mt-2">
						{ARTICLE_LIST.map((article) => (
							<ArticleCard key={article.id} item={article} className="col-12 col-lg-4" />
						))}
					</div>
				</Row>
				<UltimateHowTos />
				<Row className="article-list-wrapper mb-lg-4">
					<div className="d-flex flex-wrap mb-0 mt-2">
						{ARTICLE_LIST.slice(0, 3).map((article) => (
							<ArticleCard key={article.id} item={article} className="col-12 col-lg-4" />
						))}
					</div>
					<div className="w-100 text-center">
						<Link href="#" className="btn btn-lg btn-outline-primary mb-4">Load more posts</Link>
					</div>
				</Row>

			</Container>
		</div>
	);
};

export default Blog;
