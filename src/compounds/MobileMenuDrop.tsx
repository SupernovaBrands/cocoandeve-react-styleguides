import { useState } from 'react';
import BrandLogo from '~/images/ce-logo.svg';
import Account from '~/images/icons/account-ico.svg';
import Search from '~/images/icons/search-ico.svg';
import CartIcon from '~/images/icons/cart-ico.svg';
import Close from '~/images/icons/close.svg';

type MenuItem = {
    label: string;
    url?: string;
    children?: MenuItem[];
};

const MENU: MenuItem[] = [
    {
        label: 'Shop',
        url: '/collections/all?c=main-menu',
        children: [
            { label: 'Tan', url: '/collections/tan', children: [] },
            {
                label: 'Hair', url: '/collections/hair', children: [
                    { label: 'Shampoo & Conditioner', url: '/collections/shampoo-conditioner' },
                    { label: 'Treatments', url: '/collections/treatments' },
                    { label: 'Hair Styling', url: '/collections/hair-styling' },
                    { label: 'Hair Accessories', url: '/collections/hair-accessories' },
                ],
            },
            { label: 'SPF', url: '/collections/spf', children: [] },
            { label: 'Sets', url: '/collections/sets', children: [] },
            { label: 'New!', url: '/collections/new' },
            { label: 'Bestsellers', url: '/collections/bestsellers' },
            { label: 'Sale', url: '/collections/sale' },
            { label: 'Shop All', url: '/collections/all' },
            { label: 'Build Your Own Bundle', url: '/pages/build-your-bundle' },
        ],
    },
    { label: 'Made For You', url: '/pages/made-for-you?c=main-menu', children: [] },
    { label: 'Explore', url: '/pages/explore?c=main-menu', children: [] },
    { label: 'Rewards', url: '/pages/rewards?c=main-menu' },
    { label: 'Ask Coco', url: '/pages/ask-coco?c=main-menu', children: [] },
];

const STORE_LABELS: Record<string, string> = {
    us: 'United States (USD)',
    uk: 'United Kingdom (GBP)',
    au: 'Australia (AUD)',
    ca: 'Canada (CAD)',
    eu: 'Europe (EUR)',
    my: 'Malaysia (MYR)',
    int: 'Rest of the World (SGD)',
};

const Chevron = ({ open }: { open: boolean }) => (
    <svg
        width="12" height="7" viewBox="0 0 12 7" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}
    >
        <path d="M1 1L6 6L11 1" stroke="#151515" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const MobileMenuDrop = (props: any) => {
    const {
        onToggleMobileNav, cartCount, store, annBarHeight = 0,
        onToggleCart, onToggleSearchBox, toggleAccountDropdown, nav,
    } = props;

    const menu: MenuItem[] = nav || MENU;

    const [openL1, setOpenL1] = useState<string | null>(null);
    const [openL2, setOpenL2] = useState<string | null>(null);

    const toggleL1 = (label: string) => {
        setOpenL1(prev => prev === label ? null : label);
        setOpenL2(null);
    };

    const toggleL2 = (label: string) => {
        setOpenL2(prev => prev === label ? null : label);
    };

    const storeLabel = STORE_LABELS[store] || STORE_LABELS['int'];

    return (
        <div className="fixed left-0 right-0 bottom-0 z-[1040] bg-white flex flex-col overflow-hidden" style={{ top: annBarHeight }}>

            {/* Header — mirrors the main nav exactly */}
            <nav className="bg-white relative flex flex-wrap items-center justify-between px-hg border-b border-gray-100">
                <div className="container px-0 flex flex-wrap items-center justify-between">
                    <div className="[flex-basis:30%] flex items-center gap-[16px]">
                        <button onClick={onToggleMobileNav} className="text-[13px] border-0 h-[40px] flex items-center bg-transparent" aria-label="Close menu">
                            <Close style={{ width: 15, height: 15 }} />
                        </button>
                        <button onClick={toggleAccountDropdown} className="flex items-center p-0 border-0 bg-transparent" aria-label="Account">
                            <Account style={{ width: 15, height: 16 }} />
                        </button>
                    </div>

                    <a href="/" className="inline-block py-[11.250px] mx-auto" aria-label="Visit Coco and Eve homepage">
                        <BrandLogo />
                    </a>

                    <ul className="basis-[30%] flex list-reset pl-0 mb-0 flex-row justify-end items-center gap-[20px]">
                        <li className="flex items-center">
                            <button type="button" className="flex items-center p-0 border-0 bg-transparent" onClick={onToggleSearchBox} aria-label="Search">
                                <Search style={{ width: 16, height: 16 }} />
                            </button>
                        </li>
                        <li className="flex items-center">
                            <a className="text-body flex items-center gap-[3px]" role="button" tabIndex={0} onClick={onToggleCart} aria-label="Cart">
                                <CartIcon style={{ width: 15, height: 17 }} />
                                <span className="cart-drawer__count font-bold">{cartCount || 0}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto px-[16px]">
                {menu.map((item) => {
                    const hasChildren = item.children && item.children.length > 0;
                    const isL1Open = openL1 === item.label;
                    const isL1Dimmed = openL1 !== null && !isL1Open;

                    return (
                        <div
                            key={item.label}
                            className="border-gray-100 transition-opacity duration-200"
                            style={{ opacity: isL1Dimmed ? 0.4 : 1 }}
                        >
                            <button
                                className="w-full flex items-center justify-between py-[4px] bg-transparent border-0 p-0 text-left"
                                onClick={() => hasChildren ? toggleL1(item.label) : (window.location.href = item.url || '#')}
                            >
                                <span className="text-body font-bold text-[32px] leading-[40px]">{item.label}</span>
                                {hasChildren && <Chevron open={isL1Open} />}
                            </button>

                            {hasChildren && isL1Open && (
                                <div className="pb-[8px]">
                                    {item.children!.map((child) => {
                                        const hasGrandchildren = child.children && child.children.length > 0;
                                        const isL2Open = openL2 === child.label;
                                        const isL2Dimmed = openL2 !== null && !isL2Open;

                                        return (
                                            <div
                                                key={child.label}
                                                className="transition-opacity duration-200"
                                                style={{ opacity: isL2Dimmed ? 0.4 : 1 }}
                                            >
                                                <button
                                                    className="w-full flex items-center justify-between py-[4px] bg-transparent border-0 p-0 text-left"
                                                    onClick={() => hasGrandchildren ? toggleL2(child.label) : (window.location.href = child.url || '#')}
                                                >
                                                    <span className="text-body font-normal text-[20px] leading-[25px] not-italic">{child.label}</span>
                                                    {hasGrandchildren && <Chevron open={isL2Open} />}
                                                </button>

                                                {hasGrandchildren && isL2Open && (
                                                    <div className="pl-[16px] pb-[4px] flex flex-col gap-[8px]">
                                                        {child.children!.map((grandchild) => (
                                                            <a
                                                                key={grandchild.label}
                                                                href={grandchild.url || '#'}
                                                                className="block text-[16px] not-italic font-normal leading-[20px] no-underline hover:text-body text-body hover:no-underline"
                                                            >
                                                                {grandchild.label}
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* Footer — region */}
            <div className="px-[16px] py-[16px] border-t border-gray-100">
                <button className="w-full flex items-center justify-between bg-transparent border-0 p-0">
                    <span className="text-body text-[14px]">{storeLabel}</span>
                    <Chevron open={false} />
                </button>
            </div>

        </div>
    );
};

export default MobileMenuDrop;
