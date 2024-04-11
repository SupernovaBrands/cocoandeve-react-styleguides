import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AnnouncementBar from '@/components/AnnouncementBar';
import NavMegaMenu from '@/compounds/NavMegaMenu';
import MobileMenu from '@/compounds/MobileMenu';
import BrandLogo from '../../src/images/ce-logo.svg';
import Account from '../../src/images/icons/account.svg';
import Search from '../../src/images/icons/search-thin.svg';
import CartIcon from '../../src/images/icons/cart.svg';
import Cart from '@/components/cart/cart';
import SearchBox from '@/compounds/SearchBox';
import AccountDropdown from '@/compounds/AccountDropdown';
import NavMegaMenuAll from '@/compounds/NavMegaMenuAll';

const NAV_MEGA_MENU_TEMP = [
	{
		title: 'Hair',
		url: '/'
	},
	{
		title: 'Self Tan',
		url: '/'
	},
	{
		title: 'Body',
		url: '/'
	},
	{
		title: 'Value Sets',
		url: '/'
	}
]

const NAV_MEGA_MENU_CARD_TEMP = [
	{
		title: 'Bali Bronzing Foam in two lines',
		url: '/'
	},
	{
		title: 'Bali Bronzing Foam in two lines 2',
		url: '/'
	},
	{
		title: 'Bali Bronzing Foam in two lines',
		url: '/'
	}
]

