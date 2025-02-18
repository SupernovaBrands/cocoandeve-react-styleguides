import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import { useEffect, useState, useCallback } from 'react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const options: EmblaOptionsType = {
	loop: false,
    dragFree: true,
};

const testData = [
    {
        handle: 'super-hydrating-shampoo',
        url: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/1262e40f-6747-4f65-8416-249281011500/public',
        title: 'Super Hydrating Shampoo',
        additionalTitle: '(9.47oz)'
    },
    {
        handle: 'super-hydrating-cream-conditioner',
        url: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/404db1a0-56d4-4f02-9b50-5d6427d3d000/public',
        title: 'Super Hydrating Cream Conditioner',
        additionalTitle: '(9.47oz)'
    },
];

const SingleCard = ({handle, url, title, isLast, additionalTitle}) => {
    return (
        <figure className={`${isLast ? '' : 'mr-g'} grow-0 shrink-0 w-[140px] basis-[140px] flex flex-col rounded lg:rounded-[32px] bg-pink-product`}>
            <a href={handle}>
                <picture>
                    <source srcSet={url.replace('public', '320x')} media="(min-width: 992px)" />
                    <img src={url.replace('public', '320x')} alt="Singlecard" className="w-full rounded lg:rounded-[32px]" />
                </picture>
                <figcaption className="text-body text-center p-25 lg:pt-1 lg:pb-g text-[0.875rem] leading-[1.094rem] lg:text-sm">
                    {title}
                    <br />
                    {additionalTitle}
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
    // const { articleCarousel } = props;
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

	return testData.length > 0 && (
        <>
        <div className="product-side-article lg:pb-1 pt-0 md:pt-2 mb-2">
            <p className="font-bold mb-1 lg:text-lg">What's in the bundle?</p>
            <div className="w-full justify-center px-0">
                <div className={`mx-0 ${testData?.length <= 2 ? 'flex' : ''}`}>
                    <WithCarousel carousel={testData?.length > 2} emblaApi1={emblaApi1} emblaRef1={emblaRef1}>
                        {testData.map((data:any, index:number, row: any) => {
                            const isLast = index + 1 === row.length ? true : false;
                            return <SingleCard additionalTitle={data.additionalTitle} handle={data.handle} url={data.url} title={data.title} isLast={isLast} />
                        })}
                    </WithCarousel>
                    
                    <div className={`px-0 ${testData.length > 2 ? `block ${testData.length > 3 ? '' : 'lg:hidden'}` : 'hidden'} ${testData.length > 3 ? 'block lg:block' : ''} `}>
                        <div className="carousel__progress bg-gray-400">
                            <div
                                className="carousel__progress--scroll bg-gray-500"
                                style={{ left: `${scrollProgress}%`, width: `${((1 / testData.length) * 100) + 2.5}%` }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
	);
};

export default SideWhatsInBundle;
