import { useState } from 'react';
import dynamic from 'next/dynamic';
import AnnouncementBar from '@/components/AnnouncementBar';
import NavMegaMenu from '@/compounds/NavMegaMenu';
import MobileMenu from '@/compounds/MobileMenu';
import BrandLogo from '../../src/images/ce-logo.svg';
import Account from '../../src/images/icons/account.svg';
import Search from '../../src/images/icons/search-thin.svg';
import Cart from '../../src/images/icons/cart.svg';
import SearchBox from '@/compounds/SearchBox';
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

	const onToggleMobileNav = () => {
		console.log('onToggleMobileNav');
		const mobileClassList = document.getElementById('mobile-nav').classList;
		if (!mobileClassList.contains('show')) {
			mobileClassList.add('show');
		} else {
			mobileClassList.remove('show');
		}
	}

	const onToggleSearchBox = () => {
		console.log('onToggleSearchBox');
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
					enabled={false}
				/>
			)}
            <nav className="bg-white">
                <div className="container px-0 lg:flex lg:flex-nowrap">
                    <button className="navbar-toggler border-0 hidden" type="button" data-cy="menu-icon" aria-label="Mobile navbar toggler" onClick={onToggleMobileNav}>
                        <span className="d-block"></span>
                    </button>
                    <a href="#" className="inline-block lg:pt-[.72656em] lg:pb-[.72656em] lg:[flex-basis:15%]"  aria-label="Visit Coco and Eve homepage">
				        <BrandLogo className="lg:h-[41px]" />
                    </a>
					<ul className="list-reset pl-0 mb-0 hidden lg:flex lg:[flex-basis:auto] lg:flex-row">
						<li className="nav-item">
							<a href="#" className="inline-block py-2 pl-[7.5px] pr-[7.5px] no-underline m-0 text-body font-bold">Shop All</a>
							<NavMegaMenu
								title="Shop All"
								menus={NAV_MEGA_MENU_TEMP}
								cards={NAV_MEGA_MENU_CARD_TEMP}
							/>
						</li>
						<li className="nav-item">
							<a href="#" className="inline-block py-2 pl-[7.5px] pr-[7.5px] no-underline m-0 text-body font-bold">Hair</a>
							<NavMegaMenu
								title="Hair"
								menus={NAV_MEGA_MENU_TEMP}
								cards={NAV_MEGA_MENU_CARD_TEMP}
							/>
						</li>
						<li className="nav-item">
							<a href="#" className="inline-block py-2 pl-[7.5px] pr-[7.5px] no-underline m-0 text-body font-bold">Tan</a>
							<NavMegaMenu
								title="Tan"
								menus={NAV_MEGA_MENU_TEMP}
								cards={NAV_MEGA_MENU_CARD_TEMP}
							/>
						</li>
						<li className="nav-item">
							<a href="#" className="inline-block py-2 pl-[7.5px] pr-[7.5px] no-underline m-0 text-body font-bold">Body</a>
							<NavMegaMenu
								title="Body"
								menus={NAV_MEGA_MENU_TEMP}
								cards={NAV_MEGA_MENU_CARD_TEMP}
							/>
						</li>
						<li className="nav-item">
							<a href="#" className="inline-block py-2 pl-[7.5px] pr-[7.5px] no-underline m-0 fw-bold text-body font-bold">Value Sets</a>
							<NavMegaMenu
								title="Value Sets"
								menus={NAV_MEGA_MENU_TEMP}
								cards={NAV_MEGA_MENU_CARD_TEMP}
							/>
						</li>
						<li className="nav-item">
							<a className="inline-block py-2 pl-[7.5px] pr-[7.5px] no-underline m-0 fw-bold text-body font-bold">|</a>
						</li>
						<li className="nav-item">
							<a href="#" className="inline-block py-2 pl-[7.5px] pr-[7.5px] no-underline m-0 fw-bold text-body font-bold">Results IRL</a>
						</li>
						<li className="nav-item">
							<a href="#" className="inline-block py-2 pl-[7.5px] pr-[7.5px] no-underline m-0 fw-bold text-body font-bold">Blog</a>
						</li>
						<li className="nav-item">
							<a href="#" className="inline-block py-2 pl-[7.5px] pr-[7.5px] no-underline m-0 fw-bold text-body font-bold">Sweepstakes</a>
						</li>
						<li className="nav-item">
							<a href="#" className="inline-block py-2 pl-[7.5px] pr-[7.5px] no-underline m-0 fw-bold text-body font-bold">Help</a>
						</li>
					</ul>

					<ul className="lg:[flex-basis:auto] flex flex-wrap list-reset pl-0 mb-0 navbar-nav--right flex-row justify-end items-center ">
						<li id="dropdownMenuForm" className=" relative dropdown--account pl-1 mr-1 lg:mr-0">
							<a onClick={toggleAccountDropdown} className="nav-link h4 m-0 d-flex text-uppercase fw-bold" href="#javascript" data-cy="account-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<Account className="text-[1.375em] h-[1em]" />
							</a>
							<AccountDropdown />
						</li>
						<li className="nav-item pe-1">
							<a className="nav-link search h4 m-0 d-flex text-uppercase fw-bold search-panel__open" href="#javascript" data-cy="search-icon" onClick={onToggleSearchBox}>
								<Search className="svg mr-25" />
							</a>
						</li>
						<li className="nav-item d-flex">
							<a className="nav-link cart h4 mb-0 d-flex justify-content-end px-0 position-relative fw-normal" data-toggle="modal" data-target="#cart-drawer" role="button" data-cy="cart-icon" onClick={props.toggleCart}>
								<Cart className="svg me-0" />
								<span className="cart-drawer__count font-size-xs h-100">102</span>
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

			{/*<MobileMenu onToggleMobileNav={onToggleMobileNav} />
			<SearchBox onToggleSearchBox={onToggleSearchBox} /> */}
        </header>
	);
};

export default Header;
