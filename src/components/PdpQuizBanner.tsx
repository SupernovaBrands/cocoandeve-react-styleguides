const PdpQuizBanner = (props) => {
    return (
        <a className="text-body hover:text-body hover:no-underline pb-3 lg:pb-4 block" href={props.quizCard.pdp_quiz_card_cta_url}>
            <div className="relative flex bg-yellow-light items-center justify-between">
                <div className="flex items-center relative">
                    <picture className="m-0 h-full">
                        <source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/quiz-banner-dt-v2_940x.jpg?v=1772086733" media="(min-width: 992px)" />
                        <img alt="Tan Quiz" className="w-full" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/quiz-banner-mb-v2_690x.jpg?v=1772086733" loading="lazy" />
                    </picture>
                    <div className="flex absolute left-[1rem] top-[50%] -translate-y-[50%] lg:left-2 items-center gap-[.25rem] lg:gap-[.5rem]">
                        <strong className="text-base !leading-[normal] lg:text-lg">Take the Tan Quiz</strong>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M13.269 11.0796L18.9258 16.7364L13.269 22.3933L14.4004 23.5247L21.1886 16.7364L14.4004 9.94821L13.269 11.0796Z" fill="#151515" stroke="#151515"/>
                        </svg>
                    </div>
                    
                    {/* <div className="lg:order-1 ml-g lg:ml-2">
                        <p className="font-bold lg:mb-25 lg:text-lg" dangerouslySetInnerHTML={{__html: `Take the Tan Quiz`}} />
                        <div className="hidden lg:block text-sm">Find the perfect shade to match <br />your skin’s needs in 3 minutes!</div>
                    </div> */}
                    {/* <span className="hidden lg:inline-block hover:no-underline rounded-full bg-white text-primary text-base py-[0.5rem] px-[1.65625em] border border-[2px] border-primary font-bold absolute right-2">Take the Quiz</span> */}
                </div>
                {/* <svg className="lg:hidden" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" fill="white"/>
                    <rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" stroke="#D62E55"/>
                    <path d="M13.269 11.0793L18.9258 16.7362L13.269 22.393L14.4004 23.5244L21.1886 16.7362L14.4004 9.94796L13.269 11.0793Z" fill="#D62E55" stroke="#D62E55"/>
                </svg> */}
            </div>
        </a>
    );
};

export default PdpQuizBanner;