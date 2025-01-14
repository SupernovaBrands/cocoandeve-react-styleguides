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
        handle: 'sunny-honey-bali-bronzing-self-tan-mousse',
        url: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/8eddcc0e-5884-40c9-f39d-46ef5b2f5c00/public',
        title: 'Sunny Honey Bali Bronzing Foam',
    },
    {
        handle: 'hypoallergenic-soft-velvet-mitt',
        url: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/b004312e-cb0d-4f7d-7120-732c467d2f00/public',
        title: 'Soft Velvet Tanning Mitt'
    },
    {
        handle: 'deluxe-vegan-kabuki-brush',
        url: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d2c8a91c-eb2d-47ca-cf36-c7591defec00/public',
        title: 'Deluxe Vegan Kabuki Brush'
    },
];

const SingleCard = ({handle, url, title, isLast}) => {
    return (
        <figure className={`${isLast ? '' : 'mr-g'} grow-0 shrink-0 w-[140px] basis-[140px] flex flex-col rounded lg:rounded-[32px] bg-pink-product`}>
            <a href={handle}>
                <picture>
                    <source srcSet={url.replace('public', '320x')} media="(min-width: 992px)" />
                    <img src={url.replace('public', '320x')} alt="Singlecard" className="w-full rounded lg:rounded-[32px]" />
                </picture>
                <figcaption className="text-body text-center p-25 lg:pt-1 lg:pb-g">{title}</figcaption>
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
                <div className={`mx-0 ${testData?.length <= 1 ? 'flex' : ''}`}>
                    <WithCarousel carousel={testData?.length > 1} emblaApi1={emblaApi1} emblaRef1={emblaRef1}>
                        {testData.map((data:any, index:number, row: any) => {
                            const isLast = index + 1 === row.length ? true : false;
                            return <SingleCard handle={data.handle} url={data.url} title={data.title} isLast={isLast} />
                        })}
                    </WithCarousel>
                    
                    <div className={`px-0 ${testData.length > 2 ? 'block lg:hidden' : ''} ${testData.length > 3 ? 'block' : ''} `}>
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
