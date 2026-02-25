import React from 'react';
import FiveStars from '~/images/icons/five-stars.svg';
import FiveStarsRounded from '~/images/five-stars-rounded.svg';
import parse from 'html-react-parser';
import Badge from '~/components/Badge';
import { useEffect, useState } from 'react';

const SingleStar = () => (
	<>
		<svg className="mt-[2px]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="#151515">
			<path d="M8.14703 0.894267L9.36303 3.99827C9.4301 4.14077 9.52956 4.26562 9.65345 4.36285C9.77735 4.46008 9.92227 4.527 10.0766 4.55827L13.647 4.79827C13.8798 4.83415 14.0889 4.96097 14.2282 5.15087C14.3676 5.34077 14.4258 5.57823 14.3902 5.81107C14.3607 6.00536 14.2679 6.18449 14.1262 6.32067L11.4286 8.81107C11.315 8.92382 11.233 9.06448 11.1908 9.21894C11.1487 9.3734 11.1479 9.53622 11.1886 9.69107L11.9814 13.3071C12.0413 13.5266 12.0116 13.7608 11.899 13.9585C11.7864 14.1561 11.6 14.3011 11.3806 14.3615C11.2688 14.392 11.1519 14.3995 11.0371 14.3836C10.9223 14.3676 10.8119 14.3285 10.7126 14.2687L7.61903 12.3407C7.48718 12.2616 7.33635 12.2199 7.18263 12.2199C7.02891 12.2199 6.87808 12.2616 6.74623 12.3407L3.65263 14.2687C3.55633 14.327 3.44947 14.3658 3.33816 14.3828C3.22686 14.3997 3.11329 14.3946 3.00398 14.3676C2.89466 14.3407 2.79174 14.2924 2.70112 14.2256C2.61049 14.1588 2.53393 14.0747 2.47583 13.9783C2.41611 13.8786 2.3771 13.768 2.36116 13.6529C2.34521 13.5379 2.35265 13.4208 2.38303 13.3087L3.17583 9.69267C3.21627 9.53781 3.21539 9.37505 3.17327 9.22064C3.13116 9.06623 3.04929 8.92556 2.93583 8.81267L0.31823 6.41267C0.133683 6.25257 0.0201208 6.02584 0.00242636 5.78217C-0.015268 5.5385 0.064348 5.29775 0.22383 5.11267C0.369713 4.94348 0.572175 4.83315 0.79343 4.80227L4.36383 4.48227C4.52356 4.46597 4.6754 4.40471 4.80171 4.30559C4.92802 4.20646 5.02363 4.07355 5.07743 3.92227L6.50543 0.467867C6.5507 0.371116 6.61462 0.284247 6.69352 0.212239C6.77241 0.14023 6.86475 0.084496 6.96522 0.0482302C7.06569 0.0119643 7.17234 -0.00412088 7.27904 0.00089615C7.38574 0.00591318 7.4904 0.0319338 7.58703 0.0774673C7.68521 0.123798 7.77315 0.189274 7.84569 0.270052C7.91822 0.35083 7.97389 0.445283 8.00943 0.547867L8.14703 0.894267Z" fill="#151515"/>
		</svg>
	</>
)

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
	// @ts-ignore
	const children = parse(data.label)?.props?.children && parse(data.label)?.props?.children[1] ? parse(data.label)?.props?.children[1]?.props?.children : `Review @ ${data.author} for ${data.handle}`;
	let titleDesc = `className="underline ml-[8px] text-body underline-offset-4 text-[14px]" aria-label="${children}" title="Go To Product Page - `;

	if (status) {
		data.label = data.label.replace(`<a href="/products/${data.handle}"`, `<a href="/collections/${tab}"`);
	}

	// const bodyTest = parse(`${data.body}`);
	const MAX_CHARS = 130;
	const isTruncated = data.body.length > MAX_CHARS;

	// console.log('escaped', parse(data.label)?.props?.children);
	
	
	// console.log('test', children);
	// const test = parse(data.label).toString

	return (
		<div className="w-full lg:w-1/3 lg:inline-block result-card sm:px-hg">
			<picture className="embed-responsive rounded-none overflow-hidden">
				<source srcSet={data.image_media ? data.image_media.url : data.image_old} media="(min-width: 992px)" />
				<img alt={`Review - ${data.review_type || ''} @${data.author || ''}`} className="w-full embed-responsive-item fit--cover rounded-none object-top" src={data.image_media ? data.image_media.url : data.image_old} loading="lazy" />
			</picture>
			<div className="py-[1rem] px-[12px] bg-white rounded-none mb-2">
				<div className="flex items-center mb-[8px] gap-[12px]">
					{/* <FiveStars className="h-[1em] text-primary fill-primary text-base mb-0 max-w-none h4" /> */}
					<p>
						{badges.map((badge, index) => (
							<Badge key={index} badgeClasses={`text-white mb-0 ${badge.color} ${index === 0 && badges.length > 1 ? 'mr-1' : ''}`}>
								{capitalizeString(badge.type)}
							</Badge>
						))}
					</p>
					<div className="flex items-center review-stars__link gap-[4px]">
						<SingleStar />
						<span className="text-gray-600 leading-none">5.0</span>
					</div>
				</div>
				{region === 'au' ? (
					<>{parse(`${data.label && (data.label.replace('title="', titleDesc)) && (data.label.replace('Daily Radiance Primer SPF50 Sunscreen', 'Daily Radiance Primer SPF 50'))}`)}</>
				) : (
					<p className="text-[14px]">{parse(`${data.label && (data.label.replace('title="', titleDesc))}`)}</p>
				)}
				<p className='my-1 lg:hidden'>
					{!reveal && parse(`${data.body.slice(0, MAX_CHARS)}`)}
					{!reveal && isTruncated && ('... ')}
					{!reveal && isTruncated && <span onClick={() => setReveal(true)} className='text-body underline underline-offset-4 decoration-1'>Read more</span>}
					{reveal && parse(`${data.body}`)}
				</p>
				<p className={`my-1 hidden lg:block ${data.body.length > 153 ? 'max-h-[80px] overflow-y-scroll small-scrollbar' : 'min-h-[80px]'}`}>
					{parse(`${data.body}`)}
				</p>
				<p className="font-weight-bold mb-0 font-bold text-sm">@{data.author}</p>
			</div>
		</div>
	);
};

export default RealResultCard;
