/* global tSettings tStrings */
import dynamic from 'next/dynamic';
import '@/config';
const tSettings = global.config.tSettings;
const tStrings = global.config.tStrings;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

// import {
// 	kebabCase,
// 	decodeHtml,
// 	updateItemInArray,
// 	objectToQueryString,
// 	currentTime,
// 	encryptParam,
// } from '@/modules/utils_v2';

const {
	kebabCase,
	decodeHtml,
	updateItemInArray,
	objectToQueryString,
	currentTime,
	encryptParam,
} = dynamic(() => import('@/modules/utils_v2'), {
    ssr: false,
});

import ReviewStar from '@/components/review-star';
// import YotpoReviewForm from '@/components/yotpo-review-form';
const YotpoReviewForm = dynamic(() => import('@/components/yotpo-review-form'), {
    ssr: false,
});
import YotpoQuestionForm from '@/components/yotpo-question-form';

import SvgHeart from '@/images/icons/heart.svg';
import SvgClose from '@/images/icons/close.svg';
import SvgFacebook from '@/images/icons/facebook-square.svg';
import SvgTwitter from '@/images/icons/twitter-square.svg';
import SvgLinkedin from '@/images/icons/linkedin-square.svg';
import SvgSearch from '@/images/icons/search.svg';
import SvgVerified from '@/images/icons/verified.svg';
import SvgThumbsUp from '@/images/icons/thumbs-up.svg';
import SvgThumbsDown from '@/images/icons/thumbs-down.svg';
import SvgChevronPrev from '@/images/icons/chevron-prev.svg';
import SvgChevronNext from '@/images/icons/chevron-next.svg';
import SvgTranslate from '@/images/icons/translate.svg';
import SvgCloseCircle from '@/images/icons/close-rounded.svg';

const { yotpoKey } = tSettings;
const localeParam = 'en';

const getCustomQuestions = (productId, callback) => {
	$.post('https://staticw2.yotpo.com/batch/',
		{
			methods: JSON.stringify([{
				method: 'main_widget',
				params: { pid: `${productId}` },
			}]),
			app_key: yotpoKey,
			is_mobile: false,
		}, function (data) {
			const res = JSON.parse(data);
			const widget = $(res[0].result);
			const questionEls = widget.find('.yotpo-custom-tag-field');
			const filterEls = widget.find('.filters-dropdown');
			const questions = [];
			questionEls.each((idx, el) => {
				const $el = $(el);
				const q = {
					question: $el.find('.yotpo-field-title').text().trim(),
					options: [],
					radio: $el.attr('role') === 'radiogroup',
				};
				$el.find('input').each((x, el2) => {
					if (!q.slug) { q.slug = el2.name; }
					q.options.push(el2.value);
				});
				q.filter = filterEls.filter(`[data-question-id=${q.slug.replace('--', '')}]`).data('default-button-display-value');
				questions.push(q);
			});
			callback(questions);
		});
};

const formatDate = (serverDate) => {
	const d = new Date(serverDate);
	const month = `${d.getMonth() + 1}`.padStart(2, '0');
	const day = `${d.getDate()}`.padStart(2, '0');
	const year = d.getFullYear();
	return [day, month, year].join('/');
};

