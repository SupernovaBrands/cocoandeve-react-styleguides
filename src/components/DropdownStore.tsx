import React, { useEffect, useRef, useState } from 'react';

const DropdownStore = (props: any) => {
    const { direction, store } = props;
    const [activeCountry, setActive] = useState('US (USD)');
    const [open, setOpen] = useState(false);
    const openClasses = (direction === 'dropup') ?
        'opacity-100 [transform:translate3d(0px,_-280px,_0px)!important] h-[280px]' :
        'opacity-100 [transform:translate3d(0px,_22px,_0px)!important] h-[280px]';
    useEffect(() => {
        let activeCountry = 'US (USD)';
        if (store === 'ca') {
            activeCountry = 'CA (CAD)';
        } else if (store === 'uk') {
            activeCountry = 'UK (GBP)';
        } else if (store === 'eu') {
            activeCountry = 'EU (EUR)';
        } else if (store === 'au') {
            activeCountry = 'AU (AUD)';
        } else if (store === 'int') {
            activeCountry = 'ROW (SGD)';
        } else if (store === 'my') {
            activeCountry = 'MY (MYR)';
        }
        setActive(activeCountry);
    },[store]);

    const dropdownRef = useRef(null);

    useEffect(() => {
		const closeDropdown = (e) => {
			if (open && !dropdownRef.current?.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', closeDropdown);
		return () => {
		    document.removeEventListener('mousedown', closeDropdown);
		  };
	}, [open]);

    return (
        <div className="lg:text-left relative dropdown__store">
            <div className="relative" ref={dropdownRef}>
                <button onClick={() => setOpen(!open)} className={`rounded-lg py-2.5 text-center inline-flex items-center after:inline-block after:ml-1 after:mb-[3px] after:border-b-[5px] after:border-solid after:border-t-body after:border-x-[5px] after:border-x-transparent text-body text-base font-bold lg:font-normal lg:after:mt-0 hover:underline hover:text-primary-darken text-sm font-normal`} type="button">{activeCountry}</button>

                <div className={`text-left absolute mb-[.125rem] -left-[25px] lg:left-0 bg-white lg:min-w-[10rem] text-base z-50 list-none rounded-[4px] [transition:all_0.3s] opacity-0 h-[0] top-[0] ${direction === 'dropup' ? '[transform:translate3d(0,_0,_0)]' : '[transform:translate3d(0,_20px,_0)]'} bottom-[0] overflow-hidden ${!open ? '' : openClasses }`}>
                    <a className={` hover:bg-primary hover:border-primary hover:text-white block w-full clear-both font-normal !no-underline text-body whitespace-nowrap border-[0] px-[1.5rem] py-1 ${activeCountry === 'US (USD)' ? 'bg-primary border-primary text-white hover:text-white' : 'bg-white text-body border-white'}`} href="https://www.cocoandeve.com/?store=us">USA (USD)</a>
                    <a className={` hover:bg-primary hover:border-primary hover:text-white !no-underline block w-full clear-both font-normal text-body whitespace-nowrap border-[0] px-[1.5rem] py-1 ${activeCountry === 'UK (GBP)' ? 'bg-primary text-white' : 'bg-white text-body border-white'}`} href="https://www.cocoandeve.com/?store=uk">United Kingdom (GBP)</a>
                    <a className={` hover:bg-primary hover:border-primary hover:text-white !no-underline block w-full clear-both font-normal  text-body whitespace-nowrap border-[0] px-[1.5rem] py-1  ${activeCountry === 'CA (CAD)' ? 'bg-primary text-white' : 'bg-white text-body border-white'}`} href="https://www.cocoandeve.com/?store=ca">Canada (CAD)</a>
                    <a className={` hover:bg-primary hover:border-primary hover:text-white !no-underline block w-full clear-both font-normal  text-body whitespace-nowrap border-[0] px-[1.5rem] py-1  ${activeCountry === 'AU (AUD)' ? 'bg-primary text-white' : 'bg-white text-body border-white'}`} href="https://www.cocoandeve.com/?store=au">Australia (AUD)</a>
                    <a className={` hover:bg-primary hover:border-primary hover:text-white !no-underline block w-full clear-both font-normal  text-body whitespace-nowrap border-[0] px-[1.5rem] py-1 ${activeCountry === 'EU (EUR)' ? 'bg-primary text-white' : 'bg-white text-body border-white'}`} href="https://www.cocoandeve.com/?store=eu">Europe (EUR)</a>
                    <a className={` hover:bg-primary hover:border-primary hover:text-white !no-underline block w-full clear-both font-normal  text-body whitespace-nowrap border-[0] px-[1.5rem] py-1  ${activeCountry === 'MY (MYR)' ? 'bg-primary text-white' : 'bg-white text-body border-white'}`} href="https://www.cocoandeve.com/?store=my">Malaysia (MYR)</a>
                    <a className={` hover:bg-primary hover:border-primary hover:text-white !no-underline block w-full clear-both font-normal  text-body whitespace-nowrap border-[0] px-[1.5rem] py-1 ${activeCountry === 'ROW (SGD)' ? 'bg-primary text-white' : 'bg-white text-body border-white'}`} href="https://www.cocoandeve.com/?store=int">Rest of the World (SGD)</a>
                </div>
            </div>
        </div>
    )
}

export default DropdownStore;
