import CarouselCustom from "@/components/CarouselCustom";

const UltimateHowTos = () => {
	const articleCarousel = [
		{
			id: 1,
			label: 'Slide 1',
			title: '5 things you’re doing wrong with your hair care routine',
			src: 'https://via.placeholder.com/375x190.jpg/EFADBA',
			tags: [
				{ class: 'bg-yellow-light text-gray-600', label: 'TAN' },
				{ class: 'bg-secondary text-white', label: 'NEW' },
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
				{ class: 'bg-pink-light text-gray-600', label: 'BODY' },
				{ class: 'bg-gray-400 text-gray-600', label: 'FEATURED' },
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
		<>
			<h2 className="text-center h1 mb-0 h1 pb-2 pb-lg-3 pt-1">The Ultimate How-Tos</h2>
			<CarouselCustom
				id="articleLoop"
				articleCard={true}
				useCardTemplate={true}
				items={articleCarousel}
				slideNumber={4}
				className="col-12 col-lg-6"
				roundedControl={false}
				colLgGrid={4}
				useRow={true} />
		</>
	);
};

export default UltimateHowTos;
