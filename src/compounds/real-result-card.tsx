import React from 'react';
import FiveStars from '~/images/icons/five-stars.svg';
import FiveStarsRounded from '~/images/five-stars-rounded.svg';
import parse from 'html-react-parser';
import Badge from '~/components/Badge';
import { useEffect, useState } from 'react';

const RealResultCard = (props) => {
	const { data, region, tab } = props;
	const [status, checkStatus] = useState(false);
	const [reveal, setReveal] = useState(false);

	let badgeColor = 'badge-purple';
	const capitalizeString = (str) => str.charAt(0).toUpperCase() + str.slice(1);

	const escapeHtml = (htmlString) => {
		const div = document.createElement('div');
		div.appendChild(document.createTextNode(htmlString));
		return div.innerHTML;
	};

	const checkProduct = async (handle) => {
		let { product } = await fetch(`/api/getProductInfo?handle=${handle}`).then((r) => r.json());
		// console.log('product', product)
		if (product === null) {
			// console.log('handle', handle)
			// console.log('product data', product);
			checkStatus(true)
		}
	}

	if (data.handle) {
		checkProduct(data.handle);
	}

	let review_type = data.review_type;

	let badges = [];

	if (data.review_type.includes(',')) {
		const reviewTypes = data.review_type.split(',').map(type => type.trim());
		reviewTypes.forEach(type => {
			let badgeColor = '';
			if (type === 'tan') {
				badgeColor = 'bg-sh-purple';
			} else if (type === 'hair') {
				badgeColor = 'bg-secondary';
			} else if (type === 'body') {
				badgeColor = 'bg-blue';
			} else if (type === 'suncare') {
				badgeColor = 'bg-suncare-blue';
			} else if (type === 'skin') {
				badgeColor = 'bg-skincare-orange';
			}
			if (badgeColor) {
				badges.push({ color: badgeColor, type: type });
			}
		});
	} else {
		if (review_type === 'tan') {
			badges.push({ color: 'bg-sh-purple', type: review_type });
		} else if (review_type === 'hair') {
			badges.push({ color: 'bg-secondary', type: review_type });
		} else if (review_type === 'body') {
			badges.push({ color: 'bg-blue', type: review_type });
		} else if (review_type === 'suncare') {
			badges.push({ color: 'bg-suncare-blue', type: review_type });
		} else if (review_type === 'skin') {
			badges.push({ color: 'bg-skincare-orange', type: review_type });
		}
	}

	if (region === 'au' && data.label.includes('Daily Radiance Primer SPF50 Sunscreen')) {
		data.label = data.label.replace('Daily Radiance Primer SPF50 Sunscreen', 'Daily Radiance Primer SPF 50');
	}

	if (region === 'us' && data.label.includes('Tan Boosting Anti-Aging Body Oil SPF30')) {
		data.label = data.label.replace('Tan Boosting Anti-Aging Body Oil SPF30', 'Tan Boosting Anti-Aging Body Oil SPF20');
	}

	if (region === 'us' && data.label.includes('Tan Boosting Anti-Aging Body Oil SPF50')) {
		data.label = data.label.replace('Tan Boosting Anti-Aging Body Oil SPF50', 'Tan Boosting Anti-Aging Body Oil SPF45');
	}

	const titleEscaped = escapeHtml(data.label);
	let titleDesc = `className="underline" aria-label="Review @ ${data.author} for ${titleEscaped}" title="Go To Product Page - `;

	if (status) {
		data.label = data.label.replace(`<a href="/products/${data.handle}"`, `<a href="/collections/${tab}"`);
	}

	// const bodyTest = parse(`${data.body}`);
	const MAX_CHARS = 130;
	const isTruncated = data.body.length > MAX_CHARS;

	return (
		<div className="w-full lg:w-1/3 lg:inline-block result-card sm:px-hg lg:px-g">
			<picture className="embed-responsive rounded-tl-lg rounded-br-0 rounded-tr-lg rounded-bl-0 overflow-hidden">
				<source srcSet={data.image_media ? data.image_media.url : data.image_old} media="(min-width: 992px)" />
				<img alt={`Review - ${data.review_type || ''} @${data.author || ''}`} className="w-full embed-responsive-item fit--cover rounded-tl-[.5em] rounded-br-[0] rounded-tr-[.5em] rounded-bl-[0] object-top" src={data.image_media ? data.image_media.url : data.image_old} loading="lazy" />
			</picture>
			<div className="px-2 pb-2 pt-2 bg-white border-l border-b border-r rounded-b border-l-gray-400 border-b-gray-400 border-r-gray-400 mb-2 lg:mb-3">
				<div className="flex justify-between items-center mb-1">
					{/* <FiveStars className="h-[1em] text-primary fill-primary text-base mb-0 max-w-none h4" /> */}
					<div className="stars-rounded flex min-h-[1rem]">
						<FiveStarsRounded className="mr-[4px]" />
						<FiveStarsRounded className="mr-[4px]" />
						<FiveStarsRounded className="mr-[4px]" />
						<FiveStarsRounded className="mr-[4px]" />
						<FiveStarsRounded className="mr-[4px]" />
					</div>
					<p>
						{badges.map((badge, index) => (
							<Badge key={index} badgeClasses={`text-white mb-0 ${badge.color} ${index === 0 && badges.length > 1 ? 'mr-1' : ''}`}>
								{capitalizeString(badge.type)}
							</Badge>
						))}
					</p>
				</div>
				{region === 'au' ? (
					<>{parse(`${data.label && (data.label.replace('title="', titleDesc)) && (data.label.replace('Daily Radiance Primer SPF50 Sunscreen', 'Daily Radiance Primer SPF 50'))}`)}</>
				) : (
					<>{parse(`${data.label && (data.label.replace('title="', titleDesc))}`)}</>
				)}
				<p className='my-1 lg:hidden'>
					{!reveal && parse(`${data.body.slice(0, MAX_CHARS)}`)}
					{!reveal && isTruncated && ('... ')}
					{!reveal && isTruncated && <span onClick={() => setReveal(true)} className='text-primary'>Read more</span>}
					{reveal && parse(`${data.body}`)}
				</p>
				<p className={`my-1 hidden lg:block ${data.body.length > 153 ? 'max-h-[80px] overflow-y-scroll small-scrollbar' : 'min-h-[80px]'}`}>
					{parse(`${data.body}`)}
				</p>
				<p className="font-weight-bold mb-0 font-bold">@{data.author}</p>
			</div>
		</div>
	);
};

export default RealResultCard;
