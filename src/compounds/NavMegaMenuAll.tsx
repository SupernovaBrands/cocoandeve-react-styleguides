import React, { useEffect, useRef, useState } from 'react';

const NavMegaMenuAll = (props: any) => {
    const { menus, generalSetting, store } = props;
    const [navClass, setNavClass] = useState('justify-between');

    useEffect(() => {
        if (store === 'int' || store === 'my') {
            setNavClass('justify-start gap-x-[6rem]')
        } 
    },[store]);

    return (
        <div className="z-[1010] nav-mega-menu hidden left-0 border-t w-full border-top-body mt-[18px] bg-white absolute before:bg-transparent before:w-full before:h-[1.25em] before:absolute before:-mt-[1.25em]">
            <div className="container pt-3 flex flex-wrap items-center justify-between px-g">
                <div className="flex w-full">
                    <div className="max-w-[14.625em] mr-3 mb-3 px-0">
                        <>
                            <a href={generalSetting.mega_menu_shop_all_url} className={`${generalSetting?.bfcm_cta_bg_color === 'bg-dark' ? 'bg-dark text-white hover:text-white border-dark' : 'bg-gray-400 text-primary hover:text-primary'} rounded border border-transparent font-bold mb-2 w-full hover:no-underline inline-flex items-center justify-center px-3 py-1 text-lg text-center whitespace-nowrap`}>
                                {generalSetting.mega_menu_shop_all_label}
                            </a>
                            {generalSetting.bg_image && (
                                <a href={generalSetting.mega_menu_image_url}>
                                    <img src={generalSetting.bg_image.url} alt="Shop all mega menu" className="d-block w-100 rounded" />
                                </a>
                            )}
                        </>
                    </div>
                    <div className={`ml-3 mb-3 flex flex-wrap ${navClass} px-0 flex-grow-1 w-full`}>
                        {menus && menus.map((menu) => {
                            if (menu.title.toLowerCase() !== 'sale' && menu.handle !== '/collections/sale' && menu.handle !== '/collections/all' && menu.handle !== '/collections/new-holiday-sets') {
                                return (
                                    <div key={`menu-${menu.title}`} className="d-flex flex-column">
                                        <a href={menu.handle} className="block mb-2 text-lg text-body font-bold" aria-label={menu.title}>{menu.title}</a>
                                        <ol className="list-unstyled">
                                            {menu.rows.map((row) => (
                                                <li key={`menuRow-${row.title}`} className="mb-1 ">
                                                    <a href={row.handle} className="text-body" aria-label={row.title}>{row.title}</a>
                                                </li>
                                            ))}
                                            {menu.handle !== '/collections/kits-gifts' && (
                                                <li><a href={menu.handle} className="text-body font-bold" aria-label={`Shop ${menu.title} Range`}>Shop {menu.title} Range</a></li>
                                            )}
                                            {menu.title === 'Hair' && (
                                                <li className="mt-1"><a href="/pages/hair-concerns-solutions" className="block border font-bold hover:no-underline no-underline px-1 py-1 text-body text-center hover:text-primary" aria-label="Shop by Concern">Shop by Concern</a></li>
                                            )}
                                        </ol>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavMegaMenuAll;
