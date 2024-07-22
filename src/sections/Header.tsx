import { useState, useEffect, useRef } from 'react';
import AnnouncementBar from '~/components/AnnouncementBar';
import NavMegaMenu from '~/compounds/NavMegaMenu';
import MobileMenu from '~/compounds/MobileMenu';
import BrandLogo from '~/images/ce-logo.svg';
import Account from '~/images/icons/account.svg';
import Search from '~/images/icons/search-thin.svg';
import CartIcon from '~/images/icons/cart.svg';
import SearchBox from '~/compounds/SearchBox';
import AccountDropdown from '~/compounds/AccountDropdown';
import NavMegaMenuAll from '~/compounds/NavMegaMenuAll';
import Tooltip from '~/components/Tooltip';
// import { useRouter } from 'next/navigation';
import PalmTree from '~/images/icons/palm-tree-v2.svg';

const Header = (props: any) => {
	const { store, swellLoyalty, searchBox, timerBar, annBar, mainMenu, menuBannerCode, menuBannerQuiz, disabledScroll,
		flashBubble, setFlashBubble, getCollectionProductsByHandle, dummy, cartCount, checkoutUrl,
		isAuthenticated, generalSetting, trackEvent, points, cartItems, setPoints, originalPts, openDropdownRegister, setOpenDropDownRegister } = props;
	const [openDrawer, setOpenDrawer] = useState(false);
	// const [openCartDrawer, setOpenCartDrawer] = useState(false);
	const [openSearchBox, setOpenSearchBox] = useState(false);
	const [openAccountBox, setOpenAccountBox] = useState(openDropdownRegister);
	const [scrolled, setScrolled] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
	const [sevenDaysSalesIds, setSevenDaysSalesIds] = useState([]);
	const [userPts, setUserPts] = useState(points || 50);
	// const router = useRouter();
	const onToggleMobileNav = () => {
		setOpenDrawer(!openDrawer);
	}

	const onToggleSearchBox = () => {
		setOpenSearchBox(!openSearchBox);
		// console.log('onToggleSearchBox', openSearchBox);
		if (!openSearchBox) document.querySelector('body').classList.add('overflow-y-hidden', 'search-panel-active');
		else document.querySelector('body').classList.remove('overflow-y-hidden', 'search-panel-active');
	}

	const toggleAccountDropdown = () => {
		if (isLoggedIn) {
			window.location.href = '/account'
		}
		else setOpenAccountBox(!openAccountBox);
	}

	useEffect(() => {
		setOpenAccountBox(openDropdownRegister);
	}, [openDropdownRegister]);

	useEffect(() => {
		setOpenDropDownRegister(openAccountBox);
	}, [openAccountBox]);

	const closeTip = () => {
		setFlashBubble(false);
	}

	const redirectAccount = (e) => {
		e.preventDefault();
		const url = !isLoggedIn ? '/pages/rewards' : '/account#rewards';
		window.location.href = url;
		// if (isLoggedIn) window.location.reload();
		if (isLoggedIn && window.location.pathname === '/account' && window.location.hash !== '#rewards') window.location.reload();
	};

	const accountRef = useRef(null);


	useEffect(() => {
		let lastScrollTop = 0;
		let scrollTop = 0;
		const handleScroll = (e:any) => {
			if (disabledScroll) {
				return false;
			}

			if (!openSearchBox) {
				scrollTop = window.scrollY;
				if (scrollTop < lastScrollTop) {
					if (scrollTop <= 0) {
						setScrolled(false);
					}
				} else if (scrollTop <= 0) {
					setScrolled(false);
				} else {
					setScrolled(true);
				}
				lastScrollTop = scrollTop;
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
		  window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		if (openDrawer) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}
	}, [openDrawer])

	useEffect(() => {
		// console.log('ThemeSettings', ThemeSettings, searchBox);
		fetch(`/api/sevenDaysSalesIds`).then(
			res => {
				res?.json().then(data => {
					const ids = data?.body?.data?.shop?.listIds?.value?.split(',') || [];
					setSevenDaysSalesIds(ids.map((i) => parseInt(i, 10)));
				})
			}
		);
	}, []);

	const checkingPoints = () => {
		if (points === null || points === 0) {
			fetch('/api/account/points').then((res) => res.json()).then((data) => setUserPts(data.points));
		}
	};

	useEffect(() => {
		setIsLoggedIn(isAuthenticated);
		checkingPoints();
	}, [isAuthenticated]);

	useEffect(() => {
		checkingPoints();
	}, [userPts]);


	useEffect(() => {
		const closeDropdown = (e) => {
			if (openAccountBox && !accountRef.current?.contains(e.target)) {
				setOpenAccountBox(false);
			}
		};
		document.addEventListener('mousedown', closeDropdown);
		return () => {
		    document.removeEventListener('mousedown', closeDropdown);
		  };
	}, [openAccountBox]);

	useEffect(() => {
		if (isLoggedIn && cartItems.length > 0) {
			let ptsUsed = 0;
			cartItems.map((item) => {
				const attribs = item.attributes && item.attributes.find((i) => i.key === '_swell_discount_type' && i.value === 'product') || false;
				if (attribs) {
					// attribs.map((item) => getId(item.merchandise.id))
					const obj = item.attributes && item.attributes.find((i) => i.key === '_swell_points_used');
					ptsUsed += obj.value ? parseInt(obj.value, 10) : 0;
				}
			});
			if (ptsUsed > 0) {
				setPoints(points - ptsUsed);
				setUserPts(points - ptsUsed);
			} else {
				setPoints(originalPts);
				setUserPts(originalPts);
			}
		}
	}, [cartItems, isLoggedIn]);

	return (
		<>
			<header className={`main-header z-[1030] w-full ${scrolled ? 'fixed top-0 shadow-md header--scrolled' : 'relative'}`} ref={accountRef}>
				{annBar?.enabled && (
					<AnnouncementBar
						scrolled={scrolled}
						text={annBar.text}
						url={annBar.url}
						text2={annBar.text2}
						url2={annBar.url2}
						text3={annBar.text3}
						url3={annBar.url3}
						timerData={timerBar}
					/>
				)}

				<nav className={`bg-white relative flex flex-wrap items-center justify-between px-hg z-[1000]`}>
					<div className={`container px-0 lg:px-g flex flex-wrap lg:flex-nowrap items-center justify-between ${flashBubble ? 'relative' : ''}`}>
						<button className="text-lg border-0 [flex-basis:30%] lg:hidden" type="button" data-cy="menu-icon" aria-label="Mobile navbar toggler" onClick={onToggleMobileNav}>
							<span className="block w-[1.25em] h-[2px] bg-[#151515] relative before:-top-[.4em] before:w-[1.05em] before:h-[2px] before:bg-[#151515] before:absolute before:left-[0] after:content-[''] after:h-[2px] after:bg-body after:absolute after:left-[0] after:w-[.95em] after:top-[.4em]"></span>
						</button>
						<a href="/" className="inline-block py-[11.250px] lg:py-[14.531px] lg:[flex-basis:15%] mx-auto lg:mx-0"  aria-label="Visit Coco and Eve homepage">
							<BrandLogo className="lg:h-[2.578rem]" />
						</a>
						<ul className="header-desktop-nav list-reset pl-0 mb-0 hidden lg:flex lg:[flex-basis:auto] lg:flex-row">
							{mainMenu && mainMenu.map((nav, i) => {
								if (['Help', 'Blog', 'Results IRL', 'Aide', 'Hilfe'].indexOf(nav.title) === -1) {
									return (
										<li key={`mainMenu-${i}`} className={`nav-item ${i === 0 ? 'pr-hg' : 'px-hg'}`}>
											<a href={`${nav.handle}`} className="inline-block no-underline m-0 text-body font-bold py-[.375em] hover:no-underline hover:text-primary">{nav.title}</a>
											{nav.title.includes('Shop') && (
												<NavMegaMenuAll
													title={nav.title}
													menus={mainMenu || []}
													getCollectionProductsByHandle={getCollectionProductsByHandle}
													listIds={sevenDaysSalesIds}
													dummy={dummy}
													generalSetting={generalSetting}
												/>
											)}
											{['Hair', 'Tan', 'Tan & SPF', 'Suncare', 'Body', 'Value Sets', 'Skin', 'Skincare'].indexOf(nav.title) > -1 && (
												<NavMegaMenu
													title={nav.title}
													handle={nav.handle.replace('/collections/', '')}
													url={nav.handle}
													menus={nav.rows || []}
													getCollectionProductsByHandle={getCollectionProductsByHandle}
													listIds={sevenDaysSalesIds}
													dummy={dummy}
													store={store}
												/>
											)}
										</li>
									);
								}
							})}
							<li key="line" className="nav-item px-hg">
								<a className="inline-block no-underline m-0 fw-bold text-body font-bold py-[.375em]">|</a>
							</li>
							<li key="result-irl" className="nav-item px-hg">
								<a href="/pages/reviews" className="inline-block no-underline m-0 fw-bold text-body font-bold py-[.375em]">Results IRL</a>
							</li>
						</ul>

						<ul className="basis-[30%] lg:[flex-basis:auto] flex flex-wrap list-reset pl-0 mb-0 navbar-nav--right flex-row justify-end items-center ">
							{swellLoyalty && swellLoyalty.enable_cart_swell_redemption && (
								<>
									<li key="bbc" className="hidden lg:flex pr-hg">
										<a href={`${!isLoggedIn ? '/pages/rewards' : '/account#rewards'}`} onClick={redirectAccount} className="h4 m-0 flex !font-bold text-body py-[6px] lg:py-hg lg:leading-[1.375em] hover:text-primary hover:no-underline">
											{!isLoggedIn ? 'Bali Beauty Club' : `${userPts} Points`}
											<PalmTree className="mx-1 h-2" />
										</a>
									</li>
									<li key="empty" className="nav-item px-0 d-none d-lg-flex"><span className="h-2 border-l-2 mr-1 hidden lg:flex "></span></li>
								</>
							)}
							<li key="account" id="dropdownMenuForm" className=" relative dropdown--account pl-1 mr-1 lg:mr-0 lg:pr-hg">
								<button onClick={toggleAccountDropdown} className="nav-link h4 m-0 d-flex text-uppercase font-bold py-[6px] lg:py-hg" data-cy="account-icon" aria-haspopup="true" aria-expanded="false">
									<Account className={`text-[1.375em] h-[1em] mr-[5px] ${openAccountBox ? 'fill-primary' : ''}`} />
								</button>
								{!isLoggedIn && (
									<AccountDropdown annBarEnabled={annBar?.enabled} scrolled={scrolled} swellLoyalty={swellLoyalty} openAccountBox={openAccountBox} toggleAccountDropdown={toggleAccountDropdown} />
								)}
							</li>
							<li key="search" className="nav-item pr-g lg:pl-hg">
								<button type="button" className="h4 m-0 flex font-bold py-[6px] lg:py-hg" data-cy="search-icon" onClick={onToggleSearchBox}>
									<Search className="text-[1.5625em] lg:text-[1.375em] h-[1em]" />
								</button>
							</li>
							<li key="cart" className="nav-item d-flex lg:pl-hg">
								<a className="flex justify-center items-center [flex-flow:column] relative py-[6px] lg:py-hg h4 !font-normal" data-toggle="modal" data-target="#cart-drawer" role="button" data-cy="cart-icon" onClick={() => props.onToggleCart()}>
									<CartIcon className="text-[1.5625em] h-[1em] lg:text-[27.5px] lg:h-[27.5px]"/>
									<span className="cart-drawer__count absolute leading-[1] text-xs lg:text-[15px] h-full top-[50%] left-[50%] text-body h-100 font-[Arial,_Helvetica,_sans-serif] -translate-x-[50%] -translate-y-[7.5%] lg:-translate-y-[12.5%]">{cartCount || 0}</span>
								</a>
							</li>
						</ul>
						<Tooltip tooltipShow={flashBubble} closeTip={closeTip} checkoutUrl={checkoutUrl}/>
					</div>
				</nav>
				<MobileMenu
					onToggleMobileNav={onToggleMobileNav}
					openDrawer={openDrawer}
					mainMenu={mainMenu}
					menuBannerCode={menuBannerCode}
					menuBannerQuiz={menuBannerQuiz}
					userPts={userPts}
					isLoggedIn={isLoggedIn}
					swellLoyalty={swellLoyalty}
				/>
				<SearchBox openAccountBox={openAccountBox} dummy={dummy} content={searchBox} onToggleSearchBox={onToggleSearchBox} trackEvent={trackEvent} openSearchBox={openSearchBox} />

			</header>
			{/*<Cart showCart={openCartDrawer} handleClose={handleClose}/>*/}
		</>
	);
};

export default Header;
