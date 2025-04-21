import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import PostCard from "~/compounds/PostCard";
import { useEffect, useState, useCallback } from 'react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import CarouselScrollbar from '~/components/carousel/CarouselScrollbar';

const options: EmblaOptionsType = {
	loop: false,
    dragFree: true,
};

const WithCarousel = ({carousel, children, emblaApi1, emblaRef1}) => (carousel ? 
    <Carousel.Wrapper emblaApi={emblaApi1} className={'-mr-g lg:mr-0'}>
        <Carousel.Inner emblaRef={emblaRef1} className="">
            {children}
        </Carousel.Inner>
    </Carousel.Wrapper>
    : children
)

const SideArticleCarousel = (props: any) => {
    const { articleCarousel } = props;
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

	return articleCarousel.length > 0 && (
        <>
        <div className="product-side-article lg:pb-0 pt-0">
            <div className="w-full justify-center px-0">
                <div className={`mx-0 ${articleCarousel?.length <= 1 ? 'flex' : ''}`}>
                    <WithCarousel carousel={articleCarousel?.length > 1} emblaApi1={emblaApi1} emblaRef1={emblaRef1}>
                        {articleCarousel.map((data:any, index:number, row: any) => {
                            const isLast = index + 1 === row.length;
                            return (
                                <PostCard
                                    key={`${data.id}-${index}`} carousel={true} template="pdp"
                                    className={`product__side-article flex-grow-0 flex-shrink-0 basis-[335px] w-[335px] ${isLast ? '' : 'pr-hg lg:pr-g'} lg:w-[80%] lg:basis-[80%]`} data={data} />
                            )
                        })}
                    </WithCarousel>

                    {articleCarousel.length > 1 && (
                        <CarouselScrollbar
                            emblaApi={emblaApi1}
                            scrollSnaps={emblaApi1?.scrollSnapList()}
                            className="py-2 lg:py-g after:bg-gray-500 after:rounded-[2px]"
                        />
                    )}
                    {/*                     
                    {articleCarousel.length > 1 && (
                        <div className="px-0 pr-g">
                            <div className="carousel__progress bg-gray-400 my-2 lg:my-g lg:!pr-0">
                                <div
                                    className="carousel__progress--scroll bg-gray-500"
                                    style={{ left: `${scrollProgress}%`, width: `${((1 / articleCarousel.length) * 100) + 2.5}%` }} />
                            </div>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    </>
	);
};

export default SideArticleCarousel;
