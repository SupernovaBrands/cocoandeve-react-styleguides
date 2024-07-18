import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import AutoHeight from 'embla-carousel-auto-height'

const options: EmblaOptionsType = {
	loop: true,
};

const AnnouncementBar = (props: any) => {
	// console.log('annbar', props);
	const {
		text,
		url,
		text2,
		url2,
		text3,
		url3,
		timerEnabled,
		countDownStart,
		countDownEnd,
		countDownDays,
		countDownDay,
		countDownHrs,
		countDownHr,
		countDownMin,
		countDownSec
	} = props;

	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 3000, stopOnInteraction: false }),
		AutoHeight()
	]);
	/*
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
		const end = new Date(endAt);
		const second = 1000;
		const minute = second * 60;
		const hour = minute * 60;
		const day = hour * 24;
		let timer;

		const showRemaining = () => {
			const now = new Date();

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

			let timerText = '';

			if (days > 0) {
				setTimerDay(`${days} <span>${days > 1 ? countDownDays : countDownDay}</span>`);
			} else {
				setTimerDay(-1);
			}
			setTimerHrs(`${String(hours).padStart(2, '0')} <span>${hours > 1 ? countDownHrs : countDownHr}</span>`);
			setTimerMin(`${String(minutes).padStart(2, '0')} <span>${countDownMin}</span>`);
			setTimerSec(`${String(seconds).padStart(2, '0')} <span>${countDownSec}</span>`);
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

	useEffect(() => {
		const startAt = getUtcTime(countDownStart);
		const endAt = getUtcTime(countDownEnd);
		const now = nowUtcTime();
		starTimer(now, startAt, endAt);
		setText(text);
	}, []);
	*/

	return (
		<div className={`announcement-bar  bg-primary-light w-100 px-[0] py-[0.59375em]`}>
			<div className="container text-center font-bold">
					<Carousel.Wrapper emblaApi={emblaApi}>
						<Carousel.Inner emblaRef={emblaRef} className="lg:-mx-g items-start">
							{text && (
								<a href={url} className='text-secondary hover:text-secondary w-full basis-full flex-grow-0 flex-shrink-0'>{text}</a>
							)}
							{text2 && (
								<a href={url2} className='text-secondary hover:text-secondary w-full basis-full flex-grow-0 flex-shrink-0'>{text2}</a>
							)}
							{text3 && (
								<a href={url3} className='text-secondary hover:text-secondary w-full basis-full flex-grow-0 flex-shrink-0'>{text3}</a>
							)}
						</Carousel.Inner>
					</Carousel.Wrapper>
			</div>
		</div>
	);
}

export default AnnouncementBar;
