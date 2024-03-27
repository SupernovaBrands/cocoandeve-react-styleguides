import { useState } from 'react';
import dynamic from 'next/dynamic';
import AnnouncementBar from '@/components/AnnouncementBar';
import NavMegaMenu from '@/compounds/NavMegaMenu';
import MobileMenu from '@/compounds/MobileMenu';
import BrandLogo from '../../src/images/ce-logo.svg';
import Account from '../../src/images/icons/account.svg';
import Search from '../../src/images/icons/search-thin.svg';
import Cart from '../../src/images/icons/cart.svg';
/*import SearchBox from '@/compounds/SearchBox';*/
import AccountDropdown from '@/compounds/AccountDropdown';

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

	const onToggleMobileNav = () => {
		setOpenDrawer(!openDrawer);
	}

	const onToggleSearchBox = () => {
		const searchBoxClassList = document.getElementById('searchPanel').classList;
		if (!searchBoxClassList.contains('show')) {
			searchBoxClassList.add('show');
		} else {
			searchBoxClassList.remove('show');
		}
	}

	const toggleAccountDropdown = () => {
		console.log('toggleAccountDropdown');
		const searchBoxClassList = document.getElementById('account-dropdown').classList;
		if (!searchBoxClassList.contains('show')) {
			searchBoxClassList.add('show');
		} else {
			searchBoxClassList.remove('show');
		}
	}

	return (
        <header className="main-header">
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
			
            <nav className="bg-white relative flex flex-wrap items-center justify-between px-hg">
                <div className="container px-0 lg:px-g flex flex-wrap lg:flex-nowrap items-center justify-between">
                    <button className="text-lg border-0 [flex-basis:30%] lg:hidden" type="button" data-cy="menu-icon" aria-label="Mobile navbar toggler" onClick={onToggleMobileNav}>
                        <span className="block w-[1.25em] h-[2px] bg-[#151515] relative before:-top-[.4em] before:w-[1.05em] before:h-[2px] before:bg-[#151515] before:absolute before:left-[0] after:content-[''] after:h-[2px] after:bg-body after:absolute after:left-[0] after:w-[.95em] after:top-[.4em]"></span>
                    </button>
                    <a href="#" className="inline-block pt-[.5625em] pb-[.5625em] lg:pt-[14.5px] lg:pb-[14.5px] lg:[flex-basis:15%] mx-auto lg:mx-0"  aria-label="Visit Coco and Eve homepage">
				        <BrandLogo className="lg:h-[41px]" />
                    </a>
					<ul className="header-desktop-nav list-reset pl-0 mb-0 hidden lg:flex lg:[flex-basis:auto] lg:flex-row">
						<li className="nav-item">
							<a href="#" className="inline-block pl-[7.5px] pr-[7.5px] no-underline m-0 text-body font-bold p-[.375em]">Shop All</a>
							<NavMegaMenu
								title="Shop All"
								menus={NAV_MEGA_MENU_TEMP}
								cards={NAV_MEGA_MENU_CARD_TEMP}
							/>
						</li>
						<li className="nav-item">
							<a href="#" className="inline-block pl-[7.5px] pr-[7.5px] no-underline m-0 text-body font-bold p-[.375em]">Hair</a>
							<NavMegaMenu
								title="Hair"
								menus={NAV_MEGA_MENU_TEMP}
								cards={NAV_MEGA_MENU_CARD_TEMP}
							/>
						</li>
						<li className="nav-item">
							<a href="#" className="inline-block pl-[7.5px] pr-[7.5px] no-underline m-0 text-body font-bold p-[.375em]">Tan & SPF</a>
							<NavMegaMenu
								title="Hair"
								menus={NAV_MEGA_MENU_TEMP}
								cards={NAV_MEGA_MENU_CARD_TEMP}
							/>
						</li>
						<li className="nav-item">
							<a href="#" className="inline-block pl-[7.5px] pr-[7.5px] no-underline m-0 text-body font-bold p-[.375em]">Skin</a>
							<NavMegaMenu
								title="Hair"
								menus={NAV_MEGA_MENU_TEMP}
								cards={NAV_MEGA_MENU_CARD_TEMP}
							/>
						</li>
						<li className="nav-item">
							<a href="#" className="inline-block pl-[7.5px] pr-[7.5px] no-underline m-0 text-body font-bold p-[.375em]">Body</a>
							<NavMegaMenu
								title="Hair"
								menus={NAV_MEGA_MENU_TEMP}
								cards={NAV_MEGA_MENU_CARD_TEMP}
							/>
						</li>
						<li className="nav-item">
							<a href="#" className="inline-block pl-[7.5px] pr-[7.5px] no-underline m-0 fw-bold text-body font-bold p-[.375em]">Value Sets</a>
							<NavMegaMenu
								title="Hair"
								menus={NAV_MEGA_MENU_TEMP}
								cards={NAV_MEGA_MENU_CARD_TEMP}
							/>
						</li>
						<li className="nav-item">
							<a className="inline-block pl-[7.5px] pr-[7.5px] no-underline m-0 fw-bold text-body font-bold p-[.375em]">|</a>
						</li>
						<li className="nav-item">
							<a href="#" className="inline-block pl-[7.5px] pr-[7.5px] no-underline m-0 fw-bold text-body font-bold p-[.375em]">Results IRL</a>
						</li>
						<li className="nav-item">
							<a href="#" className="inline-block pl-[7.5px] pr-[7.5px] no-underline m-0 fw-bold text-body font-bold p-[.375em]">Blog</a>
						</li>
						<li className="nav-item">
							<a href="#" className="inline-block pl-[7.5px] pr-[7.5px] no-underline m-0 fw-bold text-body font-bold p-[.375em]">Sweepstakes</a>
						</li>
						<li className="nav-item">
							<a href="#" className="inline-block pl-[7.5px] pr-[7.5px] no-underline m-0 fw-bold text-body font-bold p-[.375em]">Help</a>
						</li>
					</ul>

					<ul className="lg:[flex-basis:auto] flex flex-wrap list-reset pl-0 mb-0 navbar-nav--right flex-row justify-end items-center ">
						<li id="dropdownMenuForm" className=" relative dropdown--account pl-1 mr-1 lg:mr-0 lg:pr-hg">
							<a onClick={toggleAccountDropdown} className="nav-link h4 m-0 d-flex text-uppercase font-bold" href="#javascript" data-cy="account-icon" aria-haspopup="true" aria-expanded="false">
								<Account className="text-[1.375em] h-[1em]" />
							</a>
							<AccountDropdown />
						</li>
						<li className="nav-item pr-1 lg:pl-hg">
							<a className="h4 m-0 flex font-bold" href="#javascript" data-cy="search-icon" onClick={onToggleSearchBox}>
								<Search className="text-[1.375em] h-[1em]" />
							</a>
						</li>
						<li className="nav-item d-flex lg:pl-hg">
							<a className="flex justify-center items-center [flex-flow:column] relative" data-toggle="modal" data-target="#cart-drawer" role="button" data-cy="cart-icon" onClick={props.toggleCart}>
								<Cart className="text-[27.5px] h-[25px]" />
								<span className="cart-drawer__count text-sm h-100 top-[50%] left-[50%] text-body -mt-[18px]">102</span>
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
			{/*<SearchBox onToggleSearchBox={onToggleSearchBox} /> */}
        </header>
	);
};

export default Header;
