import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import { useEffect, useState, useCallback } from 'react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const options: EmblaOptionsType = {
	loop: false,
    dragFree: true,
};

const SingleCard = ({handle, url, title, isLast, additionalTitle}) => {
    return (
        <figure className={`${isLast ? '' : 'mr-g'} grow-0 shrink-0 w-[140px] basis-[140px] flex flex-col rounded lg:rounded-[32px] bg-pink-product`}>
            <a href={handle}>
                {url && (
                    <picture>
                        <source srcSet={url.replace('public', '320x')} media="(min-width: 992px)" />
                        <img src={url.replace('public', '320x')} alt="Singlecard" className="w-full rounded lg:rounded-[32px]" />
                    </picture>
                )}
                <figcaption className="text-body text-center p-25 lg:pt-1 lg:pb-g text-[0.875rem] leading-[1.094rem] lg:text-sm">
                    {title}
                    {additionalTitle && <br />}
                    {additionalTitle && (`(${additionalTitle})`)}
                </figcaption>
            </a>
        </figure>
    );
};

const WithCarousel = ({carousel, children, emblaApi1, emblaRef1}) => (carousel ? 
    <Carousel.Wrapper emblaApi={emblaApi1}>
        <Carousel.Inner emblaRef={emblaRef1} className="">
            {children}
        </Carousel.Inner>
    </Carousel.Wrapper>
    : children
)

const SideWhatsInBundle = (props: any) => {
    const { bundleItems } = props;
    const [scrollProgress, setScrollProgress] = useState(0);

	const [emblaRef1, emblaApi1] = useEmblaCarousel({ align: 'start', ...options}, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);

    const onScroll = useCallback((emblaApi1: EmblaCarouselType) => {
		const progress = Math.max(0, Math.min(1, emblaApi1.scrollProgress()));
		setScrollProgress(progress * 70);
	}, []);

    useEffect(() => {
		if (!emblaApi1) return;
		emblaApi1.on('reInit', onScroll);
		emblaApi1.on('scroll', onScroll);
	}, [emblaApi1, onScroll]);

    // console.log('articleCarousel', articleCarousel);

	return bundleItems.length > 0 && (
        <>
        <div className="product-side-article lg:pb-1 pt-0 md:pt-2 mb-2">
            <p className="font-bold mb-1 lg:text-lg">What's in the bundle?</p>
            <div className="w-full justify-center px-0">
                <div className={`mx-0 ${bundleItems?.length <= 2 ? 'flex' : ''}`}>
                    <WithCarousel carousel={bundleItems?.length > 2} emblaApi1={emblaApi1} emblaRef1={emblaRef1}>
                        {bundleItems.map((data:any, index:number, row: any) => {
                            const isLast = index + 1 === row.length ? true : false;
                            const { product, size } = data;
                            return product.images.length > 0 && <SingleCard key={`bundle-itmes--${index}`} additionalTitle={size} handle={product.handle} url={product.images[0].url} title={product.title} isLast={isLast} />
                        })}
                    </WithCarousel>
                    
                    <div className={`px-0 ${bundleItems.length > 2 ? `block ${bundleItems.length > 3 ? '' : 'lg:hidden'}` : 'hidden'} ${bundleItems.length > 3 ? 'block lg:block' : ''} `}>
                        <div className="carousel__progress bg-gray-400">
                            <div
                                className="carousel__progress--scroll bg-gray-500"
                                style={{ left: `${scrollProgress}%`, width: `${((1 / bundleItems.length) * 100) + 2.5}%` }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
	);
};

export default SideWhatsInBundle;
