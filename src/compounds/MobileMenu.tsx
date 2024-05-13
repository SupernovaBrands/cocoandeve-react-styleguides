import { useState } from 'react';
import Close from '~/images/icons/close.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';
import ChevronNext from '~/images/icons/chevron-next.svg';
import BeautyIcon from '~/images/icons/palm-tree-v2.svg';
import BrandLogo from '~/images/ce-logo.svg';
import MenuBanner from '~/compounds/MenuBanner';
import Link from 'next/link';

const defMenuState = {
	1: false,
	2: false,
	3: false,
	4: false,
	5: false,
}

const MobileMenu = (props: any) => {
	const { mainMenu, menuBannerQuiz, menuBannerCode } = props;
	const { openDrawer, onToggleMobileNav } = props;
	const [menuStates, setMenuStates] = useState(defMenuState);
	const [storeSelection, setStoreSelection] = useState(false);
	const [currency, setCurrency] = useState('USD');
	const mobileNavClick = (e) => {
		if (e.target !== e.currentTarget) return;
		props.onToggleMobileNav();
	}

	return (
		<nav id="mobile-nav" className={`mobile-nav z-[1010] fixed lg:hidden top-[0] bottom-[0] left-[0] [transition:opacity_.2s_linear] w-full h-full bg-[rgba(0,_0,_0,_0.6)] ${openDrawer ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
			<ul id="mobileMenu" className="h-full w-full [transition:transform_.1s_ease-in-out] overflow-y-auto overflow-x-hidden fixed h-100 col-12 bg-white list-unstyled py-2 mb-0 px-0"
			role="tablist" aria-multiselectable="true">
				<li key="toggle" className="flex justify-between mx-g py-[5px]">
					<a href="/" className="mx-auto lg:mx-0 py-1" aria-label="CocoAndEve Logo">
						<BrandLogo className="lg:h-[34px] overflow-hidden " />
					</a>
					<Close className="mobile-nav__close svg absolute right-[.9375em] h-[1em]" onClick={() => onToggleMobileNav(false)}/>
				</li>
				{menuBannerCode && menuBannerCode.enable && (
					<MenuBanner content={menuBannerCode} theme='secondary-light' />
				)}
				{menuBannerQuiz && menuBannerQuiz.enable && (
					<MenuBanner content={menuBannerQuiz} theme='pink-light' />
				)}
				{mainMenu.map((menu, i) => {
					return menu.handle !== '/collections/all' && (
						<li key={`mainmenu-${i}`} className="flex px-g py-0 border-b">
							<label htmlFor="headingHair" className="flex w-full relative p-0 items-center justify-between m-0 pb-1 pt-2" aria-expanded="false" aria-controls="hairCare"
								onClick={() => {
									const newStates = {...defMenuState};
									newStates[i] = true;
									setMenuStates(newStates);
								}}>
								<h4 className="m-0 font-normal">{menu.title}</h4>
								{menu.rows.length > 0 && (
									<ChevronNext className="h-[1em] text-xs" />
								)}
							</label>
							{menu.rows.length > 0 && (
								<ul className={`z-[1000] w-full list-unstyled p-0 absolute bg-white w-100 visible left-0 top-0 min-h-[52.5em] ${menuStates[i] ? 'visible translate-x-[0] [transition:transform_0.15s_ease-in]' : 'invisible translate-x-full [transition:transform_0.15s_ease-out]'}`} aria-labelledby="headingHair">
									<li key={`menuRow`} className="flex justify-between mx-g items-center py-[5px]">
										<label onClick={() => {
											const newStates = {...defMenuState};
											newStates[i] = false;
											setMenuStates(newStates);
										}}>
											<ChevronPrev className="h-[1em]" />
										</label>
										<Link href="/" className="text-body mx-auto py-1" aria-label="CocoAndEve Logo">
											<BrandLogo className="lg:h-[34px]" />
										</Link>
										<Close className="h-[1em]"  onClick={() => onToggleMobileNav(false)} />
									</li>
									<li key="menuTitle" className="border-b p-0"><h4 className="px-g py-1 mb-0">{menu.title}</h4></li>
									{menu.rows.map((row) => (<li key={`row-${row.handle}`} className="border-b p-0"><a href={`/collections/${row.handle}`} className="px-g pb-1 pt-2 block text-body no-underline">{row.title}</a></li>))}
									<li key="shopall" className="border-b p-0">
										<Link href={menu.handle} className="px-g pb-1 pt-2 block text-body no-underline"><strong>Shop All {menu.title}</strong></Link>
									</li>
								</ul>
							)}
						</li>
					)
				})}
				<li key="bali-beauty-club" className="flex px-g py-0 border-b w-full">
					<a href="/pages/rewards" className="w-full m-0 pb-1 pt-2 text-body flex">Bali Beauty Club <BeautyIcon className="ml-1 mr-1" /></a>
				</li>
				<li key="shopall" className="my-g p-g">
					<Link href="/collections/all" className="btn w-full btn-primary px-g py-g" data-cy="shopall-btn">Shop All</Link>
				</li>
				<li key="countries" className="px-g py-1 border-b mb-g">
					<h4 id="countrySelect" className="flex items-center justify-between px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 relative collapsed p-0 font-normal" data-toggle="collapse" data-target="#collapseCountry" aria-expanded="false" aria-controls="collapseCountry"
						onClick={() => setStoreSelection(!storeSelection)}>
						{currency === 'SGD' && 'Rest of the World (SGD)'}
						{currency === 'USD' && 'USA (USD)'}
						{currency === 'CAD' && 'Canada (CAD)'}
						{currency === 'AUD' && 'Canada (CAD)'}
						{currency === 'EUR' && 'Australia (AUD)'}
						{currency === 'SGD' && 'Europe (EUR)'}
						{currency === 'MYR' && 'Malaysia (MYR)'}
						<ChevronNext className={`h-[1em] text-xs ${storeSelection ? 'rotate-180' : ''}`} />
					</h4>
					<ul id="collapseCountry" className={`overflow-hidden list-unstyled card-body p-0 ${!storeSelection ? 'h-0' : 'h-full'} before:content-[''] before:border-t before:border-t-gray-100 before:block before:mt-1`} role="tabpanel"
						aria-labelledby="countrySelect" data-parent="#mobileMenu">
						<li className="pb-25 pt-g"><a href="https://us.cocoandeve.com" className='text-body'>USA (USD)</a></li>
						<li className="py-25"><a href="https://uk.cocoandeve.com" className='text-body'>United Kingdom (GBP)</a></li>
						<li className="py-25"><a href="https://ca.cocoandeve.com" className='text-body'>Canada (CAD)</a></li>
						<li className="py-25"><a href="https://au.cocoandeve.com" className='text-body'>Australia (AUD)</a></li>
						<li className="py-25"><a href="https://eu.cocoandeve.com" className='text-body'>Europe (EUR)</a></li>
						<li className="py-25"><a href="https://int.cocoandeve.com" className='text-body'>Rest of the World (SGD)</a></li>
						{/* <li className="py-25"><a href="https://my.cocoandeve.com" className='text-body'>Malaysia (MYR)</a></li> */}
					</ul>
				</li>
				<li key="others" className="flex flex-wrap -mx-hg px-g pt-g">
					<a href="https://support.cocoandeve.com/hc/en-us" className="px-hg w-1/2 mb-1 text-body">Help</a>
					<Link href="/pages/track-my-order" className="px-hg w-1/2 mb-1 text-body">Track my order</Link>
					<Link href="/pages/reviews" className="px-hg w-1/2 mb-1 text-body">Result IRL</Link>
					<Link href="/blogs/news" className="px-hg w-1/2 mb-1 text-body">Blog</Link>
				</li>
			</ul>
		</nav>
	);
};

export default MobileMenu;
