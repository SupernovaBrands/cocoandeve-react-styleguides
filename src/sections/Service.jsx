import Stars from '@/images/icons/two-line-stars.svg';
import FastDelivery from '@/images/icons/fast-delivery.svg';
import WinnerAward from '@/images/icons/winner-award.svg';
import MoneyBack from '@/images/icons/moneyback.svg';
import { Container } from 'react-bootstrap';

const Service = () => {
	const SERVICES = [
		{ id: 'stars', label: `33,011 5 Star <br>customer reviews`},
		{ id: 'fast-delivery', label: 'Delivery from <br>US warehouse'},
		{ id: 'winner-award', label: 'Award-winning <br>beauty'},
		{ id: 'money-back', label: 'Money back <br>guarantee'},
	];
	return (
		<section className="text-center bg-gray-400">
			<Container className="services-list">
				<ul className="list-unstyled row align-items-center justify-content-center pt-4 pt-md-4 pb-md-4 pb-0 pl-0 mx-lg-5 mb-0">
					{SERVICES.map((list, i) => {
						return (
							<li key={i} className="col-6 col-md-3 mb-4 mb-lg-0">
								<i className="d-inline-flex h1 mb-2">
									{list.id === 'stars' && <Stars className="svg text-secondary svg--current-color" />}
									{list.id === 'fast-delivery' && <FastDelivery className="svg text-secondary svg--current-color" />}
									{list.id === 'winner-award' && <WinnerAward className="svg text-secondary svg--current-color" />}
									{list.id === 'money-back' && <MoneyBack className="svg text-secondary svg--current-color" />}
								</i>
								<p className="title mb-0">{list.label.split('<br>').map((item) => (
									<span key={`${item}-services`}>{item}<br /></span>
								))}</p>
							</li>
						);
					})}
				</ul>
			</Container>
		</section>
	);
};

export default Service;