const Header = (props) => {
	const [announcementBarEnabled, setAnnouncementBarEnabled] = useState(true);
	const [openDrawer, setOpenDrawer] = useState(false);
	const [openCartDrawer, setOpenCartDrawer] = useState(false);
	const [openSearchBox, setOpenSearchBox] = useState(false);
	const [openAccountBox, setOpenAccountBox] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const onToggleMobileNav = () => {
		setOpenDrawer(!openDrawer);
	}

	const onToggleCart = () => {
		setOpenCartDrawer(!openDrawer);
	}

	const onToggleSearchBox = () => {
		console.log('onToggleSearchBox');
		setOpenSearchBox(!openSearchBox);
	}

	const toggleAccountDropdown = () => {
		setOpenAccountBox(!openAccountBox);
	}

	const handleClose = (): void => { // Add type annotation for function
		setOpenCartDrawer(false);
	}

	useEffect(() => {
		let lastScrollTop = 0;
		let scrollTop = 0;
		const handleScroll = (e) => {
			if (!openSearchBox) {
				console.log('Scrolled!', window.scrollY);
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

	return (
		<>
			<header className={`main-header z-[1000] w-full ${scrolled ? 'fixed top-0 shadow-md' : ''}`}>
				{announcementBarEnabled && (
					<AnnouncementBar
						text="Up to 25% off + Free Gift worth $25.40"
						url="/"
						countDownStart=""
						countDownEnd=""
						countDownDays=""
						countDownDay=""
						countDownHrs=""
						countDownHr=""
						countDownMin=""
						countDownSec=""
					/>
				)}

				<nav className="bg-white relative flex flex-wrap items-center justify-between px-hg z-[1000]">
					<div className="container px-0 lg:px-g flex flex-wrap lg:flex-nowrap items-center justify-between">
						<button className="text-lg border-0 [flex-basis:30%] lg:hidden" type="button" data-cy="menu-icon" aria-label="Mobile navbar toggler" onClick={onToggleMobileNav}>
							<span className="block w-[1.25em] h-[2px] bg-[#151515] relative before:-top-[.4em] before:w-[1.05em] before:h-[2px] before:bg-[#151515] before:absolute before:left-[0] after:content-[''] after:h-[2px] after:bg-body after:absolute after:left-[0] after:w-[.95em] after:top-[.4em]"></span>
						</button>
						<a href="#" className="inline-block pt-[.5625em] pb-[.5625em] lg:pt-[14.5px] lg:pb-[14.5px] lg:[flex-basis:15%] mx-auto lg:mx-0"  aria-label="Visit Coco and Eve homepage">
							<BrandLogo className="lg:h-[41px]" />
						</a>
						<ul className="header-desktop-nav list-reset pl-0 mb-0 hidden lg:flex lg:[flex-basis:auto] lg:flex-row">
							<li className="nav-item pr-hg">
								<a href="#" className="inline-block no-underline m-0 text-body font-bold p-[.375em]">SALE</a>
							</li>
							<li className="nav-item px-hg">
								<a href="#" className="inline-block no-underline m-0 text-body font-bold py-[.375em]">Shop All</a>
								<NavMegaMenuAll
									title="Shop All"
									menus={NAV_MEGA_MENU_TEMP}
									cards={NAV_MEGA_MENU_CARD_TEMP}
								/>
							</li>
							<li className="nav-item px-hg">
								<a href="#" className="inline-block no-underline m-0 text-body font-bold py-[.375em]">Hair</a>
								<NavMegaMenu
									title="Hair"
									menus={NAV_MEGA_MENU_TEMP}
									cards={NAV_MEGA_MENU_CARD_TEMP}
								/>
							</li>
							<li className="nav-item px-hg">
								<a href="#" className="inline-block no-underline m-0 text-body font-bold py-[.375em]">Tan & SPF</a>
								<NavMegaMenu
									title="Hair"
									menus={NAV_MEGA_MENU_TEMP}
									cards={NAV_MEGA_MENU_CARD_TEMP}
								/>
							</li>
							<li className="nav-item px-hg">
								<a href="#" className="inline-block no-underline m-0 text-body font-bold py-[.375em]">Skin</a>
								<NavMegaMenu
									title="Hair"
									menus={NAV_MEGA_MENU_TEMP}
									cards={NAV_MEGA_MENU_CARD_TEMP}
								/>
							</li>
							<li className="nav-item px-hg">
								<a href="#" className="inline-block no-underline m-0 text-body font-bold py-[.375em]">Body</a>
								<NavMegaMenu
									title="Hair"
									menus={NAV_MEGA_MENU_TEMP}
									cards={NAV_MEGA_MENU_CARD_TEMP}
								/>
							</li>
							<li className="nav-item px-hg">
								<a href="#" className="inline-block no-underline m-0 fw-bold text-body font-bold py-[.375em]">Value Sets</a>
								<NavMegaMenu
									title="Hair"
									menus={NAV_MEGA_MENU_TEMP}
									cards={NAV_MEGA_MENU_CARD_TEMP}
								/>
							</li>
							<li className="nav-item px-hg">
								<a className="inline-block no-underline m-0 fw-bold text-body font-bold py-[.375em]">|</a>
							</li>
							<li className="nav-item px-hg">
								<a href="#" className="inline-block no-underline m-0 fw-bold text-body font-bold py-[.375em]">Results IRL</a>
							</li>
						</ul>

						<ul className="lg:[flex-basis:auto] flex flex-wrap list-reset pl-0 mb-0 navbar-nav--right flex-row justify-end items-center ">
							<li className="hidden lg:flex pr-hg">
								<a className="text-lg m-0 flex font-bold text-body" href="/pages/rewards">
									Bali Beauty Club<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="mx-1"><g transform="scale(.15)" clip-path="url(#palm-tree-v2_svg__palmTreeV2)"><path d="M68.69 119.177s7.618-22.555-3.57-70.584L101.323 85.9s7.405-27.36-23.77-41.854l42.43.629s-12.549-24.764-46.657-13.494L103.65 2.144S73.032-3.418 60.975 27.166c0 0-11.845-32.938-42.185-26.296l29.85 29.601S21.329 15.751 0 41.596l43.708 1.402s-30.504 8.287-27.981 40.758l38.94-35.873s.607 36.727-9.976 71.31c11.795 1.838 24.032 0 24.032 0l-.032-.016z"></path></g></svg>
								</a>
							</li>
							<li className="nav-item px-0 d-none d-lg-flex"><span className="h-2 border-l-2 mr-1 hidden lg:flex "></span></li>
							<li id="dropdownMenuForm" className=" relative dropdown--account pl-1 mr-1 lg:mr-0 lg:pr-hg">
								<a onClick={toggleAccountDropdown} className="nav-link h4 m-0 d-flex text-uppercase font-bold" href="#javascript" data-cy="account-icon" aria-haspopup="true" aria-expanded="false">
									<Account className="text-[1.375em] h-[1em] mr-[5px]" />
								</a>
								<AccountDropdown openAccountBox={openAccountBox} toggleAccountDropdown={toggleAccountDropdown} />
							</li>
							<li className="nav-item pr-1 lg:pl-hg">
								<a className="h4 m-0 flex font-bold" href="#javascript" data-cy="search-icon" onClick={onToggleSearchBox}>
									<Search className="text-[1.375em] h-[1em]" />
								</a>
							</li>
							<li className="nav-item d-flex lg:pl-hg">
								<a className="flex justify-center items-center [flex-flow:column] relative" data-toggle="modal" data-target="#cart-drawer" role="button" data-cy="cart-icon" onClick={onToggleCart}>
									<CartIcon className="text-[27.5px] h-[27.5px]"/>
									<span className="cart-drawer__count text-sm h-100 top-[50%] left-[50%] text-body -mt-[18px]">0</span>
								</a>
							</li>
						</ul>
					</div>
				</nav>

				{/*
				<nav className="text-center mobile-secnav p-g bg-white d-lg-none">
					<ul className="nav justify-content-center">
						<li className="nav-item">
							<a href="#" className="nav-link pb-0 pt-0 "><b>Shop All</b></a>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link pb-0 pt-0"><b>Hair</b></a>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link pb-0 pt-0"><b>Tan</b></a>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link pb-0 pt-0"><b>Body</b></a>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link pb-0 pt-0"><b>Value Kits</b></a>
						</li>
					</ul>
				</nav>
				*/}

				<MobileMenu onToggleMobileNav={onToggleMobileNav} openDrawer={openDrawer}  />
				<SearchBox onToggleSearchBox={onToggleSearchBox} openSearchBox={openSearchBox} />

			</header>
			<Cart showCart={openCartDrawer} handleClose={handleClose}/>
		</>
	);
};

export default Header;
