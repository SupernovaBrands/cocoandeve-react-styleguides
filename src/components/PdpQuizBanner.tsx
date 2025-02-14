const PdpQuizBanner = (props) => {
    return (
        <a className="text-body hover:text-body hover:no-underline" href={props.quizCard.pdp_quiz_card_cta_url}>
            <div className="relative mb-3 lg:mb-2 flex max-h-[64px] lg:min-h-[97px] rounded-[24px] lg:rounded-[32px] bg-yellow-light items-center justify-between pr-2">
                <div className="flex items-center">
                    <picture className="m-0 h-full rounded-l-[24px] lg:rounded-r-[32px] lg:order-2 lg:absolute lg:right-0 lg:top-0 lg:bottom-0">
                        <source srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/36224cd9-a27f-4723-de76-688622b56300/public" media="(min-width: 992px)" />
                        <img alt="Tan Quiz" className="rounded-l-[24px] lg:rounded-r-[32px] w-auto h-[64px] lg:h-[97px]" src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d0ba3105-a067-4e7e-1d63-5164a5abad00/86x" loading="lazy" />
                    </picture>
                    
                    <div className="lg:order-1 ml-g lg:ml-2">
                        <p className="font-bold lg:mb-25 lg:text-lg" dangerouslySetInnerHTML={{__html: `Tan Quiz`}} />
                        <div className="hidden lg:block text-sm">Find the perfect solution for your skin’s <br /> needs in just a few steps</div>
                    </div>
                    <span className="hidden lg:inline-block hover:no-underline px-g rounded-full bg-white text-primary text-base py-[0.5rem] px-[1.65625em] border border-[2px] border-primary font-bold absolute right-2">Take the Quiz</span>
                </div>
                <svg className="lg:hidden" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" fill="white"/>
                    <rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" stroke="#D62E55"/>
                    <path d="M13.269 11.0793L18.9258 16.7362L13.269 22.393L14.4004 23.5244L21.1886 16.7362L14.4004 9.94796L13.269 11.0793Z" fill="#D62E55" stroke="#D62E55"/>
                </svg>
            </div>
        </a>
    );
};

export default PdpQuizBanner;