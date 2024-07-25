import NaturalDha from '~/images/icons/natural-dha.svg';
import Vegan from '~/images/icons/vegan.svg';
import DimethiconeFree from '~/images/icons/dimethicone-free.svg';
import CrueltyFree from '~/images/icons/cruelty-free.svg';
import ToxinFree from '~/images/icons/toxin-free.svg';
import Ethically from '~/images/icons/ethically.svg';
import ParabenFree from '~/images/icons/paraben-free.svg';
import Peta from '~/images/icons/peta.svg';
import Gluten from '~/images/icons/gluten.svg';
import Sulfate from '~/images/icons/natural-dha.svg';
import useEmblaCarousel from 'embla-carousel-react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import { EmblaCarouselType } from 'embla-carousel';

import { useRef, useEffect, useState, useCallback } from 'react';

const iconsData = {
    'natural-dha': <><NaturalDha className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">100% Natural DHA</span></>,
    'sulfate-free': <><Sulfate className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">Sulfate Free</span></>,
    'gluten': <><Gluten className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">Gluten Free</span></>,
    'gluten-free': <><Gluten className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">Gluten Free</span></>,
    'vegan': <><Vegan className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">Vegan</span></>,
    'silicone-free': <><DimethiconeFree className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">Silicone Free</span></>,
    'cruelty-free': <><CrueltyFree className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">Cruelty Free</span></>,
    'toxin-free': <><ToxinFree className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">Toxin-free</span></>,
    'ethically': <><Ethically className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">Ethically Sourced</span></>,
    'paraben-free': <><ParabenFree className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">Paraben Free</span></>,
    'peta': <><Peta className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">Peta Approved</span></>
}

const ProudToBe = (props:any) => {

    const { proudToBe } = props;
    // console.log('proudToBe', proudToBe);
    const proudToBeArr = proudToBe?.split('|') || [];
    // const scrollEl = useRef(null);
    const scrollThumb = useRef(null);
    const [totalSlide, setTotalSlide] = useState(0);
	const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: false, align: 'start', dragFree: false, containScroll: 'keepSnaps' });
	const [scrollProgress, setScrollProgress] = useState(0);

    // const [width, setWidth] = useState('0%');
    // const [left, setLeft] = useState(0);

    // const scrolling = (e:any) => {
    //     const { target } = e;
    //     let subWidth = 0;
    //     target.querySelectorAll('li').forEach((li:any) => subWidth += 40) // li.offsetWidth);
    //     setLeft(e.target.scrollLeft);
    // }

    const onScroll = useCallback((emblaMainApi: EmblaCarouselType) => {
		const progress = Math.max(0, Math.min(1, emblaMainApi.scrollProgress()));
		setScrollProgress(progress * 100 / 2);
	}, []);

    // useEffect(() => {
    //     if (scrollEl && scrollEl.current) {
    //         // if (scrollEl.current.offsetWidth > scrollEl.current.scrollWidth) {
    //             // setWidth(scrollEl.current.offsetWidth);
    //         // } else {
    //             // const w = Math.abs((scrollEl.current.scrollWidth - globalThis.window.innerWidth) / globalThis.window.innerWidth *  100) // (scrollEl.current.scrollWidth - scrollEl.current.offsetWidth));
    //             // setWidth(`${w}%`);
    //         // }
    //     }
    // }, [scrollEl]);

    useEffect(() => {
        let totalSlide = 0;
        proudToBeArr.forEach((proud:any) => {if (proud) { totalSlide += 1}});
        setTotalSlide(totalSlide);
    }, []);

    useEffect(() => {
        if (emblaMainApi) {
            emblaMainApi.on('select', onScroll);
            emblaMainApi.on('reInit', onScroll);
            emblaMainApi.on('scroll', onScroll);
        }
    }, [emblaMainApi]);

    return (
        <div className="proud-to-be-wrapper my-3 lg:mb-0 lg:order-2">
        <h2 className="mb-0">Proud to be</h2>
        <div className="">
                <div className="carousel--scroll position-relative">
                    <div className="main-box overflow-hidden -mx-hg md:-mx-g">
                        <Carousel.Wrapper emblaApi={emblaMainApi}>
	        				<Carousel.Inner emblaRef={emblaMainRef} className="[scrollbar-width:none] carousel-inner flex flex-nowrap row w-auto list-unstyled mt-3 pb-2 md:pb-0 md:mb-1">
                                {proudToBeArr.map((proud:any, index: number) =>{
                                    if (proud) {
                                        return <div key={`${proud}-${index}`} className="flex flex-[0_0_19%] md:flex-[0_0_16.67%] items-center flex-col px-1 carousel-item active">
                                        {iconsData[proud]}
                                        </div>
                                    }
                                    return null;
                                })}
                            </Carousel.Inner>
                        </Carousel.Wrapper>
                        {/* <ul onScroll={scrolling} ref={scrollEl} className="[scrollbar-width:none] carousel-inner flex flex-nowrap row w-auto list-unstyled mt-3 pb-2 md:pb-0 md:mb-1 overflow-x-auto overflow-y-hidden" role="listbox">
                            {proudToBeArr.map((proud:any, index: number) =>{
                                if (!proud) {
                                    return <></>;
                                }
                                return <li key={`${proud}-${index}`} className="flex flex-[0_0_19%] md:flex-[0_0_16.67%] items-center flex-col px-1 carousel-item active">
                                {iconsData[proud]}
                                </li>
                                }
                            )}
                        </ul> */}
                    </div>
                    <div className="scrollbar lg:mt-3 lg:hidden bg-gray-400 relative h-[4px] rounded rounded-[4px] overflow-hidden -mt-1">
                        <div className="scrollbar--thumb bg-gray-500 absolute h-[4px] rounded-[4px]" style={{ left: `${scrollProgress}%`, width: `${ ((5 / totalSlide) * 100) - 5 }%` }} ref={scrollThumb}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProudToBe;