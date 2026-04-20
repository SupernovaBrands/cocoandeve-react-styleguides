const SpfQuizBanner = (props) => {
    return (
        <a className="text-body hover:text-body hover:no-underline mb-3 lg:mb-4 block" href={'/pages/self-spf-quiz'}>
            <div className="relative flex bg-yellow-light items-center justify-between">
                <div className="flex items-center relative">
                    <picture className="m-0 h-full aspect-[345/56] lg:aspect-[470/64]">
                        <source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/SPF_Quiz_pdp2_dt_940x.jpg?v=1776682301" media="(min-width: 992px)" width={470} height={64} />
                        <img alt="Tan Quiz" className="w-full" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/SPF_Quiz_pdp2_mb_690x.jpg?v=1776682301" loading="lazy" width={345} height={56} />
                    </picture>
                    <div className="flex absolute left-[4.75rem] top-[50%] -translate-y-[50%] lg:left-2 items-center gap-[.25rem] lg:gap-[.5rem]">
                        <strong className={`text-base !leading-[normal] lg:text-lg ${props.platform === 'os-mac' || props.platform === 'os-ios' ? 'relative top-[1px]' : ''} ${props.platform === 'os-android' ? 'relative top-[1.5px]' : ''}`}>Take the SPF Quiz</strong>
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

export default SpfQuizBanner;