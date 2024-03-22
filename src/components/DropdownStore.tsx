import React, { useState } from 'react';

const DropdownStore = (props: any) => {
    const [activeCountry, setActive] = useState('USA');
    const [open, setOpen] = useState(false);
    return (
        <div className="row">
            <div className="relative">
                <button onClick={() => setOpen(!open)} className="text-primary rounded-lg text-sm py-2.5 text-center inline-flex items-center after:inline-block after:ml-[0.255em] after:border-t-[0.3em] after:border-solid after:border-t-primary after:border-x-[0.3em] after:border-b-0 after:border-x-transparent" type="button" data-dropdown-toggle="dropdown">Dropdown button</button>

                <div className={`${!open ? 'hidden' : 'block' } bg-white text-base z-50 list-none divide-y divide-gray-100 rounded`}>
                <a className={` block w-full clear-both font-normal text-body whitespace-nowrap border-[0] px-2 py-1 hover:text-white ${activeCountry === 'USA' && 'bg-primary text-white'}`} href="#">United States (USA)</a>
                    <a className={` block w-full clear-both font-normal text-body whitespace-nowrap border-[0] px-2 py-1 hover:text-white ${activeCountry === 'GBP' && 'bg-primary text-white'}`} href="#">United Kingdom (GBP)</a>
                </div>
            </div>
        </div>
    )
}

export default DropdownStore;

