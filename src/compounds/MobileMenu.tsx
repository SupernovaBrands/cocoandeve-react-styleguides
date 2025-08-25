import { useEffect, useState } from 'react';
import Image from 'next/image';
import Close from '~/images/icons/close.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';
import ChevronNext from '~/images/icons/chevron-next.svg';
import BeautyIcon from '~/images/icons/palm-tree-v2.svg';
import BrandLogo from '~/images/ce-logo.svg';
import MenuBanner from '~/compounds/MenuBanner';
import IconHair from '~/images/m-hair.jpg';
import IconBeauty from '~/images/m-beauty.png';
import IconBody from '~/images/m-body.jpg';
import IconSkin from '~/images/m-skin.jpg';
import IconTan from '~/images/m-tan.jpg';
import IconValueSet from '~/images/m-value-set.jpg';

const Icons = {
	"Hair": IconHair,
	"Body": IconBody,
	"Skin": IconSkin,
	"Value Sets": IconValueSet,
	"Tan & SPF": IconTan,
	"Tan": IconTan,
}

const defMenuState = {
	1: false,
	2: false,
	3: false,
	4: false,
	5: false,
}

const MobileMenu = (props: any) => {
	const { mainMenu, menuBannerQuiz, menuBannerCode, userPts, isLoggedIn, swellLoyalty, store } = props;
	const { openDrawer, onToggleMobileNav } = props;
	const [menuStates, setMenuStates] = useState(defMenuState);
	const [storeSelection, setStoreSelection] = useState(false);
	let activeCurrency = 'USD';
	const [currency, setCurrency] = useState(activeCurrency);
	const mobileNavClick = (e) => {
		if (e.target !== e.currentTarget) return;
		props.onToggleMobileNav();
	}

	const handleAccount = (e) => {
		e.preventDefault();
		const url = !isLoggedIn ? '/pages/rewards' : '/account#rewards';
		window.location.href = url;
		// if (isLoggedIn) window.location.reload();
		if (isLoggedIn && window.location.pathname === '/account') window.location.reload();
	};

	const enableSwellAcc = swellLoyalty && swellLoyalty.enable_cart_swell_redemption;

	useEffect(() => {
		if (store === 'ca') {
            activeCurrency = 'CAD';
        } else if (store === 'uk') {
            activeCurrency = 'GBP';
        } else if (store === 'eu') {
            activeCurrency = 'EUR';
        } else if (store === 'au') {
            activeCurrency = 'AUD';
        } else if (store === 'int') {
            activeCurrency = 'SGD';
        } else if (store === 'my') {
            activeCurrency = 'MYR';
        }
		setCurrency(activeCurrency);
	}, [store]);

	useEffect(() => {
		setTimeout(() => {
			document.querySelectorAll('.subsubMenu.visible').forEach((a) => a?.scrollIntoView({ behavior: 'smooth' }));
		}, 200);
	}, [menuStates]);

	const menuBannerBundle = {
		cta: 'Build',
		line1: '<b>Build Your Bundle</b>',
		line2: 'Mix, match & save your way!',
		icon: 'heart',
		type: 'link-to',
		url: "/pages/build-your-own-bundle"
	}

	return (
		<nav id="mobile-nav" className={`mobile-nav z-[1050] fixed lg:hidden top-[0] bottom-[0] left-[0] [transition:opacity_.2s_linear] w-full h-full bg-[rgba(0,_0,_0,_0.6)] ${openDrawer ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
			<ul id="mobileMenu" className="h-full w-full [transition:transform_.1s_ease-in-out] overflow-y-auto overflow-x-hidden fixed h-100 col-12 bg-white list-unstyled py-2 mb-0 px-0"
			role="tablist" aria-multiselectable="true">
				<li key="toggle" className="flex justify-between mx-g py-[5px]" role="presentation">
					<a href="/" className="mx-auto lg:mx-0 py-1" aria-label="CocoAndEve Logo">
						<BrandLogo className="lg:h-[34px] overflow-hidden " />
					</a>
					<button type="button" onClick={() => onToggleMobileNav(false)} className={`mobile-nav__close svg absolute -mt-[25px] right-[0] pt-[25px] pr-[15px] pb-[40px] pl-[25px]`} aria-label="Close menu">
						<Close onClick={() => onToggleMobileNav(false)} className='svg w-[1em] h-[1em]' />
					</button>
				</li>
				{menuBannerCode && menuBannerCode.enable && (
					<MenuBanner content={menuBannerCode} theme='secondary-light' icon="percentage"/>
				)}
				{menuBannerQuiz && menuBannerQuiz.enable && (
					<MenuBanner content={menuBannerQuiz} theme='pink-light' icon="sun"/>
				)}
				{mainMenu?.map((menu, i) => {
					const hasRow = menu.rows;
					const m_title = menu.title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
					const icon = Icons[menu.title];
					const isSaleLink = ((menu.rows && menu.rows.length === 0 && menu.title.toLowerCase() !== 'sale') || (menu.title.toLowerCase() === 'sale'));
					return menu.handle !== '/collections/all' && (
						<li key={`mainmenu-${i}`} className="flex px-g py-0 border-b border-[#4E4E4E]" role="presentation">
							{isSaleLink && (
								<div className="flex w-full relative p-0 items-center justify-between m-0 pb-1 pt-2 border-b border-b-transparent">
									{(menu.rows && menu.rows.length === 0 && menu.title.toLowerCase() !== 'sale') && (
										<a href={menu.handle} className="w-full m-0 text-body flex">{menu.title}</a>
									)}
									{menu.title.toLowerCase() === 'sale' && (
										<a href={menu.handle} className="w-full m-0 text-body flex">{menu.title}</a>
									)}
								</div>
							)}
							{!isSaleLink && (
								<button id={m_title} className="flex w-full relative p-0 items-center m-0 py-1 border-b border-b-transparent" aria-controls={menu.title}
									onClick={() => {
										const newStates = {...defMenuState};
										newStates[i] = true;
										setMenuStates(newStates);
									}}>
									{ icon && (
										<picture className="rounded-[.5em] w-[80px] h-[40px] mr-1">
											{/* @ts-ignore */}
											<Image src={icon} alt={`Main Menu ${menu.title}`} className="block w-100 object-cover rounded-[.5em] w-[80px] h-[40px]" />
										</picture>
									)}

									{/* {(menu.rows && menu.rows.length === 0 && menu.title.toLowerCase() !== 'sale') && (
										<a href={menu.handle} className="w-full m-0 text-body flex">{menu.title}</a>
									)}
									{menu.title.toLowerCase() === 'sale' && (
										<a href={menu.handle} className="w-full m-0 text-body flex">{menu.title}</a>
									)} */}
									{menu.rows && menu.rows.length > 0 && menu.title.toLowerCase() !== 'sale' && (
										<h4 className="m-0 font-normal">{menu.title}</h4>
									)}
									{menu.rows && menu.rows.length > 0 && (
										<ChevronNext className="h-[1em] text-xs mb-25 ml-[auto]" onClick={() => {
											const newStates = {...defMenuState};
											newStates[i] = true;
											setMenuStates(newStates);
										}} />
									)}
								</button>
							)}
							
							{menu.rows && menu.rows.length > 0 && (
								<ul id={`subMenuSub${i}`} key={`subsubmenu ${menu.title}`} className={`subsubMenu z-[1000] w-full list-unstyled p-0 absolute bg-white w-100 left-0 top-0 min-h-[52.5em] ${menuStates[i] ? 'visible translate-x-[0] [transition:transform_0.15s_ease-in]' : 'invisible translate-x-full [transition:transform_0.15s_ease-out]'} ${openDrawer ? 'block opacity-100' : 'hidden opacity-0'}`} aria-labelledby={m_title}>
									<li key={`menuRow`} className="flex justify-between mx-g items-center py-[5px]">
										<button type="button" className="p-[20px] mb-0 -ml-[20px]" aria-label="Back to previous menu" onClick={() => {
											const newStates = {...defMenuState};
											newStates[i] = false;
											setMenuStates(newStates);
										}}>
											<ChevronPrev className="h-[1em]" />
										</button>
										<a href="/" className="text-body mx-auto py-[.6875em]" aria-label="CocoAndEve Logo">
											<BrandLogo className="lg:h-[34px]" />
										</a>
										<button type="button" onClick={() => onToggleMobileNav(false)} className='p-[20px] -mr-[20px]' aria-label="Close menu">
											<Close className="h-[1em]"  onClick={() => {
												// const newStates = {...defMenuState};
												// newStates[i] = false;
												// setMenuStates(newStates);
												onToggleMobileNav(false);
											}} />
										</button>
									</li>
									<li key="menuTitle" className="border-b p-0">
										<a href={menu.handle} className="h4 text-body px-g pb-1 pt-2 block mb-1">{menu.title}</a>
									</li>
									{menu.rows?.map((row, index) => {
										let title = row.title;
										if (title.toLowerCase().includes('accessories')) title = 'Accessories';
										if (title === 'Face Moisturizer') title = 'Face Moisturiser';
										if (title === 'Moisturiser') title = 'Moisturizers';
										if (title === 'Tan & SPF Sets') title = 'Tan Sets';
										return (
											<li key={`row-${row.handle}-${index}`} className="border-b p-0">
												<a href={row.handle} className="px-g pb-1 pt-2 block text-body no-underline">{title}</a>
											</li>
										);
									})}
									<li key="shopall" className="py-[.3125em] px-0">
										<a href={menu.handle} className="px-g pb-1 pt-2 block text-body no-underline">
											<strong>
												{menu.title === 'Value Sets' && (`Shop All ${menu.title}`)}
												{menu.title !== 'Value Sets' && (`Shop ${menu.title} Range`)}
											</strong>
										</a>
									</li>
								</ul>
							)}
						</li>
					)
				})}
				{enableSwellAcc && (
					<li key="bali-beauty-club" className="flex px-g w-full" role="presentation">
						{!isLoggedIn && (
								<a href="/pages/rewards" className="w-full m-0 py-1 text-body flex items-center">
									<picture className="block rounded-[.5em] w-[80px] h-[40px] min-w-[80px] flex items-center bg-pink-light mr-1">
										{/* @ts-ignore */}
										<Image src={IconBeauty} alt={`Bali Beauty Club`} className="block w-100 object-cover w-[80px] h-[40px]" />
									</picture>
									Bali Beauty Club <BeautyIcon className="ml-1 mr-1" />
								</a>
						)}
						{isLoggedIn && (
							<button onClick={handleAccount} className="w-full m-0 pb-1 pt-2 text-body flex">
								{userPts !== -1 && (
									<>{userPts} Points <BeautyIcon className="ml-1 mr-1" /></>
								)}
								{userPts === -1 && (
									<div className="spinner-border !border-[2px] !w-[1rem] !h-[1rem]" role="status" aria-hidden="true" />
								)}
								{/* <div className="spinner-border !border-[2px] !w-[1rem] !h-[1rem]" role="status" aria-hidden="true" /> */}
							</button>
						)}
					</li>
				)}
				{!enableSwellAcc && (
					<li key="my-account" className="flex px-g py-0 border-b w-full border-[#4E4E4E]" role="presentation">
						<a href="/account" className="w-full m-0 pb-1 pt-2 text-body flex">Account</a>
					</li>
				)}

				<MenuBanner content={menuBannerBundle} theme='pink-light' className="mt-g" icon="heart"/>

				<li key="shopall" className="my-g p-g" role="presentation">
					<a href="/collections/all" className="btn w-full btn-primary px-g py-g rounded-full" data-cy="shopall-btn">Shop All</a>
				</li>
				<li key="countries" className="px-g py-1 border-b mb-g border-[#4E4E4E]" role="presentation">
					<h4 id="countrySelect" className="flex items-center justify-between px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 relative collapsed p-0 font-normal" data-toggle="collapse" data-target="#collapseCountry" aria-expanded="false" aria-controls="collapseCountry"
						onClick={() => setStoreSelection(!storeSelection)}>
						{currency === 'SGD' && 'Rest of the World (SGD)'}
						{currency === 'USD' && 'USA (USD)'}
						{currency === 'CAD' && 'Canada (CAD)'}
						{currency === 'AUD' && 'Australia (AUD)'}
						{currency === 'EUR' && 'Europe (EUR)'}
						{currency === 'MYR' && 'Malaysia (MYR)'}
						{currency === 'GBP' && 'United Kingdom (GBP)'}
						<ChevronNext className={`h-[1em] text-xs ${storeSelection ? 'rotate-180' : ''}`} />
					</h4>
					<ul id="collapseCountry" className={`overflow-hidden list-unstyled card-body p-0 ${!storeSelection ? 'h-0' : 'h-full'} before:content-[''] before:border-t before:border-t-gray-100 before:block before:mt-1`} role="presentation"
						aria-labelledby="countrySelect" data-parent="#mobileMenu">
						<li key="c-us" className="pb-25 pt-g"><a href="https://www.cocoandeve.com?store=us" className='text-body'>USA (USD)</a></li>
						<li key="c-gb" className="py-25"><a href="https://www.cocoandeve.com?store=uk" className='text-body'>United Kingdom (GBP)</a></li>
						<li key="c-ca" className="py-25"><a href="https://www.cocoandeve.com?store=ca" className='text-body'>Canada (CAD)</a></li>
						<li key="c-au" className="py-25"><a href="https://www.cocoandeve.com?store=au" className='text-body'>Australia (AUD)</a></li>
						<li key="c-eu" className="py-25"><a href="https://www.cocoandeve.com?store=eu" className='text-body'>Europe (EUR)</a></li>
						<li key="c-sg" className="py-25"><a href="https://www.cocoandeve.com?store=int" className='text-body'>Rest of the World (SGD)</a></li>
						<li key="c-my" className="py-25"><a href="https://www.cocoandeve.com?store=my" className='text-body'>Malaysia (MYR)</a></li>
					</ul>
				</li>
				<li key="others" className="flex flex-wrap -mx-hg px-g pt-g" role="presentation">
					<a href="https://support.cocoandeve.com/en-GB" className="px-hg w-1/2 mb-1 text-body">Help</a>
					<a href="/pages/track-my-order" className="px-hg w-1/2 mb-1 text-body">Track my order</a>
					<a href="/pages/reviews" className="px-hg w-1/2 mb-1 text-body">Result IRL</a>
					<a href="/blogs/news" className="px-hg w-1/2 mb-1 text-body">Blog</a>
				</li>
			</ul>
		</nav>
	);
};

export default MobileMenu;
