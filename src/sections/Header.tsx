import dynamic from 'next/dynamic';
import { useCallback, useRef as useReactRef } from 'react';

import { useState, useEffect, useRef } from 'react';
import AnnouncementBar from '~/components/AnnouncementBar';
import NavMegaMenu from '~/compounds/NavMegaMenu';
// import MobileMenu from '~/compounds/MobileMenu';
// const MobileMenu = dynamic(() => import('~/compounds/MobileMenu'), { ssr: false });
const MobileMenuDrop = dynamic(() => import('~/compounds/MobileMenuDrop'), { ssr: false });
import BrandLogo from '~/images/ce-logo.svg';
import Account from '~/images/icons/account-ico2.svg';
import Account2 from '~/images/icons/acc-ico.svg';
import Search from '~/images/icons/search-ico.svg';
import CartIcon from '~/images/icons/cart-ico.svg';
// import SearchBox from '~/compounds/SearchBox';
const SearchBox = dynamic(() => import('~/compounds/SearchBox'), { ssr: false });
import AccountDropdown from '~/compounds/AccountDropdown';
import NavMegaMenuShop from '~/compounds/NavMegaMenuShop';
import NavMegaMenuMadeForYou from '~/compounds/NavMegaMenuMadeForYou';
import NavMegaMenuExplore from '~/compounds/NavMegaMenuExplore';
import NavMegaMenuAskCoco from '~/compounds/NavMegaMenuAskCoco';
import Tooltip from '~/components/Tooltip';
// import { useRouter } from 'next/navigation';
import PalmTree from '~/images/icons/palm-tree-v2.svg';

