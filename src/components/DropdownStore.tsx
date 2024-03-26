import React, { useState } from 'react';

const DropdownStore = (props: any) => {
    const [activeCountry, setActive] = useState('USA (USD)');
    const [open, setOpen] = useState(false);
    return (
        <div className="lg:text-right relative">
            <div className="relative">
                <button onClick={() => setOpen(!open)} className="rounded-lg py-2.5 text-center inline-flex items-center after:inline-block after:ml-[0.255em] after:border-t-[0.3em] after:border-solid after:border-t-body after:border-x-[0.3em] after:border-b-0 after:border-x-transparent text-body text-lg" type="button">{activeCountry}</button>

                <div className={` bg-white  text-base z-50 list-none divide-y divide-gray-100 rounded [transition:all_0.3s] opacity-0 h-[0] top-[0] bottom-[0] [transform:translate3d(0,_0,_0)] overflow-hidden ${!open ? '' : 'absolute [transform:translate3d(0px,_0px,_0px)] top-0 left-0 opacity-100 [transform:translate3d(0px,_-295px,_0px)!important] h-[17.5em] h-[295px]' }`}>
                    <a className={` block w-full clear-both font-normal text-body whitespace-nowrap border-[0] px-2 py-1 hover:text-body ${activeCountry === 'USA (USD)' ? 'bg-primary text-white' : 'bg-white text-body'}`} href="#">USA (USD)</a>
                    <a className={` block w-full clear-both font-normal text-body whitespace-nowrap border-[0] px-2 py-1 hover:text-body ${activeCountry === 'United Kingdom (GBP)' ? 'bg-primary text-white' : 'bg-white text-body'}`} href="#">United Kingdom (GBP)</a>
                    <a className={` block w-full clear-both font-normal text-body whitespace-nowrap border-[0] px-2 py-1 hover:text-body ${activeCountry === 'Canada (CAD)' ? 'bg-primary text-white' : 'bg-white text-body'}`} href="#">Canada (CAD)</a>
                    <a className={` block w-full clear-both font-normal text-body whitespace-nowrap border-[0] px-2 py-1 hover:text-body ${activeCountry === 'Australia (AUD)' ? 'bg-primary text-white' : 'bg-white text-body'}`} href="#">Australia (AUD)</a>
                    <a className={` block w-full clear-both font-normal text-body whitespace-nowrap border-[0] px-2 py-1 hover:text-body ${activeCountry === 'Europe (EUR)' ? 'bg-primary text-white' : 'bg-white text-body'}`} href="#">Europe (EUR)</a>
                    <a className={` block w-full clear-both font-normal text-body whitespace-nowrap border-[0] px-2 py-1 hover:text-body ${activeCountry === 'Malaysia (MYR)' ? 'bg-primary text-white' : 'bg-white text-body'}`} href="#">Malaysia (MYR)</a>
                    <a className={` block w-full clear-both font-normal text-body whitespace-nowrap border-[0] px-2 py-1 hover:text-body ${activeCountry === 'Rest Of World (SGD)' ? 'bg-primary text-white' : 'bg-white text-body'}`} href="#">Rest Of World (SGD)</a>
                </div>
            </div>
        </div>
    )
}

export default DropdownStore;

