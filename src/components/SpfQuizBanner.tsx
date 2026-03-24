const SpfQuizBanner = (props) => {
    return (
        <a className="text-body hover:text-body hover:no-underline block" href="/pages/self-spf-quiz">
            <div className="mb-3 lg:mb-2">
                <div className="relative">
                    <picture className="m-0 h-full lg:order-2">
                        <source width={470} height={79} srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/spf_pdp_d_x79.jpg?v=1774335487" media="(min-width: 992px)" />
                        <img width={360} height={67} alt="Tan Quiz" className="rounded-[1.5rem] lg:rounded-[2rem] w-full" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/spf_pdp_m.jpg?v=1774335486" loading="lazy" />
                    </picture>

                    {/* <div className="lg:order-1 ml-g lg:ml-2">
                        <p className="font-bold lg:mb-25 lg:text-lg" dangerouslySetInnerHTML={{__html: `Tan Quiz<span class="lg:hidden block font-normal text-sm">Find your perfect shade</span>`}} />
                        <div className="hidden lg:block text-sm">Find the perfect shade to match <br />your skin’s needs in 3 minutes!</div>
                    </div> */}
                    <span className="inline-block hover:no-underline text-body absolute left-[5rem] lg:left-[1.25rem] top-[50%] -translate-y-[50%]">
                        <span className="text-base block font-bold leading-[20px]">SPF Quiz</span>
                        <span className="hidden lg:block pt-[.25rem] text-sm leading-[18px]">Match your skin to the right SPF</span>
                    </span>
                    <svg className="lg:hidden absolute right-[1.5rem] top-[50%] -translate-y-[50%]" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" fill="white"/>
                        <rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" stroke="#D62E55"/>
                        <path d="M13.269 11.0793L18.9258 16.7362L13.269 22.393L14.4004 23.5244L21.1886 16.7362L14.4004 9.94796L13.269 11.0793Z" fill="#D62E55" stroke="#D62E55"/>
                    </svg>
                    <span className="btn btn-outline-primary hidden lg:inline-block absolute right-[1.25rem] top-[50%] -translate-y-[50%] rounded-none hover:bg-white hover:text-primary">Take the Quiz</span>
                </div>
                
            </div>
        </a>
    );
};

export default SpfQuizBanner;