import NaturalDha from '~/images/icons/natural-dha.svg';
import Vegan from '~/images/icons/vegan.svg';
import DimethiconeFree from '~/images/icons/dimethicone-free.svg';
import CrueltyFree from '~/images/icons/cruelty-free.svg';
import ToxinFree from '~/images/icons/toxin-free.svg';
import Ethically from '~/images/icons/ethically.svg';
import ParabenFree from '~/images/icons/paraben-free.svg';
import Peta from '~/images/icons/peta.svg';
import FragranceFree from '~/images/icons/fragrance-free.svg';
import Gluten from '~/images/icons/gluten.svg';
import Sulfate from '~/images/icons/natural-dha.svg';
import Phthalates from '~/images/icons/phthalates.svg';
import useEmblaCarousel from 'embla-carousel-react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import { EmblaCarouselType } from 'embla-carousel';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

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
    'peta': <><Peta className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">Peta Approved</span></>,
    'fragrance-free': <><FragranceFree className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">Fragrance Free</span></>,
    'phthlates-free': <><Phthalates className="svg h-[1.625em]"/><span className="text-center flex-grow-1 font-size-sm mt-1">Phthalates Free</span></>
}

const ProudToBe = (props:any) => {

    const iconOrders = [
        "natural-dha",
        "sulfate-free",
        "vegan",
        "silicone-free",
        "cruelty-free",
        "toxin-free",
        "gluten",
        "gluten-free",
        "ethically",
        "paraben-free",
        "peta",
        "peta approved",
        "fragrance-free",
        "phthlates-free"
    ];
    const handleSort = (a, b) => {
		const indexNumA = iconOrders.findIndex((item) => {
            return item.includes(a)
        });
		const indexNumB = iconOrders.findIndex((item) => {
            return item.includes(b)
        });

		if (indexNumA >= 0 && indexNumB < 0) {
			return -1;
		}

		if (indexNumA < 0 && indexNumB >= 0) {
			return 1;
		}

		if (indexNumA >= 0 && indexNumB >= 0) {
			return (indexNumA > indexNumB) ? 0 : -1;
		}

		return 0;
	};

    const { proudToBe } = props;
    const proudToBeArr = proudToBe?.split('|').sort(handleSort) || [];
    const scrollEl = useRef(null);
    const scrollThumb = useRef(null);
    const [totalSlide, setTotalSlide] = useState(0);
	// const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: false, align: 'start', dragFree: false, containScroll: 'keepSnaps' }, [WheelGesturesPlugin()]);
	const [scrollProgress, setScrollProgress] = useState(0);
    const [preventSelection, setPreventSelection] = useState('');

    const [width, setWidth] = useState('100%');
    const [left, setLeft] = useState(0);

    const scrolling = (e:any) => {
        const moveLeft = e.target.scrollLeft/scrollEl.current.scrollWidth;
        setLeft(moveLeft * (scrollEl.current.offsetWidth - 5));
    }

    // const onScroll = useCallback((emblaMainApi: EmblaCarouselType) => {
	// 	const progress = Math.max(0, Math.min(1, emblaMainApi.scrollProgress()));
	// 	setScrollProgress(progress * 100 / 2);
	// }, []);

    const adjustWidth = () => {
        if (scrollEl && scrollEl.current) {
            if (scrollEl.current.offsetWidth > scrollEl.current.scrollWidth) {
                setWidth(scrollEl.current.offsetWidth);
            } else {
                const ratio = globalThis.window.innerWidth / (scrollEl.current.scrollWidth + 30); // plus 30 for padding
                const w = Math.abs(ratio *  100) // (scrollEl.current.scrollWidth - scrollEl.current.offsetWidth));
                setWidth(`${w}%`);
            }
        }
    }

    useEffect(() => {
        adjustWidth();
    }, [scrollEl]);

    useEffect(() => {
        let totalSlide = 0;
        proudToBeArr.forEach((proud:any) => {if (proud) { totalSlide += 1}});
        setTotalSlide(totalSlide);
        globalThis.document.addEventListener('resize', adjustWidth);
    }, []);

    // useEffect(() => {
    //     if (emblaMainApi) {
    //         emblaMainApi.on('select', onScroll);
    //         emblaMainApi.on('reInit', onScroll);
    //         emblaMainApi.on('scroll', onScroll);
    //     }
    // }, [emblaMainApi]);

    const [isMouseDown, setIsMouseDown] = useState(false);
    const mouseCoords = useRef({
        startX: 0,
        startY: 0,
        scrollLeft: 0,
        scrollTop: 0
    });

    const handleDragStart = (e:any) => {
        if (!scrollEl.current) return
        const slider = scrollEl.current;
        const startX = e.pageX - slider.offsetLeft;
        const startY = e.pageY - slider.offsetTop;
        const scrollLeft = slider.scrollLeft;
        const scrollTop = slider.scrollTop;
        mouseCoords.current = { startX, startY, scrollLeft, scrollTop }
        setPreventSelection('prevent-selection');
        setIsMouseDown(true)
    }
    const handleDragEnd = (e) => {
        setIsMouseDown(false);
        setPreventSelection('');
        if (!scrollEl.current) return
    }
    const handleDrag = (e:any) => {
        if (!isMouseDown || ! scrollEl.current) return;
        e.preventDefault();
        const slider = scrollEl.current;
        const x = e.pageX - slider.offsetLeft;
        const y = e.pageY - slider.offsetTop;
        const walkX = (x - mouseCoords.current.startX) * 1.5;
        const walkY = (y - mouseCoords.current.startY) * 1.5;
        slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
        slider.scrollTop = mouseCoords.current.scrollTop - walkY;
        setPreventSelection('prevent-selection');
    }

    return (
        <div className="proud-to-be-wrapper my-3 lg:mb-0 lg:order-2">
        <h2 className="mb-0">Proud to be</h2>
        <div className="">
                <div className="carousel--scroll position-relative">
                    <div className="main-box overflow-hidden -mx-hg md:-mx-g">
                        {/* <Carousel.Wrapper emblaApi={emblaMainApi}>
	        				<Carousel.Inner emblaRef={emblaMainRef} className="[scrollbar-width:none] carousel-inner flex flex-nowrap row w-auto list-unstyled mt-3 pb-2 md:pb-0 md:mb-1">
                                {proudToBeArr.map((proud:any, index: number) =>{
                                    if (proud) {
                                        return <div key={`${proud}-${index}`} className="flex flex-[0_0_19%] md:flex-[0_0_16.67%] items-center flex-col px-1 carousel-item active">
                                        {iconsData[proud.replace('peta approved', 'peta')]}
                                        </div>
                                    }
                                    return null;
                                })}
                            </Carousel.Inner>
                        </Carousel.Wrapper> */}
                        <ul onScroll={scrolling} ref={scrollEl}
                            onMouseDown={handleDragStart} onMouseUp={handleDragEnd} onMouseMove={handleDrag}
                            className={`${preventSelection} [scrollbar-width:none] carousel-inner flex flex-nowrap row w-auto list-unstyled mt-3 pb-1 md:pb-0 md:mb-1 overflow-x-auto overflow-y-hidden sm:mb-1`} role="listbox">
                            {proudToBeArr.map((proud:any, index: number) =>{
                                if (!proud) {
                                    return null;
                                }
                                return <li key={`${proud}-${index}`} className="flex flex-[0_0_19%] md:flex-[0_0_16.67%] items-center flex-col px-1 carousel-item active">
                                {iconsData[proud.replace('peta approved', 'peta')]}
                                </li>
                                }
                            )}
                        </ul>
                    </div>
                    {proudToBeArr.length > 5 && (
                        <div className="scrollbar lg:mt-3 lg:hidden bg-gray-400 relative h-[4px] rounded rounded-[4px] overflow-hidden -mt-1">
                            <div className="scrollbar--thumb bg-gray-500 absolute h-[4px] rounded-[4px]" style={{ left: `${left}px`, width: width }} ref={scrollThumb}></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProudToBe;
