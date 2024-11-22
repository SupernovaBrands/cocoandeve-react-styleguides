import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import AutoHeight from 'embla-carousel-auto-height'
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

const options: EmblaOptionsType = {
	loop: true,
};

const AnnouncementBar = (props: any) => {
	const {
		scrolled,
		text,
		text2,
		text3,
		url,
		url2,
		url3,
		timerData,
		background,
		textColor,
		loaded,
		isScrollEnabled,
		isStickyEnabled
	} = props;

	const noticeTImesLabels = timerData && timerData.times_labels ? timerData.times_labels.split(':') : [];
	const countDownDay = noticeTImesLabels[0]?.split(',')[0];
	const countDownDays = noticeTImesLabels[0]?.split(',')[1];
	const countDownHr = noticeTImesLabels[1]?.split(',')[0];
	const countDownHrs = noticeTImesLabels[1]?.split(',')[1];
	const countDownMin = noticeTImesLabels[2]?.split(',')[0];
	const countDownSec = noticeTImesLabels[3]?.split(',')[0];

	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 5000, stopOnInteraction: false }),
		AutoHeight()
	]);

	const [showTimer, setShowTimer] = useState(false);
	const [timerDay, setTimerDay] = useState('');
	const [timerHrs, setTimerHrs] = useState('');
	const [timerMin, setTimerMin] = useState('');
	const [timerSec, setTimerSec] = useState('');

	const getUtcTime = (date) => {
		const now = new Date(date);
		const utcTimestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
		return utcTimestamp - (8 * 60 * 60 * 1000);
	};

	const nowUtcTime = () => {
		const now = new Date();
		const utcTimestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
		return utcTimestamp - (8 * 60 * 60 * 1000);
	};

	const startCount = (endAt) => {
		const end:any = new Date(endAt);
		const second = 1000;
		const minute = second * 60;
		const hour = minute * 60;
		const day = hour * 24;
		let timer;

		const showRemaining = () => {
			const now: any = new Date();

			const distance = end - now;
			if (distance < 0) {
				clearInterval(timer);
				setShowTimer(false);
				return;
			}
			const days = Math.floor(distance / day);
			const hours = Math.floor((distance % day) / hour);
			const minutes = Math.floor((distance % hour) / minute);
			const seconds = Math.floor((distance % minute) / second);

			if (days > 0) {
				setTimerDay(`\u00a0${days}\u00a0\u00a0<span>${days > 1 ? countDownDays : countDownDay}\u00a0</span>`);
			} else {
				setTimerDay('');
			}
			setTimerHrs(`\u00a0${String(hours).padStart(2, '0')}\u00a0\u00a0<span>${hours > 1 ? countDownHrs : countDownHr}\u00a0</span>`);
			setTimerMin(`\u00a0${String(minutes).padStart(2, '0')}\u00a0\u00a0<span>${countDownMin}\u00a0</span>`);
			setTimerSec(`\u00a0${String(seconds).padStart(2, '0')}\u00a0\u00a0<span>${countDownSec}\u00a0</span>`);
		};

		timer = setInterval(showRemaining, 1000);
	};

	const starTimer = (now, startAt, endAt) => {
		if (now > startAt && now < endAt) {
			setShowTimer(true);
			startCount(endAt);
		} else {
			setShowTimer(false);
		}
	};

	const isShowOnCurrentTemplate = () => {
		const listPage = (timerData && timerData.notice_bar_timer_certains_page) ? timerData.notice_bar_timer_certains_page.toString().split(',') : [];
		if (listPage.length === 0) return true;
		return listPage.includes(window.location.pathname);
	};

	useEffect(() => {
		if (timerData && timerData.notice_bar && isShowOnCurrentTemplate()) {
			const startAt = getUtcTime(timerData.notice_start_at);
			const endAt = getUtcTime(timerData.notice_end_at);
			const now = nowUtcTime();
			starTimer(now, startAt, endAt);
		}
	}, []);

	useEffect(() => {
		if (timerData && timerData.notice_bar && isShowOnCurrentTemplate()) {
			const startAt = getUtcTime(timerData.notice_start_at);
			const endAt = getUtcTime(timerData.notice_end_at);
			const now = nowUtcTime();
			starTimer(now, startAt, endAt);
		}
	}, [props]);

	useEffect(() => {
		if (showTimer) document.body.classList.add('timer-bar--show');
		else document.body.classList.remove('timer-bar--show');
	}, [showTimer]);
	const bg = background ? background : 'primary-light';
	const lineColor = loaded ? `${textColor || 'text-secondary hover:text-secondary'}` : `text-primary-light hover:text-primary-light`;
	const bgColor = loaded ? `${background || 'bg-primary-light'}` : 'bg-primary-light';
	return (
		<>
			{timerData && timerData.notice_bar && showTimer && isShowOnCurrentTemplate() ? (
				<div className={`${timerData?.is_sticky ? '' : scrolled ? 'hidden' : ''} px-[0] py-[0.59375em] announcement-bar announcement-bar__timer w-full ${timerData.notice_bar_timer_background ? timerData.notice_bar_timer_background : 'bg-primary-light'}`}>
					<a href={`${timerData.notice_bar_timer_link ? timerData.notice_bar_timer_link : '#'}`} className="no-underline hover:no-underline">
						<div className={`${timerData.notice_bar_timer_text_color ? timerData.notice_bar_timer_text_color : 'text-dark'} container text-center flex items-center justify-between lg:justify-center`}>
							<span className="announcement-bar__timer__title block max-w-[45%] lg:max-w-none lg:inline mb-0 font-normal text-left font-size-sm font-size-dt-lg mr-0 lg:mr-4">{timerData.notice_text}</span>
							<ul className={`announcement-bar__timer__countdown mb-0 font-bold ml-1 lg:ml-0 ${timerSec === '' ? 'hidden' : 'inline'}`}>
								{timerDay !== '' && timerDay !== '-1' && (
									<li id="timerDays" className={`list-inline-item inline-block relative mr-1 h2 mb-0 !font-normal ${timerDay === '' ? 'hidden' : ''}`}>{parse(timerDay)}</li>
								)}
								<li id="timerHrs" className="list-inline-item inline-block relative mr-1 h2 mb-0 !font-normal">{parse(timerHrs)}</li>
								<li id="timerMin" className="list-inline-item inline-block relative mr-1 h2 mb-0 !font-normal">{parse(timerMin)}</li>
								<li id="timerSec" className="list-inline-item inline-block relative h2 mb-0 !font-normal">{parse(timerSec)}</li>
							</ul>
						</div>
					</a>
				</div>
			) : isScrollEnabled ? (
				<div className={`${isStickyEnabled ? '' : scrolled ? 'hidden' : ''} announcement-bar ${bgColor} w-full px-[0] pt-[5px] accouncement-bar--abtest`}>
					<div className="announcement-bar__marquee overflow-hidden relative text-center font-bold">
						<div className="announcement-bar__content">
							{[...Array(4)].map((_, index) => (
								<React.Fragment key={index}>
									{text && (
										<>
											<span><a href={url} className={`${lineColor} hover:${lineColor} w-full basis-full flex-grow-0 flex-shrink-0`}>{text}</a></span>
										</>
									)}
									{text2 && (
										<>
											<span><a href={url2} className={`${lineColor} hover:${lineColor} w-full basis-full flex-grow-0 flex-shrink-0`}>{text2}</a></span>
										</>
									)}
									{text3 && (
										<>
											<span><a href={url3} className={`${lineColor} hover:${lineColor} w-full basis-full flex-grow-0 flex-shrink-0`}>{text3}</a></span>
										</>
									)}
								</React.Fragment>
							))}
						</div>
					</div>
				</div>
			) : (
				<div className={`${isStickyEnabled ? '' : scrolled ? 'hidden' : ''} announcement-bar ${bgColor} ${isScrollEnabled ? 'hidden': ''} w-full px-[0] py-[0.59375em]`}>
					<div className="container text-center font-bold">
							<Carousel.Wrapper emblaApi={emblaApi}>
								<Carousel.Inner emblaRef={emblaRef} className="lg:-mx-g items-start">
									{text && (
										<a href={url} className={`${lineColor} hover:${lineColor} w-full basis-full flex-grow-0 flex-shrink-0`}>{text}</a>
									)}
									{text2 && (
										<a href={url2} className={`${lineColor} hover:${lineColor} w-full basis-full flex-grow-0 flex-shrink-0`}>{text2}</a>
									)}
									{text3 && (
										<a href={url3} className={`${lineColor} hover:${lineColor} w-full basis-full flex-grow-0 flex-shrink-0`}>{text3}</a>
									)}
								</Carousel.Inner>
							</Carousel.Wrapper>
					</div>
				</div>
			)}
		</>
	);
}

export default AnnouncementBar;
