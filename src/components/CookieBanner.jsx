import dynamic from 'next/dynamic';
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import PropTypes from 'prop-types';
// import { getCookie, removeCookie } from '@/modules/utils';
const {
	getCookie,
	removeCookie,
} = dynamic(() => import('@/modules/utils'), {
    ssr: false,
});

const CookieBanner = (props) => {
	const [open, setOpen] = useState(false);
	const [functional, setFunctional] = useState(false);
	const [performance, setPerformance] = useState(true);
	const [ads, setAds] = useState(true);

	const functionalEl = 'functional';
	const performanceEl = 'performance';
	const adsEl = 'ads';
	const gdprPerformaceList = '';
	const gdprAdsList = '';

	const checkCookie = () => {
		if (getCookie('performance') === 'off') {
			const _list = gdprPerformaceList;
			const _cookies = _list.split(';');
			if (_cookies.length > 0) {
				for (let i = 0; i <= _cookies.length - 1; i += 1) {
					removeCookie(_cookies[i], '/', '.cocoandeve.com');
				}
			}
		}
		if (getCookie('ads') === 'off') {
			// delete ads cookies
			const _list = gdprAdsList;
			const _cookies = _list.split(';');
			if (_cookies.length > 0) {
				for (let i = 0; i <= _cookies.length - 1; i += 1) {
					removeCookie(_cookies[i], '/', '.cocoandeve.com');
				}
			}
		}
	};

	const onAcceptCookie = () => {
		const now = new Date();
		let time = now.getTime();
		time += 3600 * 1000 * 24 * 365 * 1;
		now.setTime(time);
		const val1 = (functional) ? 'on' : 'off';
		const val2 = (performance) ? 'on' : 'off';
		const val3 = (ads) ? 'on' : 'off';
		const data = `functional=${val1}; expires=${now.toUTCString()}; path=/`;
		document.cookie = data;
		const data2 = `performance=${val2}; expires=${now.toUTCString()}; path=/`;
		document.cookie = data2;
		const data3 = `ads=${val3}; expires=${now.toUTCString()}; path=/`;
		document.cookie = data3;
		checkCookie();

		props.onAcceptCookie(true);
	};

	const onCheckboxChange = (e) => {
		console.log(e.target.id);
		if (e.target.id === 'functional') setFunctional(e.target.checked);
		if (e.target.id === 'performance') setPerformance(e.target.checked);
		if (e.target.id === 'ads') setAds(e.target.checked);
	};

	return (
		<section className="cookies-banner bg-white">
			<div className="container py-2 font-size-xs">
				<p className="text-center">
					We use cookies to enhance your browsing experience, analyse traffic and serve tailored advertisements.
					<a href="/pages/privacy-policy" className="text-dark text-underline">Find out more.</a>
				</p>
				<Collapse in={open}>
					<div>
						<ul className="list-unstyled">
							<li className="pb-2 pt-0 pb-lg-0">
								<div className="custom-control custom-switch">
									<input type="checkbox" className="custom-control-input" checked={functional} id={functionalEl} disabled onChange={onCheckboxChange} />
									<label className="custom-control-label pt-0 pt-lg-1 pl-1" htmlFor={functionalEl}>
										<strong>Functional:</strong> These cookies are required for basic site functionality and are therefore always enabled.
									</label>
								</div>
							</li>
							<li className="py-2 pt-lg-1 pb-lg-1">
								<div className="custom-control custom-switch">
									<input type="checkbox" className="custom-control-input" checked={performance} id={performanceEl} onChange={onCheckboxChange} />
									<label className="custom-control-label pt-0 pt-lg-1 pl-1" htmlFor={performanceEl}>
										<strong>Performance:</strong> These cookies allow us to improve the site's functionality by tracking usage on this website.
									</label>
								</div>
							</li>
							<li className="py-2 pt-lg-0 pb-lg-1">
								<div className="custom-control custom-switch">
									<input type="checkbox" className="custom-control-input" checked={ads} id={adsEl} onChange={onCheckboxChange} />
									<label className="custom-control-label pt-0 pt-lg-1 pl-1" htmlFor={adsEl}><strong>Social Media and Advertising:</strong> These cookies allow us to improve the site's functionality by tracking usage on this website.</label>
								</div>
							</li>
						</ul>
					</div>
				</Collapse>
				<div className="text-center">
					{open ? (
						<a className="text-underline text-dark use-default d-none mr-1 btn px-0" onClick={onAcceptCookie}>Use Default</a>
					) : (
						<a className="text-underline text-dark mr-1 btn px-0 me-1" onClick={() => setOpen(!open)}>Change</a>
					)}
					<button className="btn btn-outline-dark rounded-0 accept-cookie" type="button" onClick={onAcceptCookie}>OK</button>
				</div>
			</div>
		</section>
	);
};

CookieBanner.propTypes = {
	onAcceptCookie: PropTypes.func,
};

export default CookieBanner;