const YotpoReviewWidget = (props) => {
	const apiUrl = 'https://supernova-reviews.herokuapp.com/api';

	const {
		productId,
		productName,
		productUrl,
		productImage,
		productDesc,
		canCreate,
		productSkus,
	} = props;

	const [init, setInit] = useState(false);
	const [score, setScore] = useState(0);
	const [total, setTotal] = useState(1);
	const [totalQa, setTotalQa] = useState(0);

	const [customQs, setCustomQs] = useState([]);
	const [customFilter, setCustomFilter] = useState([]);

	const [reviews, setReviews] = useState([]);
	const [revLoading, setRevLoading] = useState(false);
	const [topics, setTopics] = useState([]);
	const [showMoreTopics, setShowMoreTopics] = useState(false);
	const [selectedTopic, setSelectedTopic] = useState('');
	const [selectedFilter, setSelectedFilter] = useState({});
	const [filtering, setFiltering] = useState(false);
	const [revPage, setRevPage] = useState({});

	const [questions, setQuestions] = useState([]);
	const [qnaLoading, setQnaLoading] = useState(false);
	const [qnaPage, setQnaPage] = useState({});

	const [votes, setVotes] = useState({});

	const [thanksData, setThanksData] = useState({});
	const [revThanks, setRevThanks] = useState(false);
	const [qnaThanks, setQnaThanks] = useState(false);

	const [reviewModal, setReviewModal] = useState({});

	const processPagination = (pagination) => {
		const result = {
			...pagination,
			page: parseInt(pagination.page, 10),
			totalPage: Math.ceil(pagination.total / pagination.per_page),
			show: [],
		};

		let minNum = 1;
		let maxNum = 9;
		if (result.totalPage <= 9 || result.page <= 5) {
			maxNum = Math.min(9, result.totalPage);
		} else if (result.totalPage - result.page <= 4) {
			maxNum = result.totalPage;
			minNum = maxNum - 8;
		} else {
			maxNum = result.page + 4;
			minNum = result.page - 4;
		}
		for (let x = minNum; x <= maxNum; x += 1) {
			result.show.push(x);
		}
		return result;
	};

	const processReviews = (res) => {
		if (res.bottomline) {
			setScore(res.bottomline.average_score);
		}

		const pagination = processPagination(res.pagination);
		setTotal(pagination.total);
		setRevPage(pagination);

		const revs = [];
		res.reviews.forEach((r) => {
			const newR = { ...r, content: decodeHtml(r.content) };
			if (r.content.length > 350) {
				newR.shortContent = `${r.content.slice(0, 300)}...`;
				newR.hideContent = true;
			}
			revs.push(newR);
		});
		setReviews(revs);
		if (!init) setInit(true);
		setRevLoading(false);
	};

	const getReviews = (page = 1) => {
		setRevLoading(true);
		const signature = encryptParam(`{sku:'${productSkus}',time:${currentTime()}}`);
		$.get(`${apiUrl}/reviews.json?sku=${productSkus}`, { signature, page, lang: localeParam }, function (data) {
			processReviews(data.response);
		});
	};

	const getQuestions = (page = 1) => {
		setQnaLoading(true);
		const signature = encryptParam(`{sku:'${productSkus}',time:${currentTime()}}`);
		$.get(`${apiUrl}/questions.json?sku=${productSkus}`, { signature, page, lang: localeParam }, function (data) {
			setQuestions(data.response.questions);

			const pagination = processPagination({
				page: data.response.page,
				per_page: data.response.per_page,
				total: data.response.total_questions,
			});
			setTotalQa(pagination.total);
			setQnaPage(pagination);
			setQnaLoading(false);
		});
	};

	const getTopics = () => {
		const signature = encryptParam(`{sku:'${productSkus}',time:${currentTime()}}`);
		$.get(`${apiUrl}/product/custom_fields.json`, { signature, sku: productSkus, lang: localeParam }, function (data) {
			setTopics(data.response.topics.slice(0, 24));
			setCustomFilter(data.response.custom_fields);
		});
	};

	const doFilter = (page = 1) => {
		setRevLoading(true);
		const signature = encryptParam(`{sku:'${productSkus}',time:${currentTime()}}`);
		const dataJson = {
			signature,
			page,
			sku: productSkus,
			...selectedFilter,
			topic_names: selectedTopic !== '' ? [selectedTopic] : [],
			lang: localeParam,
		};

		const params = objectToQueryString(dataJson);

		$.ajax({
			crossDomain: true,
			contentType: 'application/json',
			url: `${apiUrl}/reviews.json?${params}`,
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'cache-control': 'no-cache',
			},
			processData: false,
			data: JSON.stringify({
				page,
				domain_key: productId,
				...selectedFilter,
				topic_names: [selectedTopic],
			}),
		}).done(function (data) {
			processReviews(data.response);
		});
	};

	const onFilterChange = () => {
		const form = document.getElementById('yotpoFilterForm');
		const filter = {};

		const text = form.querySelector('input[name="free_text_search"]').value;
		if (text) filter.free_text_search = text;

		const star = form.querySelector('select[name="scores"]').value;
		if (star) filter.scores = [star];

		const pictured = form.querySelector('select[name="pictured"]').value === 'true';
		if (pictured) filter.pictured = pictured;

		const crfs = [];
		customFilter.forEach((q) => {
			const selected = form.querySelector(`select[name='${q.slug}']`).value;
			if (selected !== '') {
				crfs.push({
					custom_field_id: q.id,
					answers: [selected],
				});
			}
		});
		if (crfs.length) filter.crfs = crfs;

		setSelectedFilter(filter);
	};

	const onRevPageChange = (page) => {
		if (Object.keys(selectedFilter).length > 0 || selectedTopic !== '') {
			setFiltering(true);
			doFilter(page);
		} else {
			setFiltering(false);
			getReviews(page);
		}
	};

	const onQnaPageChange = (page) => {
		getQuestions(page);
	};

	const onSubmitReview = (reviewData) => {
		$.post('https://api-cdn.yotpo.com/v1/widget/reviews', {
			...reviewData,
			appkey: yotpoKey,
			sku: productId,
			product_title: productName,
			product_description: productDesc,
			product_url: productUrl,
			product_image_url: productImage,
		}, function () {
			setThanksData(reviewData);
			setRevThanks(true);
		});
	};

	const onSubmitQuestion = (reviewData) => {
		$.post('https://api.yotpo.com/questions/send_confirmation_mail', {
			...reviewData,
			appkey: yotpoKey,
			sku: productId,
			product_title: productName,
			product_description: productDesc,
			product_url: productUrl,
			product_image_url: productImage,
		}, function () {
			setThanksData(reviewData);
			setQnaThanks(true);
		});
	};

	const onVote = (type, id, vote = 'up') => {
		const target = type === 'reviews' ? reviews.find((rev) => rev.id === id) : questions.find((question) => question.id === id);

		if (['reviews', 'answers'].indexOf(type) !== -1) {
			const key = `${type}-${id}`;
			const prevVote = votes[key];
			const pathVote = type === 'reviews' ? `/reviews/${id}/votes` : `/questions/${id}/answer/votes`;

			if (!prevVote) {
				if (vote === 'up' && target) {
					target.votes_up += 1;
				} else if (vote === 'down' && target && target.votes_down > 0) {
					target.votes_down -= 1;
				}

				$.post(`${apiUrl}${pathVote}?vote_type=${vote}`);
				setVotes({
					...votes,
					[key]: vote,
				});
			} else if (prevVote === vote) {
				if (vote === 'up' && target && target.votes_up > 0) {
					target.votes_up -= 1;
				} else if (vote === 'down' && target && target.votes_down > 0) {
					target.votes_down -= 1;
				}

				$.post(`${apiUrl}${pathVote}?vote_type=${vote}&reduce=true`);
				setVotes({
					...votes,
					[key]: null,
				});
			} else {
				if (prevVote === 'up' && target && target.votes_up > 0) {
					target.votes_up -= 1;
				} else if (prevVote === 'down' && target && target.votes_down > 0) {
					target.votes_down -= 1;
				}

				if (vote === 'up' && target) {
					target.votes_up += 1;
				} else if (vote === 'down' && target) {
					target.votes_down += 1;
				}

				$.post(`${apiUrl}${pathVote}?vote_type=${prevVote}&reduce=true`);
				$.post(`${apiUrl}${pathVote}?vote_type=${vote}`);
				setVotes({
					...votes,
					[key]: vote,
				});
			}
		}
	};

	const shareFacebookUrl = () => (`https://www.facebook.com/dialog/feed?app_id=226132034107547&display=popup&link=${encodeURIComponent(`https://reviews.me/facebook_post?image_url=${encodeURIComponent(productImage)}&product_url=${encodeURIComponent(productUrl)}&review=${encodeURIComponent(thanksData.review_content)}&social_title=${encodeURIComponent(thanksData.review_title)}`)}&redirect_uri=${encodeURIComponent(`http://my.yotpo.com/shares?app_key=${yotpoKey}&sku=${productId}&user_email=${encodeURIComponent(thanksData.email)}`)}`);

	const shareTwitterUrl = () => (`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://yotpo.com/go?reference_name=twitter_social_share&url=${encodeURIComponent(productUrl)}&app_key=${yotpoKey}&redirect=true`)}&text=${encodeURIComponent(thanksData.review_content)}&via=yotpo`);

	const shareLinkedinUrl = () => (`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://yotpo.com/go?reference_name=linkedin_social_share&url=${encodeURIComponent(productUrl)}&app_key=${yotpoKey}&redirect=true`)}&title=${encodeURIComponent(thanksData.review_title)}&source=Yotpo&summary=${encodeURIComponent(thanksData.review_content)}`);

	const openPopup = (url) => {
		window.open(url, '', 'status=no,toolbar=no,location=no,menubar=no,directories=no,scrollbars=yes,resizeable=yes,height=400,width=580,top=200,left=400');
	};

	const showMoreContent = (review) => {
		setReviews(
			updateItemInArray(
				reviews,
				((r) => r.id === review.id),
				() => ({
					...review,
					hideContent: !review.hideContent,
				}),
			),
		);
	};

	useEffect(() => {
		getTopics();
		getCustomQuestions(productId, (qs) => {
			setCustomQs(qs);
		});
	}, [productId]);

	useEffect(() => {
		getReviews();
		getQuestions();
	}, [productId]);

	useEffect(() => {
		onRevPageChange(1);
	}, [selectedFilter, selectedTopic]);

	const translateText = () => ['Revue traduite', 'Translate review', 'übersetzen'][Math.floor(Math.random() * 3)];

	return !init ? (
		<div className="d-flex justify-content-center mt-4">
			<div className="spinner-border" role="status" aria-hidden="true" />
		</div>
	) : (
		<>
			<div className="d-flex align-items-center justify-content-lg-center">
				<span className="yotpo-widget__score me-25 me-lg-0 ">{score ? score.toFixed(1) : 0}</span>
				<div className="d-lg-flex mx-lg-1">
					<ReviewStar score={score} className="svg--current-color tetx-primary" />
					<span className="ms-lg-1 d-block yotpo-widget__total mt-lg-0 ml-lg-1">{`${total} ${tStrings.yotpo.reviews}, ${totalQa} ${tStrings.yotpo.qnas}`}</span>
				</div>
			</div>

			{revThanks && (
				<div className="yotpo-widget__thanks bg-white border px-2 px-lg-4 py-5 mt-2 d-flex flex-column align-items-center text-center position-relative">
					<button type="button" className="close position-absolute font-size-base" onClick={() => setRevThanks(false)}>
						<SvgClose class="svg" />
					</button>
					<SvgHeart class="svg text-primary h1" />
					<p className="h3 text-primary">{tStrings.yotpo.thanksReviewTitle}</p>
					<p>{tStrings.yotpo.thanksReviewText}</p>
					<div className="d-flex">
						<button type="button" className="btn btn-link h2 p-0 mr-2" onClick={() => openPopup(shareFacebookUrl())}>
							<SvgFacebook class="svg" />
						</button>
						<button type="button" className="btn btn-link h2 p-0 mr-2" onClick={() => openPopup(shareTwitterUrl())}>
							<SvgTwitter class="svg" />
						</button>
						<button type="button" className="btn btn-link h2 p-0" onClick={() => openPopup(shareLinkedinUrl())}>
							<SvgLinkedin class="svg" />
						</button>
					</div>
				</div>
			)}

			{qnaThanks && (
				<div className="yotpo-widget__thanks bg-white border px-2 px-lg-4 py-5 mt-2 d-flex flex-column align-items-center text-center position-relative">
					<button type="button" className="close position-absolute font-size-base" onClick={() => setQnaThanks(false)}>
						<SvgClose class="svg" />
					</button>
					<SvgHeart class="svg text-primary h1" />
					<p className="h3 text-primary">{tStrings.yotpo.thanksQuestionTitle}</p>
					<p>{tStrings.yotpo.thanksQuestionText1}</p>
					<p className="mb-0">{tStrings.yotpo.thanksQuestionText2}</p>
				</div>
			)}

			{!revThanks && !qnaThanks && canCreate && (
				<div id="yotpoFormCollapse" className="mt-2">
					<div className="row justify-content-end">
						<div className="col-6 col-md-3 col-xl-2">
							<button
								type="button"
								className="btn btn-outline-primary btn-block text-nowrap d-flex justify-content-center text-capitalize"
								data-toggle="collapse"
								data-target="#yotpoReviewForm"
								aria-expanded="false"
								aria-controls="yotpoReviewForm"
							>
								{tStrings.yotpo.writeReview}
							</button>
						</div>
						<div className="col-6 col-md-3 col-xl-2">
							<button
								type="button"
								className="btn btn-outline-primary btn-block text-nowrap d-flex justify-content-center text-capitalize"
								data-toggle="collapse"
								data-target="#yotpoQuestionForm"
								aria-expanded="false"
								aria-controls="yotpoQuestionForm"
							>
								{tStrings.yotpo.askQuestion}
							</button>
						</div>
					</div>
					<YotpoReviewForm
						customQuestions={customQs}
						onSubmit={onSubmitReview}
					/>
					<YotpoQuestionForm
						onSubmit={onSubmitQuestion}
					/>
				</div>
			)}

			<ul className="product-info-tab nav nav-tabs mt-3" role="tablist">
				<li className="nav-item text-center flex-grow-0">
					<a className="nav-link border-0 text-body text-decoration-none pt-0 pb-1 px-2 active" id="yotpo-widget__reviews-tab" data-toggle="tab" href="#yotpo-widget__reviews" role="tab" aria-controls="yotpo-widget__reviews" aria-selected="true">{tStrings.yotpo.reviews}</a>
				</li>
				<li className="nav-item text-center flex-grow-0">
					<a className="nav-link border-0 text-body text-decoration-none pt-0 pb-1 px-2" id="yotpo-widget__questions-tab" data-toggle="tab" href="#yotpo-widget__questions" role="tab" aria-controls="yotpo-widget__questions" aria-selected="false">{tStrings.yotpo.questions}</a>
				</li>
			</ul>

			<div className="tab-content mt-2" id="yotpo-widget__tabContent">
				<div id="yotpo-widget__reviews" className="tab-pane fade show active" role="tabpanel" aria-labelledby="yotpo-widget__reviews-tab">
					<div id="yotpoFilterForm">
						<p className="fw-bold mb-2">{tStrings.yotpo.filterReviews}</p>
						<div className="input-group col-lg-6 px-0">
							<input
								type="text"
								name="free_text_search"
								className="form-control border-right-0"
								aria-label="Search reviews"
								placeholder={tStrings.yotpo.searchReviews}
								onKeyPress={(e) => {
									if (e.key === 'Enter') onFilterChange();
								}}
							/>
							<div className="input-group-append">
								<button type="button" className="input-group-text bg-white  h-100 rounded-0" aria-label="Submit search" onClick={() => onFilterChange()}>
									<SvgSearch className="svg" />
								</button>
							</div>
						</div>

						{topics.length > 0 && (
							<div className="input-group mt-2 col-lg-6 px-0">
								{topics.map((t, index) => {
									const key = kebabCase(t.name);
									const selected = selectedTopic === t.name;
									return (
										<button
											key={key}
											type="button"
											className={`btn ${selected ? 'btn-primary' : 'btn-primary-light'} font-size-sm mr-1 mb-1 text-capitalize ${!showMoreTopics && index >= 5 ? 'd-none' : ''}`}
											onClick={() => {
												if (selected) {
													setSelectedTopic('');
												} else {
													setSelectedTopic(t.name);
												}
											}}
										>
											{t.name}
										</button>
									);
								})}
								<button
									type="button"
									className={`btn btn-primary-light font-size-sm mb-1 ${showMoreTopics || topics.length < 5 ? 'd-none' : ''}`}
									onClick={() => setShowMoreTopics(true)}
								>
									...
								</button>
							</div>
						)}

						<div className="input-group row mt-1">
							<div className="col-6 col-lg-3">
								<select className="custom-select my-1" name="scores" onChange={() => { onFilterChange(); }}>
									<option value="">{tStrings.yotpo.rating}</option>
									<option value="5">5 Stars</option>
									<option value="4">4 Stars</option>
									<option value="3">3 Stars</option>
									<option value="2">2 Stars</option>
									<option value="1">1 Star</option>
								</select>
							</div>
							<div className="col-6 col-lg-3">
								<select className="custom-select my-1" name="pictured" onChange={() => { onFilterChange(); }}>
									<option value="">{tStrings.yotpo.imageVideo}</option>
									<option value="true">{tStrings.yotpo.withImageVideo}</option>
								</select>
							</div>
							{customFilter.map((q) => q.filter !== '' && (
								<div key={q.slug} className="col-6 col-lg-3">
									<select className="custom-select my-1" name={q.slug} onChange={() => { onFilterChange(); }}>
										<option value="">{q.filter}</option>
										{q.options.map((o) => (
											<option key={o} value={o}>{o.replace('/', ' / ')}</option>
										))}
									</select>
								</div>
							))}
						</div>
					</div>

					<hr />

					{revLoading && (
						<div className="d-flex justify-content-center mt-4">
							<div className="spinner-border" role="status" aria-hidden="true" />
						</div>
					)}

					{!revLoading && reviews.length === 0 && !filtering && (
						<div className="">
							<button
								type="button"
								className="btn btn-primary d-block mx-auto my-4"
								data-toggle="collapse"
								data-target="#yotpoReviewForm"
								aria-expanded="false"
								aria-controls="yotpoReviewForm"
								onClick={() => {
									if (!canCreate) window.location.href = `${productUrl}#write-a-review`;
								}}
							>
								{tStrings.yotpo.beFirstReview}
							</button>
						</div>
					)}

					{!revLoading && reviews.length === 0 && filtering && (
						<p className="text-center">
							{tStrings.yotpo.noReviewFilter}
						</p>
					)}

					{!revLoading && reviews.length > 0 && (
						<>
							<p className="fw-bold mb-0">{`${total} Review${total !== 1 ? 's' : ''}`}</p>
							<div className="" role="list">
								{reviews.map((review) => (
									<div key={review.id} className="border-bottom py-3 row">
										<div className="col-lg-3">
											<h4 className="mb-0 d-flex align-items-center">
												{review.user_name}
												{review.verified_buyer && <SvgVerified className="svg font-size-xs ms-25 text-secondary" />}
											</h4>
											{review.verified_buyer && <p className="font-size-sm mb-0">{tStrings.yotpo.verifiedBuyer}</p>}
											<p className="font-size-sm mb-1">
												{formatDate(review.created_at)}
											</p>
											{review.custom_fields !== null && Object.entries(review.custom_fields).map((field) => (
												<p key={kebabCase(field[0])} className="font-size-sm mb-0">
													<strong>
														{field[0]}
														:
													</strong>
													<span className="ml-25">
														{field[1] ? field[1].join(', ') : ''}
													</span>
												</p>
											))}
											<span className="font-size-sm bg-gray-400 d-inline-flex font-size-sm my-2 py-1 px-2">
												<SvgTranslate className="svg me-1" />
												{ translateText() }
											</span>
										</div>
										<div className="col-lg-9">
											<div className="d-flex text-secondary mt-1 mt-lg-0">
												<ReviewStar score={review.score} />
											</div>
											<h4 className="mb-1 mt-1">
												{decodeHtml(review.title)}
											</h4>
											<p className="mb-1">
												{review.hideContent ? review.shortContent : review.content}
												{review.shortContent && review.shortContent.length > 0 && (
													<button
														type="button"
														className="btn btn-link p-0 ms-25"
														onClick={() => { showMoreContent(review); }}
													>
														{review.hideContent ? tStrings.yotpo.readMore : tStrings.yotpo.readLess}
													</button>
												)}
											</p>
											{review.images_data && review.images_data.length > 0 && (
												<div className="d-flex flex-nowrap w-auto overflow-auto pr-g">
													{review.images_data.map((image, index) => (
														<button key={image.id} type="button" className={`d-inline-block btn-unstyled ${index === 0 ? 'ml-1 ml-lg-g mr-1' : 'mx-1'} mb-g text-start`} data-toggle="modal" data-target="#yotpoImageModal" onClick={() => { setReviewModal(review); }}>
															<img src={image.thumb_url.replace('https:', '')} alt={`${review.user_name} ${index}`} />
														</button>
													))}
												</div>
											)}
											<div className="d-flex justify-content-end align-items-center mt-3">
												<p className="font-size-sm mr-1 mb-0">{tStrings.yotpo.reviewHelpful}</p>
												<button type="button" className={`btn-unstyled font-size-sm d-flex align-items-center mx-1 text-body ${votes[`reviews-${review.id}`] === 'up' && 'text-primary'}`} onClick={() => { onVote('reviews', review.id, 'up'); }}>
													<SvgThumbsUp className="svg mr-25" />
													{review.votes_up + (votes[`reviews-${review.id}`] === 'up' ? 1 : 0)}
												</button>
												<button type="button" className={`btn-unstyled font-size-sm d-flex align-items-center mx-1 text-body ${votes[`reviews-${review.id}`] === 'down' && 'text-primary'}`} onClick={() => { onVote('reviews', review.id, 'down'); }}>
													<SvgThumbsDown className="svg mr-25" />
													{review.votes_down + (votes[`reviews-${review.id}`] === 'down' ? 1 : 0)}
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						</>
					)}

					{!revLoading && revPage.totalPage > 1 && (
						<ul className="list-unstyled d-flex justify-content-center align-items-center mt-2">
							<li>
								<button type="button" className={`btn btn-link px-1 ${revPage.page === 1 && 'invisible'}`} aria-label="Previous review page" disabled={revPage.page === 1} onClick={() => onRevPageChange(revPage.page - 1)}><SvgChevronPrev className="svg text-primary" /></button>
							</li>
							{revPage.show.map((v) => (
								<li key={v}>
									<button type="button" className={`btn btn-link px-1 ${v === revPage.page ? 'fw-bold' : ''}`} onClick={() => onRevPageChange(v)}>{v}</button>
								</li>
							))}
							<li>
								<button type="button" className={`btn btn-link px-1 ${revPage.page === revPage.totalPage && 'invisible'}`} aria-label="Next review page" disabled={revPage.page === revPage.totalPage} onClick={() => onRevPageChange(revPage.page + 1)}><SvgChevronNext className="svg text-primary" /></button>
							</li>
						</ul>
					)}
				</div>

				<div id="yotpo-widget__questions" className="tab-pane fade" role="tabpanel" aria-labelledby="yotpo-widget__questions-tab">
					{qnaLoading && (
						<div className="d-flex justify-content-center mt-4">
							<div className="spinner-border" role="status" aria-hidden="true" />
						</div>
					)}

					{!qnaLoading && questions.length === 0 && (
						<div className="">
							<button
								type="button"
								className="btn btn-primary d-block mx-auto my-4"
								data-toggle="collapse"
								data-target="#yotpoQuestionForm"
								aria-expanded="false"
								aria-controls="yotpoQuestionForm"
								onClick={() => {
									if (!canCreate) window.location.href = `${productUrl}#write-a-review`;
								}}
							>
								{tStrings.yotpo.beFirstQuestion}
							</button>
						</div>
					)}

					{!qnaLoading && questions.length > 0 && questions.map((question) => (
						<div key={question.id} className="pt-3 pb-4 border-bottom">
							<h4 className="mb-0">{question.user_name}</h4>
							<p className="font-size-sm mb-0">{tStrings.yotpo.verifiedReviewer}</p>
							<p className="font-size-sm ml-auto">
								{formatDate(question.created_at)}
							</p>
							<p className="fw-bold">{`Q: ${decodeHtml(question.content)}`}</p>
							<p className="font-size-sm">
								{tStrings.yotpo.answer}
								{' ('}
								{question.sorted_public_answers.length}
								)
							</p>
							{question.sorted_public_answers.map((answer) => (
								<div key={answer.id} className="ml-4 mt-2 border-left pl-3">
									<h4 className="mb-0">{tStrings.yotpo.storeOwner}</h4>
									<p className="font-size-sm">{formatDate(answer.created_at)}</p>
									<p className="mt-2">{`A: ${decodeHtml(answer.content)}`}</p>
									<div className="d-flex justify-content-end align-items-center mt-3">
										<p className="font-size-sm mr-1 mb-0">{tStrings.yotpo.answerHelpful}</p>
										<button type="button" className={`btn-unstyled font-size-sm d-flex align-items-center mx-1 ${votes[`answers-${answer.id}`] === 'up' && 'text-primary'}`} onClick={() => { onVote('answers', answer.id, 'up'); }}>
											<SvgThumbsUp className="svg mr-25" />
											{answer.votes_up + (votes[`answers-${answer.id}`] === 'up' ? 1 : 0)}
										</button>
										<button type="button" className={`btn-unstyled font-size-sm d-flex align-items-center mx-1 ${votes[`answers-${answer.id}`] === 'down' && 'text-primary'}`} onClick={() => { onVote('answers', answer.id, 'down'); }}>
											<SvgThumbsDown className="svg mr-25" />
											{answer.votes_down + (votes[`answers-${answer.id}`] === 'down' ? 1 : 0)}
										</button>
									</div>
								</div>
							))}
						</div>
					))}

					{!qnaLoading && qnaPage.totalPage > 1 && (
						<ul className="list-unstyled d-flex justify-content-center align-items-center mt-2">
							<li>
								<button type="button" className={`btn btn-link px-1 ${qnaPage.page === 1 && 'invisible'}`} aria-label="Previous review page" disabled={qnaPage.page === 1} onClick={() => onQnaPageChange(qnaPage.page - 1)}><SvgChevronPrev className="svg text-primary" /></button>
							</li>
							{qnaPage.show.map((v) => (
								<li key={v}>
									<button type="button" className={`btn btn-link px-1 ${v === qnaPage.page ? 'fw-bold' : ''}`} onClick={() => onQnaPageChange(v)}>{v}</button>
								</li>
							))}
							<li>
								<button type="button" className={`btn btn-link px-1 ${qnaPage.page === qnaPage.totalPage && 'invisible'}`} aria-label="Next review page" disabled={qnaPage.page === qnaPage.totalPage} onClick={() => onQnaPageChange(qnaPage.page + 1)}><SvgChevronNext className="svg text-primary" /></button>
							</li>
						</ul>
					)}
				</div>
			</div>

			<div className="modal fade yotpo-widget__modal" id="yotpoImageModal" tabIndex="-1" role="dialog" aria-hidden="true">
				{!!reviewModal.id && (
					<div className="modal-dialog modal-lg modal-dialog-centered" role="document">
						<div className="modal-content mx-3 mx-lg-0">
							<div className="row align-items-center">
								<div className="col-lg-6 pr-lg-0">
									{reviewModal.images_data.length === 1 ? (
										<img src={reviewModal.images_data[0].image_url.replace('https:', '')} alt="Slide 1" className="d-block w-100" />
									) : (
										<div className="position-relative">
											<div id="carouselYotpoImage" className="carousel slide" data-ride="carousel">
												<div className="carousel-inner">
													{reviewModal.images_data.map((image, i) => (
														<div key={image.id} className={`carousel-item ${(i === 0) ? 'active' : ''}`}>
															<img src={image.image_url.replace('https:', '')} alt={`Slide ${i + 1}`} className="d-block w-100" />
														</div>
													))}
												</div>
											</div>
											<a className="carousel-control-prev text-primary carousel-control--background" href="#carouselYotpoImage" role="button" data-slide="prev">
												<span className="carousel-control-prev-icon d-flex justify-content-center align-items-center">
													<SvgChevronPrev className="svg" />
												</span>
												<span className="sr-only">Previous</span>
											</a>
											<a className="carousel-control-next text-primary carousel-control--background" href="#carouselYotpoImage" role="button" data-slide="next">
												<span className="carousel-control-next-icon d-flex justify-content-center align-items-center">
													<SvgChevronNext className="svg" />
												</span>
												<span className="sr-only">Next</span>
											</a>
										</div>
									)}
									<button type="button" className="close position-absolute d-flex d-lg-none mr-25" data-dismiss="modal" aria-label="Close">
										<SvgCloseCircle className="svg" />
									</button>
								</div>
								<div className="col-lg-6 pl-lg-0 ">
									<div className="px-3 py-3">
										<div className="d-flex">
											<h4 className="mb-0 font-size-sm">{reviewModal.user_name}</h4>
											{reviewModal.verified_buyer && (<span className="ml-1 font-size-sm">{tStrings.yotpo.verifiedBuyer}</span>)}
											<span className="ml-auto font-size-sm">{formatDate(reviewModal.created_at)}</span>
										</div>
										<div className="d-flex text-secondary" />
										<h4 className="mb-0 my-2 yotpo__modal-title">{decodeHtml(reviewModal.title)}</h4>
										<p className="font-size-sm yotpo__modal-content">{reviewModal.content}</p>
										<div className="d-flex justify-content-end align-items-center mt-3">
											<button type="button" className={`btn-unstyled font-size-sm d-flex align-items-center mx-1 ${votes[`reviews-${reviewModal.id}`] === 'up' && 'text-primary'}`} onClick={() => { onVote('reviews', reviewModal.id, 'up'); }}>
												<SvgThumbsUp className="svg mr-25" />
												{reviewModal.votes_up + (votes[`reviews-${reviewModal.id}`] === 'up' ? 1 : 0)}
											</button>
											<button type="button" className={`btn-unstyled font-size-sm d-flex align-items-center mx-1 ${votes[`reviews-${reviewModal.id}`] === 'down' && 'text-primary'}`} onClick={() => { onVote('reviews', reviewModal.id, 'down'); }}>
												<SvgThumbsDown className="svg mr-25" />
												{reviewModal.votes_down + (votes[`reviews-${reviewModal.id}`] === 'down' ? 1 : 0)}
											</button>
										</div>
									</div>
								</div>
							</div>
							<button type="button" className="close position-absolute font-size-base d-none d-lg-flex" data-dismiss="modal" aria-label="Close">
								<SvgClose className="svg" />
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

YotpoReviewWidget.propTypes = {
	productId: PropTypes.number.isRequired,
	productName: PropTypes.string.isRequired,
	productUrl: PropTypes.string.isRequired,
	productImage: PropTypes.string.isRequired,
	productDesc: PropTypes.string.isRequired,
	productSkus: PropTypes.string.isRequired,
	canCreate: PropTypes.bool.isRequired,
};

export default YotpoReviewWidget;
