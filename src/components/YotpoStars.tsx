import '~/config';
import React, { useState, useEffect, useRef } from 'react';
import ReviewStar from './ReviewStar';
import { currentTime, encryptParam } from '~/modules/utils';
import ReviewStarSingle from './ReviewStarSingle';

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
				rootMargin: '200px',
				threshold: 0.5
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
					<a href={`/products/${props?.productHandle}?write-a-review=true`} className="text-sm" aria-label="Write a review for this product">
						{!props.smSingleStarAllDevice && (
							<ReviewStar score={score} className={`${props.smSingleStar ? 'review-star__v1 hidden lg:flex' : 'flex'}`} />
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
					{props.showTotal && (
						<span className="ml-25 review-star__total">
							<a href={`/products/${props?.productHandle}?write-a-review=true`} className={`${props.smSingleStar || props.sustainability ? '' : ''} text-xs text-body hover:text-primary ${props.hideUnderline ? '' : 'underline'} yotpo-start__number`} aria-label={`Total reviews (${total?.toFixed(0)})`}>({total?.toFixed(0)})</a>
						</span>
					)}
				</>
			) : (
				<div className="h-2 w-full" aria-hidden="true" />
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