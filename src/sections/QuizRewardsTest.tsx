import Stars from '~/images/icons/two-line-stars.svg';
import WinnerAward from '~/images/icons/winner-award.svg';
import MoneyBack from '~/images/icons/moneyback.svg';
import MoneyBackPounds from '~/images/icons/moneyback-pounds.svg';
import MoneyBackEur from '~/images/icons/moneyback-eur.svg';
import React, { useState, useEffect } from 'react';
import {
	encryptParam,
} from '~/modules/utils_v2';
const QuizRewardTest = (props: any) => {
	const { store } = props;
    const [totalReviews, setTotalReviews] = useState(null);
	const apiUrl = 'https://reviews-api.cocoandeve.com/api';
	const SERVICES = [
		
		{ id: 'winner-award', label: 'Award-winning <br>Beauty'},
		{ id: 'money-back', label: 'Money back <br>guarantee'},
        { id: 'stars', label: `__ratings__ stars <br class="hidden lg:block"> <span class="hidden lg:inline">Customer</span> Reviews`},
	];

	useEffect(() => {
		const signature = encryptParam(`{brand:'cocoandeve',time:${new Date().getTime()}}`);
		fetch(`${apiUrl}/reviews/total.json?brand=cocoandeve&signature=${signature}`).then((data) => data.json()).then((r) => {
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
		<section className="container text-center mt-4 lg:mt-5 mb-1 lg:mb-0">
			<p className="text-xl lg:text-2xl mb-g lg:mb-3 font-bold">Discover more</p>
			<div className="flex flex-wrap -mx-hg lg:-mx-g justify-center">
				<figure className="w-full lg:w-1/3 px-g mb-g lg:mb-0 block relative">
                    <a href="/pages/self-tan-quiz">
                        <picture className="block">
                            <source srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2569ea0a-b963-411d-7320-1bab3cd77000/public" media="(min-width: 992px)" />
                            <img className="w-full rounded-[24px] lg:rounded-[32px]" src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d336dfd0-5036-429d-18bb-fef66ee83500/public" loading="lazy" alt="Illustration of a person taking a quiz to find their perfect self-tan solution" />
                        </picture>
                        <figcaption className="absolute left-[5em] top-2/4 lg:top-0 lg:left-0 lg:right-0 -translate-y-1/2 lg:transform-none text-left lg:text-center px-g lg:px-0 lg:mt-4 lg:pt-1 pb-0 lg:pb-0 w-[75%] lg:w-full items-center [flex-flow:column] justify-center">
                            <p className="lg:text-xl mb-0 lg:mb-25 font-bold text-body w-full">Tan Quiz</p>
                            <p className="hidden lg:block text-sm lg:text-base mb-g lg:mb-1 text-body">Find the perfect solution for your <br className="hidden lg:block"/>skin’s needs in just a few steps</p>
                            {/* <a href="/pages/self-tan-quiz" className="inline-block align-middle text-center select-none border py-1 px-3 leading-normal no-underline bg-primary text-white hover:primary-dark hover:text-white hover:no-underline rounded-full lg:py-g lg:px-5 font-bold">Take the Quiz</a> */}
                            <span className="hidden lg:inline-block align-middle text-center select-none border border-primary py-1 px-3 leading-normal no-underline bg-primary text-white hover:primary-dark hover:text-white hover:no-underline rounded-full lg:py-[7px] lg:px-[28px] min-w-[157px]">Take the Quiz</span>
                            <svg className="lg:hidden absolute right-[24px] -translate-y-1/2 top-2/4" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" fill="white"></rect><rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" stroke="#D62E55"></rect><path d="M13.269 11.0793L18.9258 16.7362L13.269 22.393L14.4004 23.5244L21.1886 16.7362L14.4004 9.94796L13.269 11.0793Z" fill="#D62E55" stroke="#D62E55"></path></svg>
                        </figcaption>
                    </a>
				</figure>
				{store !== 'my' && (
					<figure className="w-full lg:w-1/3 px-g mb-g lg:mb-0 block relative rounded">
                        <a href="/pages/rewards">
                            <picture className="block">
                                <source srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/704453dd-6f76-4a3a-1c09-c72dc47c5d00/public" media="(min-width: 992px)" />
                                <img className="w-full rounded-[24px] lg:rounded-[32px]" src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/66f96d20-d935-4759-f5d2-e0fc56748700/public" loading="lazy" alt="Graphic showing the rewards program details, including points and free products" />
                            </picture>
                            <figcaption className="absolute left-[5em] top-2/4 lg:top-0 lg:left-0 lg:right-0 -translate-y-1/2 lg:transform-none text-left lg:text-center px-g lg:px-0 lg:mt-4 lg:pt-1 pb-0 lg:pb-0 w-[75%] lg:w-full items-center [flex-flow:column] justify-center">
                                <p className="lg:text-xl mb-0 lg:mb-25 font-bold text-body">Rewards Program</p>
                                <p className="hidden lg:block text-sm lg:text-base mb-g lg:mb-1 text-body">Sign up for our reward program and <br className="hidden lg:block"/>stack up your points for free product</p>
                                {/* <a href="/pages/rewards" className="inline-block align-middle text-center select-none border py-1 px-3 leading-normal no-underline bg-primary text-white hover:primary-dark hover:text-white hover:no-underline rounded-full lg:py-g lg:px-5 font-bold">Join Now</a> */}
                                <span className="hidden lg:inline-block align-middle text-center select-none border border-primary py-1 px-3 leading-normal no-underline bg-primary text-white hover:primary-dark hover:text-white hover:no-underline rounded-full lg:py-[7px] lg:px-[28px] min-w-[157px]">Join Now</span>
                                <svg className="lg:hidden absolute right-[24px] -translate-y-1/2 top-2/4" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" fill="white"></rect><rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" stroke="#D62E55"></rect><path d="M13.269 11.0793L18.9258 16.7362L13.269 22.393L14.4004 23.5244L21.1886 16.7362L14.4004 9.94796L13.269 11.0793Z" fill="#D62E55" stroke="#D62E55"></path></svg>
                            </figcaption>
                        </a>
					</figure>
				)}

                <div className="w-full lg:w-1/3 px-g mb-g lg:mb-0 block relative]">
                    <div className="w-full lg:max-h-[290px] bg-gray-100 rounded-[24px] lg:rounded-[32px] text-left lg:text-center px-0 lg:py-4 py-1 w-[75%] lg:w-full items-center [flex-flow:column] justify-center">
                        <p className="hidden lg:block lg:text-xl mb-0 lg:mb-2 font-bold text-body w-full">Beauty Confidence</p>
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
			</div>
		</section>
	)
}

export default QuizRewardTest;