const Header = (props: any) => {
	const { store, swellLoyalty, searchBox, timerBar, annBar, mainMenu, menuBannerCode, menuBannerQuiz, disabledScroll,
		flashBubble, setFlashBubble, getCollectionProductsByHandle, dummy, cartCount, checkoutUrl,
		isAuthenticated, generalSetting, trackEvent, points, cart, cartItems, setPoints, originalPts, openDropdownRegister, setOpenDropDownRegister,
		getFeaturedImgMeta, checkintPoints, addingReward, setAccountPage, accountPageKey, initialStore, mainNav,
		hairRanges, buildProductCardModel, addToCart, preOrders, setWaitlistData, globalNav,
	} = props;
	const [openDrawer, setOpenDrawer] = useState(false);
	// const [openCartDrawer, setOpenCartDrawer] = useState(false);
	const [openSearchBox, setOpenSearchBox] = useState(false);
	const [openAccountBox, setOpenAccountBox] = useState(openDropdownRegister);
	const [scrolled, setScrolled] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
	const [sevenDaysSalesIds, setSevenDaysSalesIds] = useState([]);
	const [userPts, setUserPts] = useState(points || 0);
	const [flashBubbleWrapper, setFlashBubbleWrapper] = useState(false);
	const [activeMainMenu, setActiveMainMenu] = useState(mainMenu);
	const [hoveredNav, setHoveredNav] = useState<string | null>(null);
	const megaMenuCache = useReactRef<Record<string, any>>({});
	const megaLeaveTimer = useReactRef<ReturnType<typeof setTimeout> | null>(null);

	const handleNavMegaEnter = useCallback((type: string | null) => {
		if (megaLeaveTimer.current) clearTimeout(megaLeaveTimer.current);
		setHoveredNav(type);
	}, []);

	const handleNavMegaLeave = useCallback(() => {
		megaLeaveTimer.current = setTimeout(() => setHoveredNav(null), 150);
	}, []);
	const headerRef = useReactRef<HTMLElement>(null);
	const headerHeightRef = useReactRef<number>(0);
	const annBarRef = useReactRef<HTMLDivElement>(null);
	const [headerHeight, setHeaderHeight] = useState(0);
	const [nav, setNav] = useState(globalNav?.nav || []);

	useEffect(() => {
		console.log('NAVV', nav);
		console.log('globalNav3', globalNav);
	}, [nav])
	useEffect(() => {
		if (!initialStore) {
			setActiveMainMenu(store === 'us' ? mainNav : mainMenu);
		}
	}, [initialStore, store, mainNav, mainMenu]);
	// const router = useRouter();
	const onToggleMobileNav = () => {
		setOpenDrawer(!openDrawer);
	}
	const handleSearchBox = (title) => {
		const megaMenuTitles = ['Hair', 'Tan', 'Tan & SPF', 'Suncare', 'Body', 'Value Sets', 'Skin', 'Skincare'];
		if (title.includes('Shop') || ['Hair', 'Tan', 'Tan & SPF', 'Suncare', 'Body', 'Value Sets', 'Skin', 'Skincare'].indexOf(title) > -1) {
			setOpenSearchBox(false);
			document.querySelector('body').classList.remove('overflow-y-hidden', 'search-panel-active');
		}
	};

	useEffect(() => {
		setTimeout(() => {
			setFlashBubbleWrapper(flashBubble);
		}, 400);
	}, [flashBubble]);

	const onToggleSearchBox = () => {
		handleAccountBoxChange(false);
		setOpenSearchBox(!openSearchBox);
		// console.log('onToggleSearchBox', openSearchBox);
		if (!openSearchBox) document.querySelector('body').classList.add('overflow-y-hidden', 'search-panel-active');
		else document.querySelector('body').classList.remove('overflow-y-hidden', 'search-panel-active');
	}

	const toggleAccountDropdown = () => {
		if (isLoggedIn) {
			window.location.href = '/account'
		}
		else handleAccountBoxChange(!openAccountBox);
		setOpenSearchBox(false);
		document.querySelector('body').classList.remove('overflow-y-hidden', 'search-panel-active');
	}

	useEffect(() => {
		if (openDropdownRegister !== openAccountBox) {
			setOpenAccountBox(openDropdownRegister);
		}
	}, [openDropdownRegister]);

	const handleAccountBoxChange = useCallback((newValue: boolean) => {
		setOpenAccountBox(newValue);
		setOpenDropDownRegister(newValue);
	}, [setOpenDropDownRegister]);

	const closeTip = () => {
		setFlashBubble(false);
	}

	const redirectAccount = (e) => {
		e.preventDefault();
		const url = !isLoggedIn ? '/pages/rewards' : '/account#rewards';
		window.location.href = url;
		if (isLoggedIn && typeof setAccountPage === 'function' && accountPageKey) {
			setAccountPage(accountPageKey.REWARDS);
		}
		// if (isLoggedIn) window.location.reload();
		if (isLoggedIn && window.location.pathname === '/account' && window.location.hash !== '#rewards') window.location.reload();
	};

	const accountRef = useRef(null);

	const handleScroll = useCallback(() => {
		if (disabledScroll || openSearchBox) return;

		const scrollTop = window.scrollY;
		if (scrollTop > 0 && !scrolled && headerRef.current) {
			const h = headerRef.current.offsetHeight;
			headerHeightRef.current = h;
			setHeaderHeight(h);
		}
		setScrolled(scrollTop > 0);
	}, [openSearchBox, disabledScroll, scrolled]);

	useEffect(() => {
		const el = headerRef.current;
		if (!el) return;
		const ro = new ResizeObserver(() => {
			if (!scrolled) {
				headerHeightRef.current = el.offsetHeight;
			}
		});
		ro.observe(el);
		headerHeightRef.current = el.offsetHeight;
		return () => ro.disconnect();
	}, [scrolled]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [handleScroll]);

	useEffect(() => {
		if (openDrawer) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}
	}, [openDrawer])

	useEffect(() => {
		if (generalSetting?.bfcm_cta_bg_color === 'bg-dark') {
			document.body.classList.add('bfcm-dark-layout');
		} else {
			document.body.classList.remove('bfcm-dark-layout');
		}
	}, [generalSetting])

	{/*
	useEffect(() => {
		// console.log('ThemeSettings', ThemeSettings, searchBox);
		commented seven days, checked on live store its not used
		fetch(`/api/sevenDaysSalesIds`).then(
			res => {
				res?.json().then(data => {
					const ids = data?.body?.data?.shop?.listIds?.value?.split(',') || [];
					setSevenDaysSalesIds(ids.map((i) => parseInt(i, 10)));
				})
			}
		);
	}, []);
	*/}

	// const checkingPoints = () => {
	// 	if (points === null || points === 0) {
	// 		fetch('/api/account/points').then((res) => res.json()).then((data) => setUserPts(data.points));
	// 	}
	// };

	useEffect(() => {
		setIsLoggedIn(isAuthenticated);
		// checkingPoints();
	}, [isAuthenticated]);

	// useEffect(() => {
	// 	checkingPoints();
	// }, [userPts]);


	useEffect(() => {
		const closeDropdown = (e) => {
			if (openAccountBox && !accountRef.current?.contains(e.target)) {
				handleAccountBoxChange(false);
			}
		};
		document.addEventListener('mousedown', closeDropdown);
		return () => {
			document.removeEventListener('mousedown', closeDropdown);
		};
	}, [openAccountBox]);

	useEffect(() => {
		checkintPoints(cart).then((pts) => {
			setUserPts(pts)
		});
	}, [cart]);

	useEffect(() => {
		if (isLoggedIn && addingReward) setUserPts(-1);
	}, [addingReward]);

	useEffect(() => {
		// console.log('props open searchbox', openSearchBox);
		if (openSearchBox) document.body.classList.add('!overflow-y-hidden');
		else document.body.classList.remove('!overflow-y-hidden');
	}, [openSearchBox]);

	return (
		<>
			<div style={{ height: scrolled ? headerHeight : 0 }} />
			<header className={`main-header z-[1030] w-full ${scrolled ? 'fixed top-0 shadow-md header--scrolled' : 'relative'}`} ref={(el) => { headerRef.current = el; accountRef.current = el; }}>
				<div ref={annBarRef}>
					{(annBar?.enabled || (!annBar.loaded && !annBar.enabled)) && (
						<AnnouncementBar
							loaded={annBar?.loaded}
							scrolled={scrolled}
							text={annBar.text}
							url={annBar.url}
							text2={annBar.text2}
							url2={annBar.url2}
							text3={annBar.text3}
							url3={annBar.url3}
							timerData={timerBar}
							isScrollEnabled={annBar?.isScrollEnabled || false}
							isStickyEnabled={annBar?.isStickyEnabled || false}
							background={annBar?.background || 'bg-primary-light'}
							textColor={annBar?.textColor || 'text-secondary'}
							textSize={annBar?.textSize || 16}
						/>
					)}
				</div>

				<nav className={`bg-white relative flex flex-wrap items-center justify-between px-g lg:px-hg z-[1000]`}>
					<div className={`container px-0 lg:px-g flex flex-wrap lg:flex-nowrap items-center justify-between ${flashBubbleWrapper || flashBubble ? 'relative' : ''}`}>
						{/* Mobile hamburger + account */}
						<div className="[flex-basis:30%] lg:hidden flex items-center gap-[16px]">
							<button className="text-[13px] border-0 h-[40px]" type="button" data-cy="menu-icon" aria-label="Mobile navbar toggler" onClick={onToggleMobileNav}>
								{/* <span className="block w-[1.25em] h-[2px] bg-[#151515] relative before:-top-[.4em] before:w-[1.05em] before:h-[2px] before:bg-[#151515] before:absolute before:left-[0] after:content-[''] after:h-[2px] after:bg-body after:absolute after:left-[0] after:w-[.95em] after:top-[.4em]"></span> */}
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.823123C0 0.368749 0.374374 0 0.84281 0H12.6311C13.0963 0 13.4739 0.365312 13.4739 0.823123C13.4739 1.2775 13.0995 1.64593 12.6311 1.64593H0.84281C0.377651 1.64593 0 1.28062 0 0.823123ZM0 5.76012C0 5.30574 0.379533 4.93699 0.837811 4.93699H15.1622C15.625 4.93699 16 5.30262 16 5.76012C16 6.21449 15.6205 6.58324 15.1622 6.58324H0.837811C0.375002 6.58324 0 6.21761 0 5.76012ZM0 10.6968C0 10.2424 0.378906 9.87398 0.847968 9.87398H10.9414C11.4098 9.87398 11.7894 10.2393 11.7894 10.6968C11.7894 11.1512 11.4106 11.5199 10.9414 11.5199H0.847968C0.379533 11.5199 0 11.1546 0 10.6968Z" fill="#151515"/>
								</svg>
							</button>
							<button onClick={toggleAccountDropdown} className="flex items-center p-0 border-0 bg-transparent" aria-label="Account">
								<Account2 style={{ width: 15, height: 16 }} />
							</button>
							{!isLoggedIn && (
								<AccountDropdown store={store} timerData={timerBar} annBarEnabled={annBar?.enabled} scrolled={scrolled} swellLoyalty={swellLoyalty} openAccountBox={openAccountBox} isStickyEnabled={annBar?.isStickyEnabled} isScrollEnabled={annBar?.isScrollEnabled} toggleAccountDropdown={toggleAccountDropdown} generalSetting={generalSetting} />
							)}
						</div>

						{/* Desktop left nav */}
						{/*
						{activeMainMenu.length > 0 && (
							<ul className="header-desktop-nav list-reset pl-0 mb-0 hidden lg:flex lg:flex-1 lg:flex-row items-center">
								{activeMainMenu.map((nav, i) => {
									if (['Help', 'Blog', 'Results IRL', 'Aide', 'Hilfe', 'Rewards'].indexOf(nav.title) > -1) return null;
									return (
										<li key={`mainMenu-${i}`} className={`nav-item ${i === 0 ? 'pr-hg' : 'px-hg'}`}
											onMouseEnter={() => { handleSearchBox(nav.title); setHoveredNav(nav.handle); }}
											onMouseLeave={() => setHoveredNav(null)}
										>
											<a href={`${nav.handle}?c=main-menu`} className="inline-block no-underline m-0 text-body font-bold py-[.375em] hover:no-underline hover:text-primary">{nav.title}</a>
											{nav.title.includes('Shop') && (
												<NavMegaMenuShop
													store={store}
													generalSetting={generalSetting}
													dummy={dummy}
													hairRanges={hairRanges}
													buildProductCardModel={buildProductCardModel}
													addToCart={addToCart}
													trackEvent={trackEvent}
													preOrders={preOrders}
													setWaitlistData={setWaitlistData}
												/>
											)}
											{nav.title === 'Made For You' && (
												<NavMegaMenuMadeForYou generalSetting={generalSetting} />
											)}
											{nav.title === 'Explore' && (
												<NavMegaMenuExplore store={store} generalSetting={generalSetting} />
											)}
										</li>
									);
								})}
								<li key="rewards" className="nav-item px-hg">
									<a href="/pages/rewards?c=main-menu" className="inline-block no-underline m-0 text-body font-bold py-[.375em] hover:no-underline hover:text-primary">Rewards</a>
								</li>
							</ul>
						)}
						*/}
						<ul className="header-desktop-nav list-reset pl-0 mb-0 hidden lg:flex lg:flex-1 lg:flex-row items-center">
							{nav.length && nav.filter(item => item.megaMenu?.type !== 'askCoco').map((item, i) => (
								<li
									key={item.label}
									className={`nav-item ${i === 0 ? 'pr-hg' : 'px-hg'}`}
									onMouseEnter={() => handleNavMegaEnter(item.megaMenu?.type || null)}
									onMouseLeave={handleNavMegaLeave}
								>
									<a href={item.url || '#'} className="inline-block no-underline m-0 text-body font-bold py-[.375em] hover:no-underline hover:text-primary">{item.label}</a>
								</li>
							))}
						</ul>

						{/* Logo — centered */}
						<a href="/" className="inline-block py-[8px] lg:py-[15.39px] mx-auto" aria-label="Visit Coco and Eve homepage">
							<BrandLogo className="lg:h-[2.578rem]" />
						</a>

						{/* Right nav */}
						<ul className="basis-[30%] lg:flex-1 flex list-reset pl-0 mb-0 navbar-nav--right flex-row justify-end items-center gap-[20px]">
							{nav.filter((item: any) => item.megaMenu?.type === 'askCoco').map((item: any) => (
								<li key={item.label} className="nav-item hidden lg:block">
									<a className="inline-block no-underline m-0 font-bold py-[.375em] hover:no-underline text-body hover:text-primary cursor-pointer whitespace-nowrap">
										{item.label}
									</a>
									<NavMegaMenuAskCoco generalSetting={generalSetting} megaMenu={item.megaMenu} />
								</li>
							))}
							<li key="account" id="dropdownMenuForm" className="relative dropdown--account hidden lg:flex items-center">
								<button onClick={toggleAccountDropdown} className="flex items-center p-0 border-0 bg-transparent" data-cy="account-icon" aria-haspopup="true" aria-expanded="false" aria-label="Account">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 22" width="16" height="16"><path d="M19.1 18.2c0-1.8-.8-3.7-2.1-4.9-1.3-1.3-3.1-2-5-2H7.1c-1.9 0-3.6.7-5 2C.8 14.6 0 16.4 0 18.2v3.2h19.1v-3.2zm-12-4.9H12c1.3 0 2.6.5 3.6 1.4.9.9 1.5 2.2 1.5 3.5v1.2h-15v-1.2c0-1.3.5-2.6 1.5-3.5.9-.9 2.2-1.4 3.5-1.4zm2.4-3.2c.1 0 .1 0 0 0 1.4 0 2.7-.5 3.7-1.5 1-.9 1.5-2.2 1.5-3.6 0-1.3-.5-2.6-1.5-3.6C12.3.5 11 0 9.6 0h-.1C8.2 0 6.9.5 6 1.5 5 2.4 4.4 3.7 4.4 5c0 1.4.5 2.7 1.5 3.6 1 1 2.3 1.5 3.6 1.5zM6.4 5c0-.8.3-1.6.9-2.2.6-.5 1.4-.8 2.2-.8.8 0 1.6.3 2.2.9l.2.1c.6.6.9 1.3.8 2.1 0 .8-.3 1.6-.9 2.1-.6.6-1.4.9-2.2.9-.8 0-1.6-.3-2.2-.9-.6-.5-1-1.3-1-2.2z"></path></svg>
								</button>
								{!isLoggedIn && (
									<AccountDropdown store={store} timerData={timerBar} annBarEnabled={annBar?.enabled} scrolled={scrolled} swellLoyalty={swellLoyalty} openAccountBox={openAccountBox} isStickyEnabled={annBar?.isStickyEnabled} isScrollEnabled={annBar?.isScrollEnabled} toggleAccountDropdown={toggleAccountDropdown} generalSetting={generalSetting} />
								)}
							</li>
							<li key="search" className="flex items-center">
								<button type="button" className="flex items-center p-0 border-0 bg-transparent" data-cy="search-icon" onClick={onToggleSearchBox} aria-label="Search">
									<Search className={`hover:fill-primary ${openSearchBox ? 'fill-primary' : ''}`} style={{ width: 16, height: 16 }} />
								</button>
							</li>
							<li key="cart" className="flex items-center">
								<a className="text-body hover:text-primary hover:fill-primary flex items-center gap-[3px]" data-toggle="modal" data-target="#cart-drawer" tabIndex={0} role="button" data-cy="cart-icon" onClick={() => props.onToggleCart()}>
									<CartIcon style={{ width: 15, height: 17 }} />
									<span className="cart-drawer__count font-bold">{cartCount || 0}</span>
								</a>
							</li>
						</ul>
						</div>
					{/* Mega menus outside the container div so flashBubble's `relative` class doesn't break their width */}
					{nav.length > 0 && nav.filter((item: any) => item.megaMenu?.type !== 'askCoco').map((item: any) => (
						<div
							key={`mega-wrapper-${item.label}`}
							style={{ display: (hoveredNav === item.megaMenu?.type) ? 'block' : 'none' }}
							onMouseEnter={() => handleNavMegaEnter(item.megaMenu?.type || null)}
							onMouseLeave={handleNavMegaLeave}
						>
							{item.megaMenu?.type === 'shop' && (
								<NavMegaMenuShop
									store={store}
									generalSetting={generalSetting}
									dummy={dummy}
									hairRanges={hairRanges}
									megaMenu={item.megaMenu}
									buildProductCardModel={buildProductCardModel}
									addToCart={addToCart}
									trackEvent={trackEvent}
									preOrders={preOrders}
									setWaitlistData={setWaitlistData}
								/>
							)}
							{item.megaMenu?.type === 'madeForYou' && (
								<NavMegaMenuMadeForYou generalSetting={generalSetting} megaMenu={item.megaMenu} />
							)}
							{item.megaMenu?.type === 'explore' && (
								<NavMegaMenuExplore store={store} generalSetting={generalSetting} megaMenu={item.megaMenu} />
							)}
						</div>
					))}
				</nav>
				{/* Tooltip outside <nav> so its z-[1035] competes in <header>'s stacking context, above SearchBox z-[1020] */}
				<Tooltip tooltipShow={flashBubble} closeTip={closeTip} checkoutUrl={checkoutUrl} generalSetting={generalSetting} />
				{openDrawer && (
					<MobileMenuDrop
						onToggleMobileNav={onToggleMobileNav}
						isLoggedIn={isLoggedIn}
						cartCount={cartCount}
						store={store}
						generalSetting={generalSetting}
						onToggleCart={() => props.onToggleCart()}
						onToggleSearchBox={onToggleSearchBox}
						toggleAccountDropdown={toggleAccountDropdown}
						annBarHeight={annBarRef.current?.offsetHeight ?? 0}
						nav={nav}
					/>
				)}
				{/* {openDrawer && (
					<MobileMenu
						onToggleMobileNav={onToggleMobileNav}
						openDrawer={openDrawer}
						mainMenu={activeMainMenu}
						menuBannerCode={menuBannerCode}
						menuBannerQuiz={menuBannerQuiz}
						userPts={userPts}
						isLoggedIn={isLoggedIn}
						swellLoyalty={swellLoyalty}
						generalSetting={generalSetting}
						store={store}
					/>
				)} */}
				{openSearchBox && (
					<SearchBox
						store={store}
						openAccountBox={openAccountBox}
						dummy={dummy}
						content={searchBox}
						onToggleSearchBox={onToggleSearchBox}
						trackEvent={trackEvent}
						openSearchBox={openSearchBox}
						getFeaturedImgMeta={getFeaturedImgMeta}
						addToCart={addToCart}
						setWaitlistData={setWaitlistData}
						preOrders={preOrders}
						generalSetting={generalSetting}
					/>
				)}

			</header>
			{/*<Cart showCart={openCartDrawer} handleClose={handleClose}/>*/}
		</>
	);
};

export default Header;
