import '~/config';
import SvgFull from '~/images/icons/star-full.svg';
import React, { useState, useEffect, useRef } from 'react';
import ReviewStar from './ReviewStar';
import { currentTime, encryptParam } from '~/modules/utils';
import ReviewStarSingle from './ReviewStarSingle';

const SingleStar = ({score}) => (
	<>
		<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="#151515">
			<path d="M8.14703 0.894267L9.36303 3.99827C9.4301 4.14077 9.52956 4.26562 9.65345 4.36285C9.77735 4.46008 9.92227 4.527 10.0766 4.55827L13.647 4.79827C13.8798 4.83415 14.0889 4.96097 14.2282 5.15087C14.3676 5.34077 14.4258 5.57823 14.3902 5.81107C14.3607 6.00536 14.2679 6.18449 14.1262 6.32067L11.4286 8.81107C11.315 8.92382 11.233 9.06448 11.1908 9.21894C11.1487 9.3734 11.1479 9.53622 11.1886 9.69107L11.9814 13.3071C12.0413 13.5266 12.0116 13.7608 11.899 13.9585C11.7864 14.1561 11.6 14.3011 11.3806 14.3615C11.2688 14.392 11.1519 14.3995 11.0371 14.3836C10.9223 14.3676 10.8119 14.3285 10.7126 14.2687L7.61903 12.3407C7.48718 12.2616 7.33635 12.2199 7.18263 12.2199C7.02891 12.2199 6.87808 12.2616 6.74623 12.3407L3.65263 14.2687C3.55633 14.327 3.44947 14.3658 3.33816 14.3828C3.22686 14.3997 3.11329 14.3946 3.00398 14.3676C2.89466 14.3407 2.79174 14.2924 2.70112 14.2256C2.61049 14.1588 2.53393 14.0747 2.47583 13.9783C2.41611 13.8786 2.3771 13.768 2.36116 13.6529C2.34521 13.5379 2.35265 13.4208 2.38303 13.3087L3.17583 9.69267C3.21627 9.53781 3.21539 9.37505 3.17327 9.22064C3.13116 9.06623 3.04929 8.92556 2.93583 8.81267L0.31823 6.41267C0.133683 6.25257 0.0201208 6.02584 0.00242636 5.78217C-0.015268 5.5385 0.064348 5.29775 0.22383 5.11267C0.369713 4.94348 0.572175 4.83315 0.79343 4.80227L4.36383 4.48227C4.52356 4.46597 4.6754 4.40471 4.80171 4.30559C4.92802 4.20646 5.02363 4.07355 5.07743 3.92227L6.50543 0.467867C6.5507 0.371116 6.61462 0.284247 6.69352 0.212239C6.77241 0.14023 6.86475 0.084496 6.96522 0.0482302C7.06569 0.0119643 7.17234 -0.00412088 7.27904 0.00089615C7.38574 0.00591318 7.4904 0.0319338 7.58703 0.0774673C7.68521 0.123798 7.77315 0.189274 7.84569 0.270052C7.91822 0.35083 7.97389 0.445283 8.00943 0.547867L8.14703 0.894267Z" fill="#151515"/>
		</svg>
		<span className="pl-[.25rem] text-gray-600">{Math.round(score * 10)/10}</span>
	</>
)

const YotpoStar = (props: any) => {
	const [init, setInit] = useState(false);
	const [score, setScore] = useState(5);
	const [total, setTotal] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const hasFetchedRef = useRef(false);

	const apiUrl = 'https://reviews-api.cocoandeve.com/api';
	const signature = encryptParam(`{sku:'${props.sku}',time:${currentTime()}}`);
	const localeParam = 'en';

	const fetchStar = () => {
		if (hasFetchedRef.current) return;
		hasFetchedRef.current = true;

		fetch(`${apiUrl}/product/bottomline.json?lang=${localeParam}&sku=${props.sku}`, {
			headers: { 'signature': signature }
		}).then((response) => response.json()).then((data) => {
			if (data.response && data.response.bottomline) {
				setScore(data?.response?.bottomline?.average_score);
				setTotal(data?.response?.bottomline?.total_review);
			}
			if (!init) {
				setInit(true);
			}
		}).catch((error) => {
			console.error('Error fetching Yotpo reviews:', error);
			hasFetchedRef.current = false;
		});
	};

	useEffect(() => {
		if (!props.sku || props.sku.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !isVisible) {
						setIsVisible(true);
					}
				});
			},
			{
				root: null,
				rootMargin: '0px 300px 0px 300px',
				threshold: 0.1
			}
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => {
			if (containerRef.current) {
				observer.unobserve(containerRef.current);
			}
		};
	}, [props.sku, isVisible]);

	// fetch reviews when visible
	useEffect(() => {
		if (isVisible && props.sku.length > 0 && !init) {
			fetchStar();
		}
	}, [isVisible]);

	return (
		<div ref={containerRef} className={`flex items-center ${props.className}`} data-skus={props.sku}>
			{init ? (
				<>
					<a href={`/products/${props?.productHandle}?write-a-review=true`} className="flex text-[14px] leading-[18px] review-stars__link" aria-label="Write a review for this product">
						{!props.smSingleStarAllDevice && (
							// <ReviewStar score={score} className={`${props.smSingleStar ? 'review-star__v1 hidden lg:flex' : 'flex'}`} />
							<>
								{/* <SvgFull role="presentation" className={`fill-body`} /> */}
								<SingleStar score={score} />
							</>
						)}
					</a>
					{props.smSingleStar && (
						<>
							<a className="review-star__v2" href={`/products/${props?.productHandle}?write-a-review=true`} aria-label="Write a review for this product">
								<ReviewStarSingle className={`${props.smSingleStarAllDevice ? '' : 'lg:hidden'}`} />
							</a>
							<a className="review-star__v2" href={`/products/${props?.productHandle}?write-a-review=true`} aria-label="Write a review for this product">
								<span className={`${props.smSingleStarAllDevice ? '' : 'lg:hidden'} ml-25`}>{score ? score.toFixed(1) : 0}/5.0</span>
							</a>
						</>
					)}
					{props.showScore && score && (
						<span className="ml-25">({score?.toFixed(0)})</span>
					)}
					{/* {props.showTotal && (
						<span className="ml-25 review-star__total">
							<a href={`/products/${props?.productHandle}?write-a-review=true`} className={`${props.smSingleStar || props.sustainability ? '' : ''} text-xs text-body hover:text-primary ${props.hideUnderline ? '' : 'underline'} yotpo-start__number`} aria-label={`Total reviews (${total?.toFixed(0)})`}>({total?.toFixed(0)})</a>
						</span>
					)} */}
				</>
			) : (
				<div className="" aria-hidden="true" >
					{/* <ReviewStar score={4.5} className="flex items-center" /> */}
					<span className="flex items-center text-[14px] leading-[18px] lg:text-base lg:leading-[28px]">
						{/* <SvgFull role="presentation" className={`fill-body`} /> */}
						<SingleStar score={4.9} />
					</span>
				</div>
			)}
		</div>
	);
};

YotpoStar.defaultProps = {
	productUrl: '',
	showScore: false,
	showTotal: true,
	className: '',
	smSingleStar: false,
};

export default YotpoStar;