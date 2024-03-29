import Stars from '@/images/icons/two-line-stars.svg';
import WinnerAward from '@/images/icons/winner-award.svg';
import MoneyBack from '@/images/icons/moneyback.svg';

const Service = () => {
	const SERVICES = [
		{ id: 'stars', label: `39,792 stars <br>Customer Reviews`},
		{ id: 'winner-award', label: 'Award-winning <br>beauty'},
		{ id: 'money-back', label: 'Money back <br>guarantee'},
	];
	return (
		<section className="text-center section-services-list">
			<div className="container">
				<ul className="list-unstyled flex flex-wrap items-center justify-center pt-3 pb-3 md:pt-6 md:pb-6 pl-0 lg:mx-5 mb-0 lg:mb-4">
					{SERVICES.map((list, i) => {
						return (
							<li key={i} className="w-1/3 md:w-1/6 mb-4 lg:mb-0 px-g px-sm-g">
								<i className="inline-flex flex-wrap h1 mb-2">
									{list.id === 'stars' && <Stars className="text-body" />}
									{list.id === 'winner-award' && <WinnerAward className="text-body" />}
									{list.id === 'money-back' && <MoneyBack className="text-body" />}
								</i>
								<p className="title mb-0">{list.label.split('<br>').map((item) => (
									<span key={`${item}-services`}>{item}<br /></span>
								))}</p>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
};

export default Service;
