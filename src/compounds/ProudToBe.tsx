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
import { useRef, useEffect, useState } from 'react';

const iconsData = {
    'natural-dha': <><NaturalDha className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">100% Natural DHA</span></>,
    'sulfate-free': <><Sulfate className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">Sulfate Free</span></>,
    'gluten': <><Gluten className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">Sulfate Free</span></>,
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
    const proudToBeArr = proudToBe?.split('|') || [];
    const scrollEl = useRef(null);
    const scrollThumb = useRef(null);
    const [width, setWidth] = useState(0);
    const [left, setLeft] = useState(0);

    const scrolling = (e:any) => {
        const { target } = e;
        let subWidth = 0;
        target.querySelectorAll('li').forEach((li:any) => subWidth += li.offsetWidth);
        setLeft(e.target.scrollLeft);
    }

    useEffect(() => {
        if (scrollEl && scrollEl.current) {

            if (scrollEl.current.offsetWidth > scrollEl.current.scrollWidth) {
                setWidth(scrollEl.current.offsetWidth);
            } else {
                const w = Math.abs(globalThis.window.innerWidth - (scrollEl.current.scrollWidth - scrollEl.current.offsetWidth));
                setWidth(w);
            }
        }
    }, [scrollEl]);

    return (
        <div className="proud-to-be-wrapper mb-2 mt-3 lg:mb-0 lg:order-2">
        <h2 className="mb-0">Proud to be</h2>
        <div className="">
                <div className="carousel--scroll position-relative">
                    <ul onScroll={scrolling} ref={scrollEl} className="[scrollbar-width:none] carousel-inner flex flex-nowrap row w-auto list-unstyled mt-3 pb-2 md:pb-0 md:mb-1 overflow-x-auto overflow-y-hidden" role="listbox">
                        {proudToBeArr.map((proud:any) => (
                            <li className="min-w-[16.6%] flex items-center flex-col px-1 carousel-item active">
                                {iconsData[proud]}
                            </li>
                        ))}
                    </ul>
                    <div className="scrollbar lg:mt-3 lg:hidden bg-gray-400 relative h-[4px] rounded rounded-[4px] overflow-hidden -mt-1">
                        <div className="scrollbar--thumb bg-gray-500 absolute h-[4px] rounded-[4px]" style={{width, left}} ref={scrollThumb}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProudToBe;