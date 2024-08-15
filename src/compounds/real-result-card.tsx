import React from 'react';
import FiveStars from '~/images/icons/five-stars.svg';
import parse from 'html-react-parser';
import Badge from '~/components/Badge';
import { useEffect, useState } from 'react';

const RealResultCard = (props) => {
	const { data, region, tab } = props;
	const [status, checkStatus] = useState(false);

	let badgeColor = 'badge-purple';
	const capitalizeString = (str) => str.charAt(0).toUpperCase() + str.slice(1);

	const escapeHtml = (htmlString) => {
		const div = document.createElement('div');
		div.appendChild(document.createTextNode(htmlString));
		return div.innerHTML;
	};
	
	const checkProduct = async (handle) => {
		let { product } = await fetch(`/api/getProductInfo?handle=${handle}`).then((r) => r.json());
		console.log('product', product)
		if (product === null) {
			console.log('handle', handle)
			console.log('product data', product);
			checkStatus(true)
		}
	}

	if (data.handle) {
		checkProduct(data.handle);
	}

	if (data.review_type === 'tan') {
		badgeColor = 'bg-sh-purple';
	} else if (data.review_type === 'hair') {
		badgeColor = 'bg-secondary';
	} else if (data.review_type === 'body') {
		badgeColor = 'bg-blue';
	} else if (data.review_type === 'suncare') {
		badgeColor = 'bg-suncare-blue';
	} else if (data.review_type === 'skin') {
		badgeColor = 'bg-skincare-orange';
	}

	if (region === 'au' && data.label.includes('Daily Radiance Primer SPF50 Sunscreen')) {
		data.label = data.label.replace('Daily Radiance Primer SPF50 Sunscreen', 'Daily Radiance Primer SPF 50');
	}

	if (region === 'us' && data.label.includes('Tan Boosting Anti-Aging Body Oil SPF30')) {
		data.label = data.label.replace('Tan Boosting Anti-Aging Body Oil SPF30', 'Tan Boosting Anti-Aging Body Oil SPF20');
	}

	const titleEscaped = escapeHtml(data.label);
	let titleDesc = `className="underline" aria-label="Review @ ${data.author} for ${titleEscaped}" title="Go To Product Page - `;

	if (status) {
		data.label = data.label.replace(`<a href="/products/${data.handle}"`, `<a href="/collections/${tab}"`);
	}

	return (
		<div className="w-full lg:w-1/3 lg:inline-block result-card sm:px-hg lg:px-g">
			<picture className="embed-responsive rounded-tl-lg rounded-br-0 rounded-tr-lg rounded-bl-0 overflow-hidden">
				<source srcSet={data.image_media ? data.image_media.url : data.image_old} media="(min-width: 992px)" />
				<img alt={`Review - ${data.review_type || ''} @${data.author || ''}`} className="w-full embed-responsive-item fit--cover rounded-tl-[.5em] rounded-br-[0] rounded-tr-[.5em] rounded-bl-[0]" src={data.image_media ? data.image_media.url : data.image_old} loading="lazy" />
			</picture>
			<div className="px-2 pb-2 pt-0 bg-white">
				<p className="flex justify-between items-center mb-0">
					<FiveStars className="h-[1em] text-primary fill-primary text-base mb-0 max-w-none h4" />
					<Badge badgeClasses={`text-white mb-1 mt-1 ${badgeColor}`}>{capitalizeString(data.review_type || '')}</Badge>
				</p>
				{region === 'au' ? (
					<>{parse(`${data.label && (data.label.replace('title="', titleDesc)) && (data.label.replace('Daily Radiance Primer SPF50 Sunscreen', 'Daily Radiance Primer SPF 50'))}`)}</>
				) : (
					<>{parse(`${data.label && (data.label.replace('title="', titleDesc))}`)}</>
				)}
				<p className='mt-g mb-g'>{parse(`${data.body}`)}</p>
				<p className="underline font-weight-bold mb-g font-bold">@{data.author}</p>
			</div>
		</div>
	);
};

export default RealResultCard;
