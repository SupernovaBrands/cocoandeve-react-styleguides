import { useState } from 'react';
import CookieBanner from '@/components/CookieBanner';
import AnnouncementBar from '@/components/AnnouncementBar';
import BrandLogo from '@/components/CELogo';
import Account from '../../src/images/icons/account.svg';
import Search from '../../src/images/icons/search-abtest.svg';
import Cart from '../../src/images/icons/cart.svg';

const Header = (props) => {
    const [showCookie, setShowCookie] = useState(false);
	const [announcementBarEnabled, setAnnouncementBarEnabled] = useState(false);
    const onAcceptCookie = (active) => {
		setShowCookie(active);
	};

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
                <div className="container">
                    <button className="navbar-toggler" type="button" data-cy="menu-icon" aria-label="Mobile navbar toggler">
                        <span className="d-block"></span>
                    </button>
                    <a href="#" className="navbar-brand mx-auto mx-lg-0"  aria-label="Visit Coco and Eve homepage">
				        <BrandLogo />
                    </a>
					<ul className="navbar-nav d-none d-lg-flex navbar__secondary">
						<li className="nav-item">
							<a href="#" className="nav-link m-0 font-weight-bold">Shop All</a>
							
						</li>
						<li class="nav-item">
							<a href="#" className="nav-link m-0 font-weight-bold">Hair</a>
							
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link m-0 font-weight-bold">Tan</a>
							
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link m-0 font-weight-bold">Body</a>
							
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link m-0 font-weight-bold">Value Sets</a>
							
						</li>
						<li className="nav-item">
							<a className="nav-link m-0 font-weight-bold">|</a>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link m-0 font-weight-bold">Results IRL</a>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link m-0 font-weight-bold">Blog</a>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link m-0 font-weight-bold">Sweepstakes</a>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link m-0 font-weight-bold">Help</a>
						</li>
					</ul>

					<ul className="navbar-nav navbar-nav--right flex-row justify-content-end align-items-center">
						<li id="dropdownMenuForm" className="nav-item dropdown dropdown--account pl-1 mr-1 mr-lg-0">
							<a className="nav-link h4 m-0 d-flex text-uppercase font-weight-bold" href="#" data-cy="account-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<Account className="svg mr-25" />
							</a>
							<div className="dropdown-menu dropdown-menu-right border-0 rounded-0 pb-0 mt-sm-6 mt-lg-0 pt-0">
								
							</div>
						</li>
						<li className="nav-item pr-1">
							<a className="nav-link search h4 m-0 d-flex text-uppercase font-weight-bold search-panel__open" href="#" data-cy="search-icon">
								<Search className="svg mr-25" />
							</a>
						</li>
						<li className="nav-item d-flex">
							<a className="nav-link cart h4 mb-0 d-flex justify-content-end px-0 position-relative font-weight-normal" data-toggle="modal" data-target="#cart-drawer" role="button" data-cy="cart-icon">
								<Cart className="svg me-0" />
								<span className="cart-drawer__count font-size-xs h-100">102</span>
							</a>
						</li>
					</ul>
                </div>
            </nav>
        </header>
	);
};

export default Header;
