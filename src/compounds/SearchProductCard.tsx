const SearchProductCard = (props: any) => {
	const { url, title, img, trackEvent, subtitle, classes } = props;

	const tracking = () => {
		if (typeof trackEvent !== 'function') return;
		trackEvent('search_product', { category: 'Clickout', target: url });
		trackEvent('product_card_click', { category: 'Clickout', target: url });
	};

	const src192 = img
		? img.replace('/public', '/192x').replace('.jpg', '_192x.jpg').replace('.png', '_192x.png')
		: img;

	return (
		<a
			onClick={tracking}
			href={`/products/${url}`}
			className={`flex items-center gap-[16px] no-underline text-body hover:no-underline py-[8px] ${classes || ''}`}
		>
			<div className="flex-shrink-0 w-[40px] h-[40px] bg-pink-light overflow-hidden">
				{img && (
					<img
						src={src192}
						alt={title}
						className="w-full h-full object-cover"
						loading="lazy"
						width={56}
						height={70}
					/>
				)}
			</div>
			<div className="flex flex-col min-w-0">
				<span className="font-bold text-body text-sm lg:text-base leading-snug">{title}</span>
				{subtitle && (
					<span className="text-sm italic text-gray-600 mt-[2px]">{subtitle}</span>
				)}
			</div>
		</a>
	);
};

export default SearchProductCard;
