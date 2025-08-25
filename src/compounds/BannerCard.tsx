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
    abtestProductCard?: any
}

const BannerCard: React.FC<BannerCardProps> = ({ className, url, imgDt, imgMb, title, description, ctaLabel, imgAlt, store, children = null, abtestProductCard }) => (
	<figure className={className ?? ''}>
        <a href={url}>
            <picture className="block">
                <source srcSet={imgDt} media="(min-width: 992px)" />
                <img className="w-full rounded-[24px] lg:rounded-[32px]" src={imgMb} loading="lazy" alt={imgAlt ?? ''} />
            </picture>
            {children ?? <></>}
            {!children && (
                <figcaption className={`absolute left-[5em] top-2/4 lg:top-0 lg:left-0 lg:right-0 -translate-y-1/2 lg:transform-none text-left lg:text-center pl-25 pr-g lg:px-0 lg:pt-0 pb-0 lg:pb-0 w-[75%] lg:w-full items-center [flex-flow:column] justify-center ${abtestProductCard === 'origin' ? 'lg:mt-4' : 'lg:mt-1'}`}>
                    {title && <p className={`lg:text-xl mb-0 lg:mb-25 font-bold text-body w-full ${abtestProductCard !== 'origin' ? 'lg:!text-sm' : ''}`}>{title}</p>}
                    {description && (
                        <p className={`hidden lg:block text-sm lg:text-base mb-g lg:mb-1 text-body ${abtestProductCard !== 'origin' ? 'lg:!text-xs' : ''}`}
                            dangerouslySetInnerHTML={{
                                __html: ['us'].includes(store) ? description.replace('colour', 'color') : description,
                            }}
                        />
                    )}
                    {ctaLabel && (
                        <span className={`hidden lg:inline-block align-middle text-center select-none border border-primary py-1 px-3 leading-normal no-underline bg-primary text-white hover:primary-dark hover:text-white hover:no-underline rounded-full lg:py-[7px] lg:px-[28px] min-w-[157px] ${abtestProductCard === 'origin' ? '' : 'lg:!text-sm'}`}>
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
