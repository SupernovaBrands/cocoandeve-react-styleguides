import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import { useEffect, useState, useCallback } from 'react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import useEmblaCarousel from 'embla-carousel-react';
import { DotButton, useDotButton } from '~/components/carousel/EmblaCarouselDotButton';
import {
	PrevButton,
	NextButton,
} from '~/components/carousel/EmblaCarouselArrowButtons';
import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';

const options: EmblaOptionsType = {
    loop: false,
};

const options2: EmblaOptionsType = {
    loop: true,
};

const ConditionalWrap = ({condition, wrap, children}) => condition ? wrap(children) : children;

const ImageFigure = (props: any) => (
    <ConditionalWrap
        condition={props.handle}
        wrap={children => <a href={`/products/${props.handle}`} className={`${props.className ?? ''} lg:h-full`}>{children}</a>}
        >
        <figure className={`bg-pink-light text-body text-center rounded pt-[1.5rem] pb-[.813rem] lg:pb-0 lg:h-full lg:pt-4 ${props.className ?? ''}`}>
            <figcaption className="font-bold px-g min-h-[3rem] lg:min-h-3 flex items-center justify-center pb-[.5rem] lg:pb-0">{props.title}</figcaption>
            <picture className="block px-[2.031rem] lg:mt-4 lg:px-0">
                <source srcSet={props.srcSet} media="(min-width: 992px)" />
                <img src={props.src} className="bg-pink-light w-full" alt="" loading="lazy" />
            </picture>
        </figure>
    </ConditionalWrap>
);

const ImageTableCard = (props: any) => {
    return (
        <div className="pl-0 pr-g w-[17.813rem] basis-[17.813rem] grow-0 shrink-0 lg:flex-1 lg:w-3/12 lg:basis-3/12 lg:px-g">
            <ImageFigure {...props} />
            {props.tableData && props.tableData.length > 0 && <ComparisonTable compare1={props.tableData} compare2={props.tableData} dataSource={'mobile2'} />}
        </div>
    )
};

const ComparisonTable = (props: any) => {
    const { compare1, compare2, dataSource } = props;
    return compare1.length > 0 && compare2.length > 0 && (
        <div className="w-full basis-full flex-grow-0 flex-shrink-0 pl-0 mt-[1rem] lg:mt-0 lg:flex-1 lg:basis-6/12 lg:px-g lg:min-h-[27.5rem]">
            {compare1.map((data, i , row) => {
                return (
                    <div key={`table-display-${i}`}>
                        <div className="flex lg:flex-wrap lg:-mx-g lg:px-g">
                            <div className="text-sm w-[6rem] basis-[6rem] font-bold grow-0 shrink-0 lg:text-base lg:w-1/3 lg:basis-1/3 lg:text-center lg:order-2">{data.title}</div>
                            <div className="text-[.875rem] leading-[1.125rem] px-g lg:px-0 lg:w-1/3 lg:text-base lg:basis-1/3 lg:text-center lg:order-1">{data.value}</div>
                            <div className="lg:w-1/3 lg:basis-1/3 lg:text-center hidden lg:block lg:order-3">{compare2[i].value}</div>
                        </div>
                        {i + 1 !== row.length && <hr className="border-gray-500 block my-g lg:my-[.906rem]" />}
                    </div>
                );
            })}
        </div>
    )
};

