import React from 'react';
import FiveStars from '@/images/icons/five-stars.svg';
import parse from 'html-react-parser';
import Badge from '@/components/Badge';

const RealResultCard = (props) => {
	const { data } = props;
	let badgeColor = 'badge-purple';

	let storeName = 'us';

	const capitalizeString = (str) => str.charAt(0).toUpperCase() + str.slice(1);

	const escapeHtml = (htmlString) => {
		const div = document.createElement('div');
		div.appendChild(document.createTextNode(htmlString));
		return div.innerHTML;
	};

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

	if (storeName === 'au' && data.label.includes('Daily Radiance Primer SPF50 Sunscreen')) {
		data.label = data.label.replace('Daily Radiance Primer SPF50 Sunscreen', 'Daily Radiance Primer SPF 50');
	}

	const titleEscaped = escapeHtml(data.label);
	const titleDesc = `aria-label="Review @ ${data.author} for ${titleEscaped}" title="Go To Product Page - `;

	return (
		<div className="w-full lg:w-1/3 lg:inline-block px-g">
			<picture className="embed-responsive rounded-tl-lg rounded-br-0 rounded-tr-lg rounded-bl-0 overflow-hidden">
				<source srcSet={data.image_media ? data.image_media.url : data.image_old} media="(min-width: 992px)" />
				<img alt={`Review - ${data.review_type || ''} @${data.author || ''}`} className="w-full embed-responsive-item fit--cover rounded-tl-[.5em] rounded-br-[0] rounded-tr-[.5em] rounded-bl-[0]" src={data.image_media ? data.image_media.url : data.image_old} loading="lazy" />
			</picture>
			<div className="px-2 pb-2 pt-0 bg-white">
				<p className="flex justify-between items-center mb-0">
					<FiveStars className="h-[1em] text-primary fill-primary text-lg mb-0 max-w-none" />
					<Badge badgeClasses={`bg-sh-purple text-white mb-1 mt-1 ${badgeColor}`}>{capitalizeString(data.review_type || '')}</Badge>
				</p>
				{storeName === 'au' ? (
					<>{parse(`${data.label && (data.label.replace('title="', titleDesc)) && (data.label.replace('Daily Radiance Primer SPF50 Sunscreen', 'Daily Radiance Primer SPF 50'))}`)}</>
				) : (
					<>{parse(`${data.label && (data.label.replace('title="', titleDesc))}`)}</>
				)}
				<p>{parse(`${data.body}`)}</p>
				<p className="text-underline font-weight-bold">@{data.author}</p>
			</div>
		</div>
	);
};

export default RealResultCard;
