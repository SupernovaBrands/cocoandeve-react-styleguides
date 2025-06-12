const PdpBanner = (props: any) => {
    const { className, url, imgDt, imgMb, title, description, ctaLabel, imgAlt } = props;
    return (
    <figure className={className ?? ''}>
        <a href={url}>
            <picture className="block">
                <source srcSet={imgDt} media="(min-width: 992px)" />
                <img className="w-full rounded-[24px] lg:rounded-[32px]" src={imgMb} loading="lazy" alt={imgAlt ?? ''} />
            </picture>
            <figcaption className="absolute left-[5em] top-2/4 lg:top-[50%] lg:left-2 lg:right-0 -translate-y-1/2 text-left pl-25 pr-g lg:px-0 lg:mt-0 lg:pt-0 pb-0 lg:pb-0 w-[75%] lg:w-full items-center [flex-flow:column] justify-center">
                <p className="-ml-g lg:text-lg mb-0 lg:ml-0 lg:mb-25 font-bold text-body w-full">{title}</p>
                <p className="hidden lg:block text-sm lg:text-sm mb-g lg:mb-0 text-body"
                    dangerouslySetInnerHTML={{
                        __html: description,
                    }}
                />
                <svg className="lg:hidden absolute right-g -translate-y-1/2 top-2/4" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" fill="white"></rect><rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" stroke="#D62E55"></rect><path d="M13.269 11.0793L18.9258 16.7362L13.269 22.393L14.4004 23.5244L21.1886 16.7362L14.4004 9.94796L13.269 11.0793Z" fill="#D62E55" stroke="#D62E55"></path></svg>
            </figcaption>
            <span className="hidden top-[50%] -translate-y-1/2 lg:inline-block hover:no-underline rounded-full bg-white text-primary text-base py-[0.5rem] px-[1.65625em] border border-[2px] border-primary font-bold absolute right-2 lg:min-w-[157px] text-center">{ctaLabel}</span>
        </a>
	</figure>
)
};

export default PdpBanner;