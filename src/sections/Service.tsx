import Stars from '~/images/icons/two-line-stars.svg';
import WinnerAward from '~/images/icons/winner-award.svg';
import MoneyBack from '~/images/icons/moneyback.svg';
import React, { useState, useEffect } from 'react';

import {
	encryptParam,
} from '~/modules/utils_v2';

const Service = (props: any) => {
	const [totalReviews, setTotalReviews] = useState(null);
	const apiUrl = 'https://reviews-api.cocoandeve.com/api';
	const SERVICES = [
		{ id: 'stars', label: `__ratings__ stars <br class="hidden lg:block"> <span class="hidden lg:inline">Customer</span> Reviews`},
		{ id: 'winner-award', label: 'Award-winning <br>Beauty'},
		{ id: 'money-back', label: 'Money back <br>guarantee'},
	];

	const signature = encryptParam(`{brand:'cocoandeve',time:${new Date().getTime()}}`);
	fetch(`${apiUrl}/reviews/total.json?brand=cocoandeve&signature=${signature}`).then((data) => data.json()).then((r) => {
		setTotalReviews(r?.response?.total_reviews?.toLocaleString());
	});

	return (
		<section className="text-center section-services-list">
			<div className="container mt-1">
				<ul className="list-unstyled flex flex-wrap lg:items-center justify-center pt-1 pb-1 pl-0 lg:mx-5 mb-0 lg:mb-4 md:pt-3 md:pb-3">
					{SERVICES.map((list, i) => {
						return (
							<li key={i} className={`w-1/3 md:w-1/6 mb-4 lg:mb-0 ${i == 1 ? 'px-0' : 'px-g sm:px-hg'}`}>
								<i className="inline-flex flex-wrap h1 mb-2">
									{list.id === 'stars' && <Stars className="text-body" />}
									{list.id === 'winner-award' && <WinnerAward className="text-body" />}
									{list.id === 'money-back' && <MoneyBack className="text-body" />}
								</i>
								{list.id === 'stars' ? (
									<p className={`title text-base mb-0 ${props.className ?? ''}`}>{list.label.split('<br>').map((item) => (
										<span key={`${item}-services`} dangerouslySetInnerHTML={{ __html: item.replace('__ratings__', totalReviews) + '<br />' }}></span>
									))}</p>
								) : (
									<p className={`title text-base mb-0 ${props.className ?? ''}`}>{list.label.split('<br>').map((item) => (
										<span key={`${item}-services`} dangerouslySetInnerHTML={{ __html: item + '<br />' }}></span>
									))}</p>
								)}
								
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
};

export default Service;