const ProductComparison = (props: any) => {
    const { mainCompare, productsCompare, view, wrapperClass } = props;
    const INIT_FINALS = [...[mainCompare], ...productsCompare];

    console.log('mainCompare', mainCompare);

    const [comparison1, setComparison1] = useState(mainCompare?.tableData || []);
    const [comparison2, setComparison2] = useState(productsCompare[0]?.tableData || []);
    const [scrollProgress, setScrollProgress] = useState(0);

    const [emblaRef1, emblaApi1] = useEmblaCarousel({ align: 'start', ...options});
    const [emblaRef2, emblaApi2] = useEmblaCarousel({ align: 'start', ...options2});

    const onScroll = useCallback((emblaApi1: EmblaCarouselType) => {
		setScrollProgress(((1 / INIT_FINALS.length) * 100) * emblaApi1.selectedScrollSnap());
	}, []);

    const onScroll2 = useCallback((emblaApi2: EmblaCarouselType) => {
        const itemSel = emblaApi2.selectedScrollSnap();
        setComparison2(INIT_FINALS[itemSel + 1]?.tableData || []);
	}, []);

    const { selectedIndex: idx3, onDotButtonClick: onClick3 } = useDotButton(emblaApi2);

    useEffect(() => {
		if (emblaApi1) {
            emblaApi1.on('reInit', onScroll);
		    emblaApi1.on('scroll', onScroll);
        }
        if (emblaApi2) {
            emblaApi2.on('reInit', onScroll2);
		    emblaApi2.on('scroll', onScroll2);
            emblaApi2.on('select', () => {
                if (!emblaApi2) return;
                const itemSel = emblaApi2.selectedScrollSnap();
                setComparison2(productsCompare[itemSel]?.tableData || []);
            })
        }
	}, [emblaApi1, onScroll, emblaApi2, onScroll2]);

    let title = 'Haircare Range';
    const MASKS = [
        'super-nourishing-coconut-fig-hair-masque',
        'repairing-restoring-hair-mask',
        'pro-youth-hair-scalp-mask'
    ];
    const SHAMPOO = [
        'super-hydrating-shampoo',
        'sweet-repair-repairing-restoring-shampoo',
        'pro-youth-shampoo',
        'hair-volumising-shampoo',
        'clarifying-detox-shampoo',
    ];
    const CONDITIONER = [
        'super-hydrating-cream-conditioner',
        'sweet-repair-repairing-restoring-conditioner',
        'pro-youth-conditioner',
        'hair-volumising-conditioner',
    ];
    const SHAMPOO_CONDITIONER = [
        'super-hydrating-shampoo-conditioner-set',
        'repair-restore-shampoo-conditioner-set',
        'pro-youth-shampoo-conditioner',
        'hair-volumising-shampoo-conditioner-set',
    ];
    if (MASKS.includes(mainCompare?.handle)) {
        title = 'Which Hair Mask is for Me?';
    } else if (SHAMPOO.includes(mainCompare?.handle)) {
        title = 'Which Shampoo is for Me?';
    } else if (CONDITIONER.includes(mainCompare?.handle)) {
        title = 'Which Conditioner is for Me?';
    } else if (SHAMPOO_CONDITIONER.includes(mainCompare?.handle)) {
        title = 'Which Shampoo & Conditioner is for Me?';
    }

    return INIT_FINALS.length > 0 && mainCompare.enabled && (
        <>
            <div className={`w-full justify-center px-0 order-2 lg:order-0 ${wrapperClass ?? ''}`}>
                <p className={`text-lg lg:text-2xl font-bold text-center mb-2 lg:mb-3 ${view === 'mobile' ? 'lg:hidden' : 'hidden lg:block'}`}>{title}</p>
                {/* mobile */}
                {view === 'mobile' && (
                    <div className={`lg:hidden mb-3 lg:mb-[5rem] -mr-g lg:mx-0 ${INIT_FINALS?.length <= 2 ? 'flex' : ''}`}>
                        <Carousel.Wrapper emblaApi={emblaApi1} className={''}>
                            <Carousel.Inner emblaRef={emblaRef1} innerClass={'pr-0'} className={'mx-0'}>
                                {INIT_FINALS?.length > 0 && INIT_FINALS.map((data: any, index: number) => {
                                    return <ImageTableCard
                                        key={`comparison-img-card-${index}`}
                                        src={data.src}
                                        srcSet={data.src}
                                        title={data.title}
                                        tableData={data.tableData}
                                        handle={index > 0 ? data.handle : false}
                                    />
                                })}
                            </Carousel.Inner>
                        </Carousel.Wrapper>

                        {INIT_FINALS.length > 2 && (
                            <div className="px-g">
                                <div className="carousel__progress bg-gray-400">
                                    <div
                                        draggable="true"
                                        className="carousel__progress--scroll bg-gray-500"
                                        style={{ left: `${scrollProgress}%`, width: `${((1 / INIT_FINALS.length) * 100)}%` }} />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* desktop */}
                {view === 'desktop' && (
                    <div className="container hidden lg:block">
                        <div className="-mx-g">
                            <div className="flex w-full">
                                <ImageTableCard
                                    src={INIT_FINALS[0].src}
                                    srcSet={INIT_FINALS[0].src}
                                    title={INIT_FINALS[0].title}
                                />
                                <ComparisonTable compare1={comparison1} compare2={comparison2} dataSource={'desktop'} />
                                <Carousel.Wrapper emblaApi={emblaApi2} className={'lg:flex-1 lg:w-3/12 lg:basis-3/12 lg:px-g'}>
                                    <Carousel.Inner emblaRef={emblaRef2} innerClass={'bg-pink-light rounded h-full'} className={'lg:h-full'}>
                                        {INIT_FINALS.slice(1).map((data, index) => (
                                            <ImageFigure
                                                key={`img-figure-dt-${index}`}
                                                src={data.src}
                                                srcSet={data.src}
                                                title={data.title}
                                                handle={data.handle}
                                                className="w-full basis-full flex-grow-0 flex-shrink-0" />
                                        ))}
                                    </Carousel.Inner>
                                    <Carousel.Navigation>
                                        {INIT_FINALS.slice(1).length > 1 && (
                                            <>
                                                <PrevButton
                                                    onClick={() => emblaApi2.scrollPrev() }
                                                    className="lg:w-auto lg:h-full hidden lg:flex"
                                                >
                                                    <span className="absolute z-[-1] -left-hg flex justify-center items-center w-[2.75rem] h-[2.75rem] shadow-lg rounded-full bg-white">
                                                        <ChevronPrev className="svg--current-color w-[1rem] h-[1rem]" />
                                                    </span>
                                                </PrevButton>
                                                <NextButton
                                                    onClick={() => emblaApi2.scrollNext() }
                                                    className="lg:w-auto lg:h-full hidden lg:flex"
                                                >
                                                    <span className="absolute z-[-1] -right-hg flex justify-center items-center w-[2.75rem] h-[2.75rem] shadow-lg rounded-full bg-white">
                                                        <ChevronNext className="svg--current-color w-[1rem] h-[1rem]" />
                                                    </span>
                                                </NextButton>
                                                <ol className="carousel__dots justify-center static mt-[.5rem] mb-0">
                                                    {INIT_FINALS.slice(1).map((_, index) => (
                                                        <li key={`compare-nav-${index}`} className={`bg-primary ${index === idx3 ? ' opacity-1' : ' opacity-60'} !h-[1rem] !w-[1rem]`}>
                                                            <DotButton
                                                                onClick={() => onClick3(index)}
                                                                className="carousel__dot"
                                                                aria-label={`Go to slide ${index + 1}`}
                                                            />
                                                        </li>
                                                    ))}
                                                </ol>
                                            </>
                                        )}
                                    </Carousel.Navigation>
                                </Carousel.Wrapper>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
	);
};

export default ProductComparison;