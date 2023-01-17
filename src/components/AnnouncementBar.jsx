import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const AnnouncementBar = (props) => {
	const {
		text,
		timerEnabled,
		url,
		countDownStart,
		countDownEnd,
		countDownDays,
		countDownDay,
		countDownHrs,
		countDownHr,
		countDownMin,
		countDownSec
	} = props;

	const [mainText, setText] = useState(text);
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

	return (
		<div className={`announcement-bar  ${timerEnabled && showTimer ? 'announcement-bar__timer' : ''} bg-primary-light w-100`}>
			<div className="container text-center fw-bold">
				{timerEnabled && showTimer ? (
					<div className="announcement-bar  bg-blue w-100">
					<div className="container text-center text-white d-flex align-items-center justify-content-between justify-content-lg-center">
						<span className="announcement-bar__timer__title d-block d-lg-inline mr-lg-4 mb-0 font-weight-normal text-left font-size-sm font-size-dt-lg">{mainText}</span>
						<ul className="d-inline list-inline mb-0 font-weight-bold">
							<li id="timerDays" className="list-inline-item position-relative mr-1 h2 mb-0 font-weight-normal">{timerDay}</li>
							<li id="timerHrs" className="list-inline-item position-relative mx-1 h2 mb-0 font-weight-normal">{timerHrs}</li>
							<li id="timerMin" className="list-inline-item position-relative mx-1 h2 mb-0 font-weight-normal">{timerMin}</li>
							<li id="timerSec" className="list-inline-item position-relative mx-1 h2 mb-0 font-weight-normal">{timerSec}</li>
						</ul>
					</div>
				</div>
				) : (
					<a href={url}>{mainText}</a>
				)}
			</div>
		</div>
	);
}

AnnouncementBar.propTypes = {
	text: PropTypes.string.isRequired,
	timer: PropTypes.bool.isRequired,
	url: PropTypes.string.isRequired,
	countDownStart: PropTypes.string.isRequired,
	countDownEnd: PropTypes.string.isRequired,
	countDownDays: PropTypes.string.isRequired,
	countDownDay: PropTypes.string.isRequired,
	countDownHrs: PropTypes.string.isRequired,
	countDownHr: PropTypes.string.isRequired,
	countDownMin: PropTypes.string.isRequired,
	countDownSec: PropTypes.string.isRequired,
};

export default AnnouncementBar;
