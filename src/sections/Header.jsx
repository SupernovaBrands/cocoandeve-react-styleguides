import { useState } from 'react';
import CookieBanner from '@/components/CookieBanner';
import AnnouncementBar from '@/components/AnnouncementBar';
import NavMegaMenu from '@/compounds/NavMegaMenu';
import MobileMenu from '@/compounds/MobileMenu';
import BrandLogo from '@/components/CELogo';
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
    const [showCookie, setShowCookie] = useState(false);
	const [announcementBarEnabled, setAnnouncementBarEnabled] = useState(true);

    const onAcceptCookie = (active) => {
		setShowCookie(active);
	};

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
            {!showCookie && (
				<CookieBanner onAcceptCookie={onAcceptCookie} text="Up to 25% off + Free Gift worth $25.40" />
			)}
			{announcementBarEnabled && (
				<AnnouncementBar
					text="Up to 25% off + Free Gift worth $25.40"
					url="/"
					timerEnabled={true}
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
            <nav className="bg-white navbar navbar-expand-lg">
                <div className="container px-0">
                    <button className="navbar-toggler border-0" type="button" data-cy="menu-icon" aria-label="Mobile navbar toggler" onClick={onToggleMobileNav}>
                        <span className="d-block"></span>
                    </button>
                    <a href="#" className="navbar-brand mx-auto mx-lg-0"  aria-label="Visit Coco and Eve homepage">
				        <BrandLogo />
                    </a>
					<ul className="navbar-nav d-none d-lg-flex navbar__secondary">
						<li className="nav-item">
							<a href="#" className="nav-link m-0 fw-bold">Shop All</a>
							<NavMegaMenu 
								title="Shop All"
								menus={NAV_MEGA_MENU_TEMP}
								cards={NAV_MEGA_MENU_CARD_TEMP}
							/>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link m-0 fw-bold">Hair</a>
							<NavMegaMenu
								title="Hair"
								menus={NAV_MEGA_MENU_TEMP}
								cards={NAV_MEGA_MENU_CARD_TEMP}
							/>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link m-0 fw-bold">Tan</a>
							<NavMegaMenu 
								title="Tan"
								menus={NAV_MEGA_MENU_TEMP}
								cards={NAV_MEGA_MENU_CARD_TEMP}
							/>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link m-0 fw-bold">Body</a>
							<NavMegaMenu
								title="Body"
								menus={NAV_MEGA_MENU_TEMP}
								cards={NAV_MEGA_MENU_CARD_TEMP}
							/>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link m-0 fw-bold">Value Sets</a>
							<NavMegaMenu 
								title="Value Sets"
								menus={NAV_MEGA_MENU_TEMP}
								cards={NAV_MEGA_MENU_CARD_TEMP}
							/>
						</li>
						<li className="nav-item">
							<a className="nav-link m-0 fw-bold">|</a>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link m-0 fw-bold">Results IRL</a>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link m-0 fw-bold">Blog</a>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link m-0 fw-bold">Sweepstakes</a>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link m-0 fw-bold">Help</a>
						</li>
					</ul>

					<ul className="navbar-nav navbar-nav--right flex-row justify-content-end align-items-center ">
						<li id="dropdownMenuForm" className="nav-item dropdown dropdown--account pl-1 me-1 me-lg-0">
							<a onClick={toggleAccountDropdown} className="nav-link h4 m-0 d-flex text-uppercase fw-bold" href="javascript:void(0);" data-cy="account-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<Account className="svg mr-25" />
							</a>
							<AccountDropdown />
						</li>
						<li className="nav-item pe-1">
							<a className="nav-link search h4 m-0 d-flex text-uppercase fw-bold search-panel__open" href="javascript:void(0);" data-cy="search-icon" onClick={onToggleSearchBox}>
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
			<MobileMenu onToggleMobileNav={onToggleMobileNav} />
			<SearchBox onToggleSearchBox={onToggleSearchBox} />
        </header>
	);
};

export default Header;
