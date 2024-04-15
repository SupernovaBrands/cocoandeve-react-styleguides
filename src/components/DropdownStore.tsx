import React, { useState } from 'react';

const DropdownStore = (props: any) => {
    const { direction } = props;
    const [activeCountry, setActive] = useState('USA (USD)');
    const [open, setOpen] = useState(false);
    const openClasses = (direction === 'dropup') ?
        'opacity-100 [transform:translate3d(0px,_-295px,_0px)!important] h-[17.5em] h-[295px]' :
        'opacity-100 [transform:translate3d(0px,_22px,_0px)!important] h-[17.5em] h-[295px]';  
    return (
        <div className="lg:text-right relative">
            <div className="relative">
                <button onClick={() => setOpen(!open)} className="rounded-lg py-2.5 text-center inline-flex items-center after:inline-block after:ml-[0.255em] after:border-t-[0.3em] after:border-solid after:border-t-body after:border-x-[0.3em] after:border-b-0 after:border-x-transparent text-body text-base lg:text-lg font-bold lg:font-normal" type="button">{activeCountry}</button>

                <div className={` absolute left-0 bg-white  text-base z-50 list-none  rounded [transition:all_0.3s] opacity-0 h-[0] top-[0] ${direction === 'dropup' ? '[transform:translate3d(0,_0,_0)]' : '[transform:translate3d(0,_20px,_0)]'} bottom-[0] overflow-hidden ${!open ? '' : openClasses }`}>
                    <a className={` block w-full clear-both font-normal !no-underline text-body whitespace-nowrap border px-2 py-1 ${activeCountry === 'USA (USD)' ? 'bg-primary border-primary text-white hover:text-white' : 'bg-white text-body border-white'}`} href="#">US (USD)</a>
                    <a className={` hover:bg-primary hover:border-primary hover:text-white !no-underline block w-full clear-both font-normal text-body whitespace-nowrap border-[0] px-2 py-1 ${activeCountry === 'United Kingdom (GBP)' ? 'bg-primary text-white' : 'bg-white text-body border-white'}`} href="#">United Kingdom (GBP)</a>
                    <a className={` hover:bg-primary hover:border-primary hover:text-white !no-underline block w-full clear-both font-normal  text-body whitespace-nowrap border px-2 py-1  ${activeCountry === 'Canada (CAD)' ? 'bg-primary text-white' : 'bg-white text-body border-white'}`} href="#">Canada (CAD)</a>
                    <a className={` hover:bg-primary hover:border-primary hover:text-white !no-underline block w-full clear-both font-normal  text-body whitespace-nowrap border px-2 py-1  ${activeCountry === 'Australia (AUD)' ? 'bg-primary text-white' : 'bg-white text-body border-white'}`} href="#">Australia (AUD)</a>
                    <a className={` hover:bg-primary hover:border-primary hover:text-white !no-underline block w-full clear-both font-normal  text-body whitespace-nowrap border px-2 py-1 ${activeCountry === 'Europe (EUR)' ? 'bg-primary text-white' : 'bg-white text-body border-white'}`} href="#">Europe (EUR)</a>
                    <a className={` hover:bg-primary hover:border-primary hover:text-white !no-underline block w-full clear-both font-normal  text-body whitespace-nowrap border px-2 py-1  ${activeCountry === 'Malaysia (MYR)' ? 'bg-primary text-white' : 'bg-white text-body border-white'}`} href="#">Malaysia (MYR)</a>
                    <a className={` hover:bg-primary hover:border-primary hover:text-white !no-underline block w-full clear-both font-normal  text-body whitespace-nowrap border px-2 py-1 ${activeCountry === 'Rest Of World (SGD)' ? 'bg-primary text-white' : 'bg-white text-body border-white'}`} href="#">Rest Of World (SGD)</a>
                </div>
            </div>
        </div>
    )
}

export default DropdownStore;

