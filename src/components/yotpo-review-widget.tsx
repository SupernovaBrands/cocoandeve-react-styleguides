// @ts-nocheck
import '~/config';
import Modal from "~/components/Modal";

const tSettings = global.config.tSettings;
const tStrings = global.config.tStrings;

import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';

import {
	kebabCase,
	decodeHtml,
	updateItemInArray,
	objectToQueryString,
	currentTime,
	encryptParam,
} from '~/modules/utils_v2';

import ReviewStar from '~/components/review-star';
import YotpoReviewForm from '~/components/yotpo-review-form';
import Button from './Button';
import YotpoQuestionForm from '~/components/yotpo-question-form';
import SvgHeart from '~/images/icons/heart.svg';
import SvgClose from '~/images/icons/close.svg';
import SvgFacebook from '~/images/icons/facebook-square.svg';
import SvgTwitter from '~/images/icons/twitter-square.svg';
import SvgLinkedin from '~/images/icons/linkedin-square.svg';
import SvgSearch from '~/images/icons/search.svg';
import SvgVerified from '~/images/icons/verified.svg';
import SvgThumbsUp from '~/images/icons/thumbs-up.svg';
import SvgThumbsDown from '~/images/icons/thumbs-down.svg';
import SvgChevronPrev from '~/images/icons/chevron-prev.svg';
import SvgChevronNext from '~/images/icons/chevron-next.svg';
import SvgCloseCircle from '~/images/icons/close-rounded.svg';
import SvgPlayIcon from '~/images/icons/play-icon.svg';

import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import Autoplay from 'embla-carousel-autoplay';
import AutoHeight from 'embla-carousel-auto-height';
import Script from 'next/script';
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
	controlAutoplay,
} from '~/components/carousel/EmblaCarouselArrowButtons';
import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';
import trialParticipants from '~/utils/trialParticipants';


// let { yotpoKey } = tSettings;
const localeParam = 'en';

const getCustomQuestions = (productId, callback, yotpoKey) => {
	if (!yotpoKey) {
		return false;
	}
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

let formattedDate = 'dd/mm/yy';

const formatDate = (serverDate, format = 'dd/mm/yy') => {
	const d = new Date(serverDate);
	const month = `${d.getMonth() + 1}`.padStart(2, '0');
	const day = `${d.getDate()}`.padStart(2, '0');
	const year = d.getFullYear();
	if (format === 'dd/mm/yy') {
		return [day, month, year].join('/');
	}
	if (format === 'yyyy/mm/dd') {
		return [year, month, day].join('/');
	}
	return [month, day, year].join('/');
};

const YOTPO_CONFIG_UPLOAD = {
	ACL: 'public-read',
	X_AMZ_ALGORITHM: 'AWS4-HMAC-SHA256',
	X_AMZ_META_UUID: '14365123651274',
};


const YotpoReviewWidget = (props:any) => {
	const apiUrl = 'https://reviews-api.cocoandeve.com/api';
	const yotpoKey = props.yotpoKey;

	const reviewBox = useRef(null);

	const {
		productId,
		productName,
		productUrl,
		productImage,
		productDesc,
		canCreate,
		productSkus,
		showButtons
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
	const [videoUploading, setVideoUploading] = useState(null);
	const [cssHeight, setCssHeight] = useState(true);
	const [initialReviewImage, setInitialReviewImage] = useState(0);

	const yotpoThanksRef = useRef(null);

	const handleClickImage = (review:any, index:number) => {
		setReviewModal(review);
		setIsOpen(true);
		setInitialReviewImage(index);
	}

	const processPagination = (pagination:any) => {
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
		$.get(`${apiUrl}/reviews.json?sku=${productSkus}`, { signature, page, per: 5, lang: localeParam }, function (data) {
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
		if (selectedFilter?.free_text_search?.includes('%')) selectedFilter.free_text_search = encodeURIComponent(selectedFilter.free_text_search);
		$.ajax({
			crossDomain: true,
			contentType: 'application/json',
			url: `${apiUrl}/reviews.json?${params}&per=5`,
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

	const moveToTop = () => {
		if (reviewBox.current) {
			const scrollDiv = reviewBox.current.offsetTop;
			globalThis.window.scrollTo({ top: scrollDiv, behavior: 'smooth'});
		}
	}

	const onRevPageChange = (page) => {
		if (Object.keys(selectedFilter).length > 0 || selectedTopic !== '') {
			setFiltering(true);
			doFilter(page);
		} else {
			setFiltering(false);
			getReviews(page);
		}

		moveToTop();
	};

	const onQnaPageChange = (page) => {
		getQuestions(page);
		moveToTop();
	};

	const imageToBinary = (dataUrl, contentType) => {
		const n = atob(dataUrl.split(',')[1]);
		const r = new ArrayBuffer(n.length);
		const o = new Uint8Array(r);

		for (let i = 0; i < n.length; i += 1) o[i] = n.charCodeAt(i);
		return new Blob([r], { type: contentType });
	};

	const getContentType = (dataUrl) => {
		try {
			return dataUrl.split(',')[0].split(';')[0].replace('data:', '');
		} catch (e) {
			return 'image/jpeg';
		}
	};

	const getUploadImageUrlEncodedParams = (e, t, n) => {
		const r = new FormData();
		const contentType = getContentType(n.dataUrl);
		const fileBinnary = imageToBinary(n.dataUrl, contentType);

		r.append('key', e);
		r.append('acl', YOTPO_CONFIG_UPLOAD.ACL);
		r.append('Content-Type', contentType);
		r.append('policy', t.encoded_policy);
		r.append('x-amz-credential', t.credential);
		r.append('x-amz-algorithm', YOTPO_CONFIG_UPLOAD.X_AMZ_ALGORITHM);
		r.append('x-amz-date', t.date);
		r.append('x-amz-meta-uuid', YOTPO_CONFIG_UPLOAD.X_AMZ_META_UUID);
		r.append('x-amz-signature', t.signature);
		r.append('file', fileBinnary);
		return r;
	};

	const uploadToYotpoS3 = (reviewData, reviewResponse) => {
		if (reviewData.uploaded_images) {
			$.post('https://api.yotpo.com/s3_signature', { policy_name: 'ReviewImages', app_key: yotpoKey }).then((resp) => {
				const { response } = resp;
				const yotpoS3 = `https://${response.bucket}.s3.amazonaws.com/`;

				const startUpload = (i) => {
					if (reviewData.uploaded_images[i]) {
						const dataUrl = reviewData.uploaded_images[i];
						const type = getContentType(dataUrl);
						const fileName = `${response.date}_${reviewResponse.creation_request_id}-${i + 1}.${type.replace('image/', '')}`;
						const fullName = `${response.path}${fileName}`;
						const formData = getUploadImageUrlEncodedParams(fullName, response,
							{ dataUrl: reviewData.uploaded_images[i].dataUrl });
						const xhr = new XMLHttpRequest();

						xhr.open('POST', yotpoS3, true);
						xhr.onreadystatechange = (res) => {
							if (res.target.readyState === 4) {
								const imageUrl = `${yotpoS3}${fullName}`;
								const processImageParams = {
									image_upload_token: reviewResponse.image_upload_token,
									image_urls: [imageUrl],
								};
								$.ajax({
									url: 'https://api-cdn.yotpo.com/images/process', method: 'POST', data: processImageParams, dataType: 'json',
								}).done(() => startUpload(i + 1));
							}
						};
						xhr.send(formData);
					}
				};

				startUpload(0);
			}).catch((e) => console.log(`Error: ${e}`));
		}
	};

	const Ht = `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://headless-staging.cocoandeve.com'}/vendors/video-upload.js`;
	const loadScript = async () => {
		if (document.getElementById('kalturaScript')) { return Promise.resolve(); }
		const e = document.createElement('script');
		e.setAttribute('src', Ht);
		e.setAttribute('async', 'true');
		e.setAttribute('type', 'text/javascript');
		e.setAttribute('id', 'kalturaScript');
		document.head.appendChild(e);

		return new Promise(((t) => {
			e.onload = function () {
				t();
			};
		}
		));
	};

	const uploadVideoToKaltura = async (e, t, n, r) => {
		await loadScript().then((async () => {
			const o = {
				ks: t.ks,
				partner_id: t.partnerId,
				metadata_profile_id: t.metadataProfileId,
			};

			const i = new window.YotpoVideoUploader.KalturaUploader(e, o, r, 'review', '');
			i.on('fileAdded', (() => {}));
			i.on('error', ((er) => {
				setTimeout((() => {
					n.error(er);
				}
				), 200);
			}
			));

			i.on('complete', ((ce) => n.success && n.success(ce.submitCallback)));

			i.on('progress', ((p) => n.progress && setTimeout((() => {
				n.progress(p.percentage);
			}
			), 200)));

			await i.upload();
			Promise.resolve();
		}
		));
	};

	const getVideoSettings = () => new Promise((resolve, reject) => {
		const waitForWidgetData = () => {
			if (typeof window.yotpoWidgetsContainer === 'object') {
				const wConfig = window.yotpoWidgetsContainer;
				const data = wConfig.guids ? wConfig.guids[yotpoKey] : null;
				if (data) {
					const widgets = data.config.widgets;
					const key = Object.keys(widgets)[0];
					const content = widgets[key]?.staticContent;
					if (content) {
						resolve({
							ks: content.feature_reviews_video_support_settings_ks,
							metadataProfileId: content.feature_reviews_video_support_settings_metadata_profile_id,
							partnerId: content.feature_reviews_video_support_settings_partner_id,
						})
					} else {
						reject({});
					}
				} else {
					reject({});
				}
			} else {
				setTimeout(waitForWidgetData, 500);
			}
		}
		waitForWidgetData();
	});

	const uploadVideos = async (videos:[], res:any) => {
		const videoSettings = await getVideoSettings();
		const startUpload = (vids:[], resp:any, index:number) => {
			if (vids[index]) {
				const video = vids[index];
				setVideoUploading(`Uploading file ${vids[index].file.name}`);
				uploadVideoToKaltura(video.file, videoSettings, {
					success: (n) => {
					// eslint-disable-next-line no-void
						n('', void 0, void 0, 'domainKey', resp.image_upload_token, (function () {}));
						setVideoUploading(null);
						if (vids[index + 1]) {
							startUpload(vids, resp, index + 1);
						}
					},
					progress: (p) => {
						if (p === '100%') {
							setVideoUploading(null);
						} else {
							setVideoUploading(`Uploading ${vids[index].file.name} in progress ${p}`);
						}
					},
					error: (e) => {
						console.log('error on upload video', e);
						setVideoUploading('Upload failed something wrong happens, please try again later');
					},
				}, yotpoKey);
			}
		};
		startUpload(videos, res, 0);
	};

	const [loadWidgetScript, setLoadWidgetScript] = useState(false);

	const onSubmitReview = (reviewData:[]) => {
		const { uploaded_videos: uploadedVideos } = reviewData;
		if (reviewData.uploaded_videos) {
			// eslint-disable-next-line no-param-reassign
			delete reviewData.uploaded_videos;
		}

		$.post('https://api-cdn.yotpo.com/v1/widget/reviews', {
			...reviewData,
			appkey: yotpoKey,
			sku: productId,
			product_title: productName,
			product_description: productDesc,
			product_url: productUrl,
			product_image_url: productImage,
		}, function (response) {
			if (reviewData.uploaded_images) {
				uploadToYotpoS3(reviewData, response);
			}

			if (uploadedVideos) {
				setLoadWidgetScript(true);
				uploadVideos(uploadedVideos, response);
			}

			setThanksData(reviewData);
			setRevThanks(true);
		});
	};

	useEffect(() => {
		if (revThanks && yotpoThanksRef.current) {
			const scrollDiv = yotpoThanksRef.current.offsetTop;
			globalThis.window.scrollTo({ top: scrollDiv - 100, behavior: 'smooth'});
		}
	}, [revThanks]);

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
			const signature = encryptParam(`{vote_id:'${id}',time:${currentTime()}}`);
			const key = `${type}-${id}`;
			const prevVote = votes[key];
			const pathVote = type === 'reviews' ? `/reviews/${id}/votes` : `/questions/${id}/answer/votes`;

			if (!prevVote) {
				if (vote === 'up' && target) {
					target.votes_up += 1;
				} else if (vote === 'down' && target && target.votes_down > 0) {
					target.votes_down -= 1;
				}

				$.post(`${apiUrl}${pathVote}?vote_type=${vote}&signature=${signature}`);
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

				$.post(`${apiUrl}${pathVote}?vote_type=${vote}&reduce=true&signature=${signature}`);
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

				$.post(`${apiUrl}${pathVote}?vote_type=${prevVote}&reduce=true&signature=${signature}`);
				$.post(`${apiUrl}${pathVote}?vote_type=${vote}&signature=${signature}`);
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
		}, yotpoKey);
	}, [productId]);

	useEffect(() => {
		getReviews();
		getQuestions();
	}, [productId]);

	useEffect(() => {
		onRevPageChange(1);
	}, [selectedFilter, selectedTopic]);

	const translateText = () => ['Revue traduite', 'Translate review', 'übersetzen'][Math.floor(Math.random() * 3)];

	const [activeForm, setActiveForm] = useState(null);
	const [activeTab, setActiveTab] = useState('review');

	const handleForm = (e: string) => {
		if (e === 'review' && activeForm === 'review') {
			setActiveForm(null);
		} else if (e === 'question' && activeForm === 'question') {
			setActiveForm(null);
		} else {
			setActiveForm(e);
		}
	}

	const [isOpen, setIsOpen] = useState(false);
	const handlOpenModal = () => {
		setIsOpen(false);
	}

	const options: EmblaOptionsType = {
		loop: true,
	};

	const [emblaRef7, emblaApi7] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: false, delay: 3000 }),
		AutoHeight(),
	]);

	useEffect(() => {
		if (emblaApi7) {
			emblaApi7.scrollTo(initialReviewImage);
		}
	}, [emblaApi7]);

	const {
		prevBtnDisabled: prevDisabled7,
		nextBtnDisabled: nextDisabled7,
		onPrevButtonClick: arrowClickPrev7,
		onNextButtonClick: arrowClickNext7
	} = usePrevNextButtons(emblaApi7);
	const autoPlayClick7 = controlAutoplay(emblaApi7);


	const isTrialParticipant = (review:any) => trialParticipants.find((t) => t.user === review.user_name
	&& t.title === review.title && t.content === review.content);

	const getMediaData = (review:any) => review.images_data.concat(review.videos_data);

	const playVideo = (ev:any, el:any) => {
		ev.target.classList.add('hidden');
		const videoEl = document.getElementById(el);
		videoEl.setAttribute('controls', 'true');
		videoEl.play();
	};

	return !init ? (
		<div className="flex justify-center mt-4 w-full">
			<div className="spinner-border" role="status" aria-hidden="true" />
		</div>
	) : (
		<>
			{ loadWidgetScript && <Script src={`https://cdn-widgetsrepository.yotpo.com/v1/loader/${yotpoKey}`}/> }
			<div className="flex items-center lg:justify-center leading-[1.25]">
				<span className="yotpo-widget__score text-[2.8125em] mr-25">{score ? score.toFixed(1) : 0}</span>
				<div className="lg:flex lg:ml-1">
					<ReviewStar score={score} />
					<span className="lg:ml-1 block yotpo-widget__total mt-25 lg:mt-0 lg:ml-1">{`${total} ${tStrings.yotpo.reviews}, ${totalQa} ${tStrings.yotpo.qnas}`}</span>
				</div>
			</div>

			{revThanks && (
				<div id="yotpo-thanks" ref={yotpoThanksRef} className="yotpo-widget__thanks bg-white border px-2 lg:px-4 py-5 mt-2 flex flex-col items-center text-center relative">
					<button type="button" className="close absolute text-base" onClick={() => setRevThanks(false)}>
						<SvgClose className="svg" />
					</button>
					<SvgHeart className="svg text-primary h1" />
					<p className="h3 text-primary">{tStrings.yotpo.thanksReviewTitle}</p>
					<p>{tStrings.yotpo.thanksReviewText}</p>
					<div className="flex">
						<button type="button" className="btn border-0 text-primary h2 p-0 mr-2" onClick={() => openPopup(shareFacebookUrl())}>
							<SvgFacebook className="svg" />
						</button>
						<button type="button" className="btn border-0 text-primary h2 p-0 mr-2" onClick={() => openPopup(shareTwitterUrl())}>
							<SvgTwitter className="svg" />
						</button>
						<button type="button" className="btn border-0 text-primary h2 p-0" onClick={() => openPopup(shareLinkedinUrl())}>
							<SvgLinkedin className="svg" />
						</button>
					</div>
					{ videoUploading && (<small className="text-primary mt-1">{videoUploading}</small>)}
				</div>
			)}

			{qnaThanks && (
				<div className="yotpo-widget__thanks bg-white border px-2 lg:px-4 py-5 mt-2 flex flex-col items-center text-center relative">
					<button type="button" className="close absolute text-base" onClick={() => setQnaThanks(false)}>
						<SvgClose className="svg" />
					</button>
					<SvgHeart className="svg text-primary h1" />
					<p className="h3 text-primary">{tStrings.yotpo.thanksQuestionTitle}</p>
					<p>{tStrings.yotpo.thanksQuestionText1}</p>
					<p className="mb-0">{tStrings.yotpo.thanksQuestionText2}</p>
				</div>
			)}

			{!revThanks && !qnaThanks && canCreate && (
				<div id="yotpoFormCollapse" className="mt-2">
					<div className={`flex flex-wrap justify-end -mx-hg md:-mx-g ${showButtons === false ? 'hidden': ''}`}>
						<div className="w-1/2 md:w-2/12 px-hg md:px-g md:max-w-[200px]">
							<Button onClick={() => handleForm('review')}
								type="button"
								lg={false}
								buttonClass="btn-outline-primary w-full px-0 bg-transparent">
									Write A Review
							</Button>
						</div>
						<div className="w-1/2 md:w-2/12 px-hg md:px-g md:max-w-[200px]">
							<Button onClick={() => handleForm('question')}
								type="button"
								lg={false}
								buttonClass="btn-outline-primary w-full px-0 bg-transparent">
									Ask A Question
							</Button>
						</div>
					</div>
					<YotpoReviewForm
						activeForm={activeForm}
						customQuestions={customQs}
						onSubmit={onSubmitReview}
					/>
					<YotpoQuestionForm
						activeForm={activeForm}
						onSubmit={onSubmitQuestion}
					/>
				</div>
			)}

			<ul className="flex w-full border-[#f5dadf] border-b mt-3" role="tablist" ref={reviewBox}>
				<li className={`nav-item text-center grow-0 pb-1 -mb-[1px] ${activeTab === 'review' ? 'border-b-[2px] border-primary' : ''}`}>
					<a onClick={() => setActiveTab('review')} className={`${activeTab === 'review' ? 'active font-bold' : ''} nav-link border-0 text-body !text-dark text-decoration-none pt-0 pb-1 px-2`} id="yotpo-widget__reviews-tab" role="tab" aria-controls="yotpo-widget__reviews" aria-selected="true">{tStrings.yotpo.reviews}</a>
				</li>
				<li className={`nav-item text-center grow-0 pb-1 -mb-[1px] ${activeTab === 'question' ? 'border-b-[2px] border-primary' : ''}`}>
					<a onClick={() => setActiveTab('question')} className={`${activeTab === 'question' ? 'active font-bold' : ''} nav-link border-0 text-body !text-dark text-decoration-none pt-0 pb-1 px-2`} id="yotpo-widget__questions-tab" aria-controls="yotpo-widget__questions" aria-selected="false">{tStrings.yotpo.questions}</a>
				</li>
			</ul>

			<div className="tab-content mt-2" id="yotpo-widget__tabContent">
				<div id="yotpo-widget__reviews" className={`[transition:opacity_0.15s_linear] ${activeTab === 'review' ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="yotpo-widget__reviews-tab">
					<div id="yotpoFilterForm">
						<p className="font-bold mb-2">{tStrings.yotpo.filterReviews}</p>
						<div className="input-group lg:w-1/2 px-0 flex flex-nowrap">
							<input
								type="text"
								name="free_text_search"
								className="block appearance-none w-full py-[15px] px-[17px] text-base leading-[1.25] bg-gray-400 text-gray-800 border-0 rounded-l-h rounded-r-none outline-none mb-0"
								aria-label="Search reviews"
								placeholder={tStrings.yotpo.searchReviews}
								onKeyPress={(e) => {
									if (e.key === 'Enter') onFilterChange();
								}}
							/>
							<div className="input-group-append flex">
								<button type="button" className="w-[50px] max-w-[50px] max-h-[50px] input-group-text border bg-white  h-full rounded-0 flex justify-center items-center border-gray-400" aria-label="Submit search" onClick={() => onFilterChange()}>
									<SvgSearch className="svg size-1em" />
								</button>
							</div>
						</div>

						<div className="flex flex-wrap mt-1 lg:-mx-g sm:-mx-hg w-full">
							<div className="w-1/2 lg:w-1/4 lg:px-g sm:px-hg">
								<select className="custom-select my-1 border-dark" name="scores" onChange={() => { onFilterChange(); }}>
									<option value="">{tStrings.yotpo.rating}</option>
									<option value="5">5 Stars</option>
									<option value="4">4 Stars</option>
									<option value="3">3 Stars</option>
									<option value="2">2 Stars</option>
									<option value="1">1 Star</option>
								</select>
							</div>
							<div className="w-1/2 lg:w-1/4 lg:px-g sm:px-hg">
								<select className="custom-select my-1 border-dark" name="pictured" onChange={() => { onFilterChange(); }}>
									<option value="">{tStrings.yotpo.imageVideo}</option>
									<option value="true">{tStrings.yotpo.withImageVideo}</option>
								</select>
							</div>
							{customFilter.map((q) => q.filter !== '' && (
								<div key={q.slug} className="w-1/2 lg:w-1/4 lg:px-g sm:px-hg">
									<select className="custom-select my-1 border-dark" name={q.slug} onChange={() => { onFilterChange(); }}>
										<option value="">{q.filter}</option>
										{q.options.map((o) => (
											<option key={o} value={o}>{o.replace('/', ' / ')}</option>
										))}
									</select>
								</div>
							))}
						</div>
					</div>

					<hr className="my-2"/>

					{revLoading && (
						<div className="flex justify-center mt-4 ab">
							<div className="spinner-border " role="status" aria-hidden="true" />
						</div>
					)}

					{!revLoading && reviews.length === 0 && !filtering && (
						<div className="">
							<button
								type="button"
								className="btn btn-primary block mx-auto my-4"
								data-toggle="collapse"
								data-target="#yotpoReviewForm"
								aria-expanded="false"
								aria-controls="yotpoReviewForm"
								onClick={() => {
									handleForm('review');
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
							<p className="font-bold mb-0">{`${total} Review${total !== 1 ? 's' : ''}`}</p>
							<div className="container" role="list">
								{reviews.map((review) => (
									<div key={review.id} className="border-b py-3 flex flex-wrap sm:-mx-hg lg:-mx-g">
										<div className="w-full lg:w-1/4 pl-0 lg:pr-g">
											<h4 className="h4 mb-0 flex items-center sm:inline-flex lg:flex font-bold">
												{review.user_name}
												{review.verified_buyer && <SvgVerified className="svg text-[0.75em] ms-25 text-primary size-[1em] fill-primary hidden lg:block" />}
											</h4>
											{isTrialParticipant(review) && <p className="text-sm mb-0 sm:inline-flex lg:flex sm:ml-hg lg:ml-0">Trial Participant</p>}
											{review.verified_buyer && !isTrialParticipant(review) && <p className="text-sm mb-0 sm:inline-flex lg:flex sm:ml-hg lg:ml-0">{tStrings.yotpo.verifiedBuyer}</p>}

											<p className="text-sm mb-1 sm:hidden lg:block">
												{formatDate(review.created_at, formattedDate)}
											</p>
											<div className="flex text-secondary mb-1 sm:block lg:hidden">
												<ReviewStar score={review.score} />
											</div>
											{review.custom_fields !== null && Object.entries(review.custom_fields).map((field) => (
												<p key={kebabCase(field[0])} className="text-sm mb-0">
													<strong>
														{field[0]}
														:
													</strong>
													<span className="ml-25">
														{/* @ts-ignore */}
														{field[1] ? field[1].join(', ') : ''}
													</span>
												</p>
											))}
										</div>
										<div className="w-full lg:w-3/4 lg:pl-hg pr-0">
											<div className="flex text-secondary mt-1 lg:mt-0 sm:hidden lg:block">
												<ReviewStar score={review.score} />
											</div>
											<h4 className="mb-1 mt-1 font-bold lg:font-normal">
												{decodeHtml(review.title)}
											</h4>
											<p className="mb-1">
												{review.hideContent ? review.shortContent : review.content}
												{review.shortContent && review.shortContent.length > 0 && (
													<button
														type="button"
														className="btn border-0 text-primary p-0 ml-25 font-normal hover:underline"
														onClick={() => { showMoreContent(review); }}
													>
														{review.hideContent ? tStrings.yotpo.readMore : tStrings.yotpo.readLess}
													</button>
												)}
											</p>
											{(getMediaData(review).length > 0) && (
												<div className="flex flex-nowrap w-auto overflow-auto pr-g">
													{getMediaData(review).map((media:any, index:any) => (
														<button key={media.id} type="button" className={`yotpo-widget__button-img relative inline-block mr-g mb-g ml-0 mr-2 mb-g text-start`} onClick={() => { handleClickImage(review, index) }}>
															<img className="object-cover size-[75px]" src={media.thumb_url.replace('https:', '')} alt={`${review.user_name} ${index}`} width="150" height="150" />
															{media.video_url && (
																<SvgPlayIcon className="svg text-white w-[20px] h-[20px] absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]" />
															)}
															{/* preloade image for modal, to make it fast load when popup opened */}
															<img rel="preload" src={media.image_url?.replace('https:', '')} className="hidden"/>
														</button>
													))}
												</div>
											)}
											<div className="flex justify-end items-center mt-3">
												<p className="text-sm mb-0 flex lg:hidden mr-auto my-auto">
													{formatDate(review.created_at, formattedDate)}
												</p>
												<p className="text-sm mr-0 mb-0">{tStrings.yotpo.reviewHelpful}</p>
												<button type="button" className={`btn-unstyled text-sm flex items-center mx-1 !text-body ${votes[`reviews-${review.id}`] === 'up' && 'text-primary'}`} onClick={() => { onVote('reviews', review.id, 'up'); }}>
													<SvgThumbsUp className="svg mr-25 size-1em" />
													{review.votes_up}
												</button>
												<button type="button" className={`btn-unstyled text-sm flex items-center mx-1 !text-body ${votes[`reviews-${review.id}`] === 'down' && 'text-primary'}`} onClick={() => { onVote('reviews', review.id, 'down'); }}>
													<SvgThumbsDown className="svg mr-25 size-1em" />
													{review.votes_down}
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						</>
					)}

					{!revLoading && revPage.totalPage > 1 && (
						<ul className="list-unstyled flex justify-center items-center mt-2">
							<li>
								<button type="button" className={`text-primary btn border-0 text-primary px-1 font-normal ${revPage.page === 1 && 'invisible'}`} aria-label="Previous review page" disabled={revPage.page === 1} onClick={() => onRevPageChange(revPage.page - 1)}><SvgChevronPrev className="svg svg--current-color size-1em" /></button>
							</li>
							{revPage.show.map((v) => (
								<li key={v}>
									<button type="button" className={`text-primary btn border-0 text-primary px-1 ${v === revPage.page ? '' : 'font-normal'}`} onClick={() => onRevPageChange(v)}>{v}</button>
								</li>
							))}
							<li>
								<button type="button" className={`text-primary btn border-0 text-primary px-1 font-normal ${revPage.page === revPage.totalPage && 'invisible'}`} aria-label="Next review page" disabled={revPage.page === revPage.totalPage} onClick={() => onRevPageChange(revPage.page + 1)}><SvgChevronNext className="svg svg--current-color size-1em" /></button>
							</li>
						</ul>
					)}
				</div>

				<div id="yotpo-widget__questions" className={`[transition:opacity_0.15s_linear] ${activeTab === 'question' ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="yotpo-widget__questions-tab">
					{qnaLoading && (
						<div className="flex justify-center mt-4">
							<div className="spinner-border" role="status" aria-hidden="true" />
						</div>
					)}

					{!qnaLoading && questions.length === 0 && (
						<div className="">
							<button
								type="button"
								className="btn btn-primary block mx-auto my-4"
								data-toggle="collapse"
								data-target="#yotpoQuestionForm"
								aria-expanded="false"
								aria-controls="yotpoQuestionForm"
								onClick={() => {
									handleForm('question')
									if (!canCreate) window.location.href = `${productUrl}#write-a-review`;
								}}
							>
								{tStrings.yotpo.beFirstQuestion}
							</button>
						</div>
					)}

					{!qnaLoading && questions.length > 0 && questions.map((question) => (
						<div key={question.id} className="pt-3 pb-4 border-b">
							<h4 className="mb-0 font-bold">{question.user_name}</h4>
							<p className="text-sm mb-0">{tStrings.yotpo.verifiedReviewer}</p>
							<p className="text-sm ml-auto mb-1">
								{formatDate(question.created_at, formattedDate)}
							</p>
							<p className="font-bold mb-1">{`Q: ${decodeHtml(question.content)}`}</p>
							<p className="text-sm">
								{tStrings.yotpo.answer}
								{' ('}
								{question.sorted_public_answers.length}
								)
							</p>
							{question.sorted_public_answers.map((answer) => (
								<div key={answer.id} className="ml-4 mt-2 border-l pl-3">
									<h4 className="mb-0 text-lg font-bold">{tStrings.yotpo.storeOwner}</h4>
									<p className="text-sm">{formatDate(answer.created_at, formattedDate)}</p>
									<p className="mt-2 text-md" dangerouslySetInnerHTML={{ __html: `A: ${answer.content}` }}></p>
									<div className="flex justify-end items-center mt-3">
										<p className="text-sm mr-1 mb-0">{tStrings.yotpo.answerHelpful}</p>
										<button type="button" className={`btn-unstyled text-sm flex items-center mx-1 ${votes[`answers-${answer.id}`] === 'up' && 'text-primary'}`} onClick={() => { onVote('answers', answer.id, 'up'); }}>
											<SvgThumbsUp className="svg mr-25 size-1em" />
											{answer.votes_up + (votes[`answers-${answer.id}`] === 'up' ? 1 : 0)}
										</button>
										<button type="button" className={`btn-unstyled text-sm flex items-center mx-1 ${votes[`answers-${answer.id}`] === 'down' && 'text-primary'}`} onClick={() => { onVote('answers', answer.id, 'down'); }}>
											<SvgThumbsDown className="svg mr-25 size-1em" />
											{answer.votes_down + (votes[`answers-${answer.id}`] === 'down' ? 1 : 0)}
										</button>
									</div>
								</div>
							))}
						</div>
					))}

					{!qnaLoading && qnaPage.totalPage > 1 && (
						<ul className="list-unstyled flex justify-center items-center mt-2">
							<li>
								<button type="button" className={`btn border-0 text-primary px-1 ${qnaPage.page === 1 && 'invisible'}`} aria-label="Previous review page" disabled={qnaPage.page === 1} onClick={() => onQnaPageChange(qnaPage.page - 1)}><SvgChevronPrev className="svg text-primary" /></button>
							</li>
							{qnaPage.show.map((v) => (
								<li key={v}>
									<button type="button" className={`btn border-0 text-primary px-1 ${v === qnaPage.page ? 'font-bold' : ''}`} onClick={() => onQnaPageChange(v)}>{v}</button>
								</li>
							))}
							<li>
								<button type="button" className={`btn border-0 text-primary px-1 ${qnaPage.page === qnaPage.totalPage && 'invisible'}`} aria-label="Next review page" disabled={qnaPage.page === qnaPage.totalPage} onClick={() => onQnaPageChange(qnaPage.page + 1)}><SvgChevronNext className="svg text-primary" /></button>
							</li>
						</ul>
					)}
				</div>
			</div>

			<Modal className="modal-lg modal-dialog-centered !px-0" isOpen={isOpen} handleClose={() => handlOpenModal(false)}>
				{!!reviewModal.id && (
					// <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
						<div className="modal-content mx-2 lg:mx-0 relative max-h-[50%]">
							<div className="flex flex-wrap items-center bg-white rounded rounded-lg overflow-hidden">
								<div className="lg:w-1/2 pr-lg-0">
									{getMediaData(reviewModal).length === 1 ? (
										<>
											{getMediaData(reviewModal)[0].image_url && (<img src={getMediaData(reviewModal)[0].image_url?.replace('https:', '')} alt="Slide 1" className="d-block w-100" />) }
											{getMediaData(reviewModal)[0].video_url && (
												<div className="relative flex relative">
													<video id={`video-review-${getMediaData(reviewModal)[0].id}`} className="w-full bg-gray-400" autoPlay={false} name="media" poster={getMediaData(reviewModal)[0].cover ? getMediaData(reviewModal)[0].cover : ''}>
														<source src={getMediaData(reviewModal)[0].video_url} type="video/mp4" />
													</video>
													{getMediaData(reviewModal)[0].video_url && (
														<SvgPlayIcon onClick={(ev:any) => playVideo(ev, `video-review-${getMediaData(reviewModal)[0].id}`)} className="svg text-white w-[40px] h-[40px] lg:w-[80px] lg:h-[80px] absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]" />
													)}
												</div>
											)}
										</>
									) : (
										<div className="relative">
											<Carousel.Wrapper emblaApi={emblaApi7}>
												<Carousel.Inner emblaRef={emblaRef7} className='items-start'>
													{getMediaData(reviewModal).map((media:any, i:any) => (
														<div key={media.id} className={`carousel__slide flex-grow-0 flex-shrink-0 w-full basis-full relative`}>
															{media.image_url && (<img src={media.image_url?.replace('https:', '')} alt={`Slide ${i + 1}`} className="block w-full object-cover max-h-[500px]" />)}
															{media.video_url && (
																// eslint-disable-next-line jsx-a11y/media-has-caption
																<video id={`video-review-${media.id}`} className="w-full bg-gray-400" autoPlay={false} name="media" poster={media.cover ? media.cover : ''}>
																	<source src={media.video_url} type="video/mp4" />
																</video>
															)}
															{media.video_url && (
																<SvgPlayIcon onClick={(ev:any) => playVideo(ev, `video-review-${media.id}`)} className="svg text-white w-[40px] h-[40px] lg:w-[80px] lg:h-[80px] absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]" />
															)}
														</div>
													))}
												</Carousel.Inner>
												<Carousel.Navigation>
													<PrevButton
														onClick={() => autoPlayClick7(arrowClickPrev7)}
															disabled={prevDisabled7}
														>
															<span className="left-0 w-[2.5em] h-[2.5em] absolute z-[-1] flex justify-center items-center right-0 bg-pink-light">
																<ChevronPrev className="w-[1em] h-[1em] fill-primary" />
															</span>
													</PrevButton>
													<NextButton
															onClick={() => autoPlayClick7(arrowClickNext7)}
															disabled={nextDisabled7}
															>
															<span className="right-0 w-[2.5em] h-[2.5em] absolute z-[-1] flex justify-center items-center bg-pink-light">
																<ChevronNext className="w-[1em] h-[1em] fill-primary" />
															</span>
													</NextButton>
												</Carousel.Navigation>
											</Carousel.Wrapper>
										</div>
									)}
									<button type="button" className="close absolute flex lg:hidden top-[10px] right-[10px] z-40" aria-label="Close" onClick={() => setIsOpen(false) }>
										<SvgCloseCircle className="svg size-[24px]" />
									</button>
								</div>
								<div className="lg:w-1/2 pl-lg-0 ">
									<div className="px-2 py-3">
										<div className="flex">
											<h4 className="mb-0 text-sm font-bold">{reviewModal.user_name}</h4>
											{isTrialParticipant(reviewModal) && <span className="ml-1 text-sm">Trial Participant</span>}
											{!isTrialParticipant(reviewModal) && <span className="ml-1 text-sm">{tStrings.yotpo.verifiedBuyer}</span>}
											<span className="ml-auto text-sm">{formatDate(reviewModal.created_at, formattedDate)}</span>
										</div>
										<div className="flex text-secondary" />
										<h4 className="my-2 yotpo__modal-title">{decodeHtml(reviewModal.title)}</h4>
										<p className="text-sm yotpo__modal-content">{reviewModal.content}</p>
										<div className="flex justify-end items-center mt-3">
											<p className="text-sm mr-0 mb-0">{tStrings.yotpo.reviewHelpful}</p>
											<button type="button" className={`btn-unstyled text-sm flex items-center mx-1 ${votes[`reviews-${reviewModal.id}`] === 'up' && ''}`} onClick={() => { onVote('reviews', reviewModal.id, 'up'); }}>
												<SvgThumbsUp className="svg mr-25 size-1em" />
												{reviewModal.votes_up}
											</button>
											<button type="button" className={`btn-unstyled text-sm flex items-center mr-1 ${votes[`reviews-${reviewModal.id}`] === 'down' && ''}`} onClick={() => { onVote('reviews', reviewModal.id, 'down'); }}>
												<SvgThumbsDown className="svg mr-25 size-1em" />
												{reviewModal.votes_down}
											</button>
										</div>
									</div>
								</div>
							</div>
							<button type="button" className="close absolute text-base hidden lg:flex top-[15px] right-[15px]" aria-label="Close" onClick={() => setIsOpen(false) }>
								<SvgClose className="svg size-1em" />
							</button>
						</div>
					// </div>
				)}
			</Modal>
		</>
	);
};

// YotpoReviewWidget.propTypes = {
// 	productId: PropTypes.number.isRequired,
// 	productName: PropTypes.string,
// 	productUrl: PropTypes.string,
// 	productImage: PropTypes.string,
// 	productDesc: PropTypes.string,
// 	productSkus: PropTypes.string.isRequired,
// 	canCreate: PropTypes.bool.isRequired,
// };

export default YotpoReviewWidget;
