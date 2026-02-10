import ChevronRight from '~/images/icons/banner-chevron-right.svg';
interface BannerCardProps {
    className: string
    url: string
    imgDt: string
    imgMb: string
    title?: string
    description?: string
    ctaLabel?: string
    imgAlt: string
    store: string
    children?: any
    ctaBgColor?: string
    ctaTextColor?: string
}

const BannerCard: React.FC<BannerCardProps> = ({ className, url, imgDt, imgMb, title, description, ctaLabel, imgAlt, store, children = null, ctaBgColor }) => (
	<figure className={className ?? ''}>
        <a href={url}>
            <picture className="block">
                <source srcSet={imgDt} media="(min-width: 992px)" />
                <img className="w-full rounded-[24px] lg:rounded-[32px]" src={imgMb} loading="lazy" alt={imgAlt ?? ''} width={384} height={72} />
            </picture>
            {children ?? <></>}
            {!children && (
                <figcaption className="absolute left-[5em] top-2/4 lg:top-0 lg:left-0 lg:right-0 -translate-y-1/2 lg:transform-none text-left lg:text-center pl-25 pr-g lg:px-0 lg:mt-4 lg:pt-0 pb-0 lg:pb-0 w-[75%] lg:w-full items-center [flex-flow:column] justify-center">
                    {title && <p className="lg:text-xl mb-0 lg:mb-25 font-bold text-body w-full">{title}</p>}
                    {description && (
                        <p className="hidden lg:block text-sm lg:text-base mb-g lg:mb-1 text-body"
                            dangerouslySetInnerHTML={{
                                __html: ['us'].includes(store) ? description.replace('colour', 'color') : description,
                            }}
                        />
                    )}
                    {ctaLabel && (
                        <span className={`hidden lg:inline-block align-middle text-center select-none border ${ctaBgColor === 'bg-dark' ? 'border-dark bg-dark': 'border-primary bg-primary hover:primary-dark'} py-1 px-3 leading-normal no-underline text-white hover:text-white hover:no-underline rounded-full lg:py-[7px] lg:px-[28px] min-w-[157px]`}>
                            {ctaLabel}
                        </span>
                    )}
                    <ChevronRight className="lg:hidden absolute right-2 -translate-y-1/2 top-2/4" />
                </figcaption>
            )}
        </a>
	</figure>
);

export default BannerCard;
