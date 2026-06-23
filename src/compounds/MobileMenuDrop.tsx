import { useState, useRef } from 'react';
import BrandLogo from '~/images/ce-logo.svg';
import Account from '~/images/icons/acc-ico.svg';
import Search from '~/images/icons/search-ico.svg';
import CartIcon from '~/images/icons/cart-ico.svg';
import Close from '~/images/icons/close.svg';

type MenuItem = {
    label: string;
    url?: string;
    children?: MenuItem[];
};

const getHandleFromUrl = (url?: string) => {
    if (!url) return '';
    const path = url.split('?')[0].split('#')[0];
    const segments = path.split('/').filter(Boolean);
    return segments[segments.length - 1] || '';
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

const Chevron = ({ open, size = 20 }: { open: boolean; size?: number }) => (
    <svg
        width={size} height={size * 0.9} viewBox="0 0 12 7" fill="none"
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
    const [openPath, setOpenPath] = useState<string[]>([]);
    const [leafProducts, setLeafProducts] = useState<Record<string, MenuItem[]>>({});
    const [loadingLeafKey, setLoadingLeafKey] = useState<string | null>(null);
    const fetchedLeavesRef = useRef<Set<string>>(new Set());

    const fetchLeafProducts = async (handle: string, key: string) => {
        if (!handle || fetchedLeavesRef.current.has(key)) return;
        fetchedLeavesRef.current.add(key);
        setLoadingLeafKey(key);

        try {
            const res = await fetch(`/api/collectionProducts?handle=${handle}&region=${store}&limit=12`);
            const data = await res.json();
            const products = (data?.products || [])
                .filter((p: any) => p.availableForSale)
                .map((p: any): MenuItem => ({ label: p.title, url: `/products/${p.handle}` }));
            setLeafProducts(prev => ({ ...prev, [key]: products }));
        } catch {
            fetchedLeavesRef.current.delete(key);
        } finally {
            setLoadingLeafKey(null);
        }
    };

    const toggleL1 = (label: string) => {
        setOpenL1(prev => prev === label ? null : label);
        setOpenPath([]);
    };

    // Walks the branch one level at a time: a node with its own children just
    // reveals those children (no fetch). A childless node is a true leaf —
    // when fetchLeaf is on (Shop), that's where products get pulled from its
    // own collection; otherwise the leaf is just whatever Strapi gave it.
    const toggleBranch = (depth: number, node: MenuItem, fetchLeaf: boolean) => {
        const opening = openPath[depth] !== node.label;
        setOpenPath(prev => (opening ? [...prev.slice(0, depth), node.label] : prev.slice(0, depth)));

        const hasChildren = node.children && node.children.length > 0;
        if (opening && !hasChildren && fetchLeaf) {
            const handle = getHandleFromUrl(node.url);
            if (handle) fetchLeafProducts(handle, node.label);
        }
    };

    const renderBranch = (items: MenuItem[], depth: number, fetchLeaf: boolean) => (
        <>
            {items.map((node) => {
                const hasChildren = node.children && node.children.length > 0;
                const isStaticLeaf = !hasChildren && !fetchLeaf;
                const isOpen = openPath[depth] === node.label;
                const isDimmed = openPath[depth] != null && !isOpen;

                return (
                    <div
                        key={node.label}
                        className="transition-opacity duration-200"
                        style={{ opacity: isDimmed ? 0.4 : 1 }}
                    >
                        <button
                            className="w-full flex items-center gap-[8px] py-[4px] bg-transparent border-0 p-0 text-left"
                            onClick={() => isStaticLeaf ? (window.location.href = node.url || '#') : toggleBranch(depth, node, fetchLeaf)}
                        >
                            <span className="text-body font-normal text-[20px] leading-[25px] not-italic">{node.label}</span>
                            {!isStaticLeaf && <Chevron open={isOpen} size={12} />}
                        </button>

                        {!isStaticLeaf && isOpen && (
                            <div className="pl-[16px] pb-[4px] flex flex-col gap-[8px]">
                                {hasChildren ? (
                                    renderBranch(node.children!, depth + 1, fetchLeaf)
                                ) : loadingLeafKey === node.label && !leafProducts[node.label] ? (
                                    <span className="text-[16px] text-body opacity-40">Loading...</span>
                                ) : (
                                    (leafProducts[node.label] || []).map((leaf) => (
                                        <a
                                            key={leaf.label}
                                            href={leaf.url || '#'}
                                            className="block text-[16px] not-italic font-normal leading-[20px] no-underline hover:text-body text-body hover:no-underline"
                                        >
                                            {leaf.label}
                                        </a>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </>
    );

    const storeLabel = STORE_LABELS[store] || STORE_LABELS['int'];
    const [storeOpen, setStoreOpen] = useState(false);

    return (
        <div className="fixed left-0 right-0 bottom-0 z-[1040] bg-white flex flex-col overflow-hidden" style={{ top: annBarHeight }}>

            {/* Header — mirrors the main nav exactly */}
            <nav className="bg-white relative flex flex-wrap items-center justify-between px-g ">
                <div className="container px-0 flex flex-wrap items-center justify-between">
                    <div className="[flex-basis:30%] flex items-center gap-[16px]">
                        <button onClick={onToggleMobileNav} className="text-[13px] border-0 h-[40px] flex items-center bg-transparent" aria-label="Close menu">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect width="17.5992" height="2.19992" rx="1.09996" transform="matrix(0.707111 0.707103 -0.707111 0.707103 2.55566 1)" fill="#151515"/>
                            <rect width="17.5992" height="2.19989" rx="1.09994" transform="matrix(0.707111 -0.707103 0.707111 0.707103 1 13.4448)" fill="#151515"/>
                            </svg>
                        </button>
                        <button onClick={toggleAccountDropdown} className="flex items-center p-0 border-0 bg-transparent" aria-label="Account">
                            <Account style={{ width: 15, height: 16 }} />
                        </button>
                    </div>

                    <a href="/" className="inline-block py-[8px] mx-auto" aria-label="Visit Coco and Eve homepage">
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
            <nav className="flex-1 overflow-y-auto px-g pt-[24px]">
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
                                className="w-full flex items-center justify-between py-[0] bg-transparent border-0 p-0 text-left"
                                onClick={() => hasChildren ? toggleL1(item.label) : (window.location.href = item.url || '#')}
                            >
                                <span className="text-body font-bold text-[32px] leading-[40px]">{item.label}</span>
                                {hasChildren && <Chevron open={isL1Open} />}
                            </button>

                            {hasChildren && isL1Open && (
                                <div className="pb-[8px]">
                                    {renderBranch(item.children!, 0, item.label === 'Shop')}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* Footer — region */}
            <div className="px-[16px] py-[16px] ">
                <button className="w-full flex items-center justify-between bg-transparent border-0 p-0" onClick={() => setStoreOpen(o => !o)}>
                    <span className="text-body text-[20px] leading-[25px]">{storeLabel}</span>
                    <Chevron open={storeOpen} size={14} />
                </button>
                {storeOpen && (
                    <ul className="list-none pl-0 mb-0 mt-2 flex flex-col gap-2">
                        <li><a href="https://www.cocoandeve.com?store=us" className="text-body text-[16px] no-underline hover:text-primary">USA (USD)</a></li>
                        <li><a href="https://www.cocoandeve.com?store=uk" className="text-body text-[16px] no-underline hover:text-primary">United Kingdom (GBP)</a></li>
                        <li><a href="https://www.cocoandeve.com?store=ca" className="text-body text-[16px] no-underline hover:text-primary">Canada (CAD)</a></li>
                        <li><a href="https://www.cocoandeve.com?store=au" className="text-body text-[16px] no-underline hover:text-primary">Australia (AUD)</a></li>
                        <li><a href="https://www.cocoandeve.com?store=eu" className="text-body text-[16px] no-underline hover:text-primary">Europe (EUR)</a></li>
                        <li><a href="https://www.cocoandeve.com?store=int" className="text-body text-[16px] no-underline hover:text-primary">Rest of the World (SGD)</a></li>
                        <li><a href="https://www.cocoandeve.com?store=my" className="text-body text-[16px] no-underline hover:text-primary">Malaysia (MYR)</a></li>
                    </ul>
                )}
            </div>

        </div>
    );
};

export default MobileMenuDrop;
