import Stars from '~/images/icons/two-line-stars.svg';
import WinnerAward from '~/images/icons/winner-award.svg';
import MoneyBack from '~/images/icons/moneyback.svg';
import MoneyBackPounds from '~/images/icons/moneyback-pounds.svg';
import MoneyBackEur from '~/images/icons/moneyback-eur.svg';
import React, { useState, useEffect } from 'react';
import {
	encryptParam,
} from '~/modules/utils_v2';
const BeautyConfidence = (props) => {
    const [totalReviews, setTotalReviews] = useState(null);
    const apiUrl = 'https://reviews-api.cocoandeve.com/api';
	const SERVICES = [

		{ id: 'winner-award', label: 'Award-winning <br>Beauty'},
		{ id: 'money-back', label: 'Money back <br>guarantee'},
        { id: 'stars', label: `__ratings__ stars <br class="hidden lg:block"> <span class="hidden lg:inline">Customer</span> Reviews`},
	];

	useEffect(() => {
		const signature = encryptParam(`{brand:'cocoandeve',time:${new Date().getTime()}}`);
		fetch(`${apiUrl}/reviews/total.json?brand=cocoandeve`, {headers: { 'signatuer': signature}}).then((data) => data.json()).then((r) => {
			setTotalReviews(r?.response?.total_reviews?.toLocaleString());
		});
	}, [])

	const moneyBackIcon = (store = 'us') => {
		if (store === 'uk') {
			return <MoneyBackPounds className="text-body" />
		} else if (store === 'eu') {
			return <MoneyBackEur className="text-body" />
		} else {
			return <MoneyBack className="text-body" />
		}
	};

	const icon = moneyBackIcon(props.store);
    return (
        <div className={props.parentClass ?? ''}>
            <div className="w-full lg:max-h-[290px] bg-gray-100 rounded-[24px] lg:rounded-[32px] text-left lg:text-center px-0 lg:py-4 py-1 w-[75%] lg:w-full items-center [flex-flow:column] justify-center beauty-confidence--container">
                <p className="hidden lg:block lg:text-xl mb-0 lg:mb-2 font-bold text-body w-full beauty-confidence--title">Beauty With Confidence</p>
                {/* <p className="hidden lg:block text-sm lg:text-base mb-g lg:mb-1 text-body">Find the perfect solution for your <br className="hidden lg:block"/>skin’s needs in just a few steps</p> */}
                <ul className="list-unstyled flex flex-wrap items-center justify-center">
                    {SERVICES.map((list, i) => {
                        return (
                            <li key={i} className={`text-center w-1/3 md:w-1/2 mb-0 ${i == 1 ? 'px-0' : 'px-g sm:px-hg'}`}>
                                <i className="inline-flex flex-wrap h1 mb-g">
                                    {list.id === 'stars' && <Stars className="text-body" />}
                                    {list.id === 'winner-award' && <WinnerAward className="text-body" />}
                                    {list.id === 'money-back' && <>{icon}</>}
                                </i>
                                {list.id === 'stars' ? (
                                    <>
                                        {totalReviews && (
                                            <p className={`title text-sm lg:text-base mb-0 ${props.className ?? ''}`}>{list.label.split('<br>').map((item) => (
                                                <span key={`${item}-services`} dangerouslySetInnerHTML={{ __html: item.replace('__ratings__', totalReviews) + '<br />' }}></span>
                                            ))}</p>
                                        )}
                                    </>
                                ) : (
                                    <p className={`title text-sm lg:text-base mb-0 ${props.className ?? ''}`}>{list.label.split('<br>').map((item) => (
                                        <span key={`${item}-services`} dangerouslySetInnerHTML={{ __html: item + '<br />' }}></span>
                                    ))}</p>
                                )}
                            </li>
                            );
                    })}
                </ul>
            </div>
		</div>
    );
};

export default BeautyConfidence;