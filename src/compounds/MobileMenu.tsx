import { useState } from 'react';
import Close from '../../src/images/icons/close.svg';
import Percentage from '../../src/images/icons/percentage-square.svg';
import Sun from '../../src/images/icons/sun.svg';
import MenuDecoration from '../../src/images/icons/menu-banner-decoration.svg';
import MenuDecorationGreen from '../../src/images/icons/menu-banner-decoration-green.svg';
import ChevronPrev from '../../src/images/icons/chevron-prev.svg';
import ChevronNext from '../../src/images/icons/chevron-next.svg';
import BrandLogo from '../../src/images/ce-logo.svg';

const defMenuState = {
	1: false,
	2: false,
	3: false,
	4: false,
	5: false,
}

const MobileMenu = (props: any) => {
	const { openDrawer, onToggleMobileNav } = props;
	const [menuStates, setMenuStates] = useState(defMenuState);
	const [storeSelection, setStoreSelection] = useState(false);
	const mobileNavClick = (e) => {
		if (e.target !== e.currentTarget) return;
		props.onToggleMobileNav();
	}

	return (
		<nav id="mobile-nav" className={`mobile-nav z-[1010] fixed lg:hidden top-[0] bottom-[0] left-[0] [transition:opacity_.2s_linear] w-full h-full bg-[rgba(0,_0,_0,_0.6)] ${openDrawer ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
			<ul id="mobileMenu" className="h-full w-full [transition:transform_.1s_ease-in-out] overflow-y-auto overflow-x-hidden fixed h-100 col-12 bg-white list-unstyled py-2 mb-0 px-0"
			role="tablist" aria-multiselectable="true">
				<li className="flex justify-between mx-g py-[5px]">
					<a href="#" className="mx-auto lg:mx-0" aria-label="CocoAndEve Logo">
						<BrandLogo className="lg:h-[34px] overflow-hidden " />
					</a>
					<Close className="mobile-nav__close svg position-absolute right-[.9375em] h-[1em]" onClick={() => onToggleMobileNav(false)}/>
				</li>
				<li className="pt-[5px] pb-0 flex justify-between mx-g mb-1">
					<figure className="flex mb-0 items-center bg-secondary-light pl-g relative py-1 my-0 rounded-tl-[.5em] rounded-bl-[.5em] w-full">
						<Percentage className="mr-1" />
						<figcaption className="flex-1 text-sm">
							20% OFF on Sunny Honey Range<br />Code: <b>TAN25</b>
						</figcaption>
						<span className="block text-primary pr-1 font-bold">Use</span>
						<MenuDecorationGreen className="absolute banner-decoration text-secondary-light top-[0] -right-[10px] h-full"/>
					</figure>
				</li>
				<li className="mobile-nav__promo-bar flex justify-content-between mx-g mb-g ">
					<figure className="flex mb-0 items-center bg-pink-light pl-g relative py-1 my-0 rounded-tl-[.5em] rounded-bl-[.5em] w-full">
						<Sun className="mr-1"/>
						<figcaption className="flex-1 text-sm">
							Find your perfect colour match!<br /><b>Get 10% OFF</b>
						</figcaption>
						<span className="block text-primary pr-1 font-bold">Quiz</span>
						<MenuDecoration className="absolute banner-decoration text-pink-light top-[0] -right-[10px] h-full"/>
					</figure>
				</li>
				<li className="flex px-g py-0 border-b">
					<label htmlFor="headingHair" className="flex w-full relative p-0 items-center justify-between m-0 pb-1 pt-2" aria-expanded="false" aria-controls="hairCare">
						<h4 className="m-0 font-weight-normal">Haircare</h4>
						<ChevronNext className="h-[1em] text-xs" onClick={() => setMenuStates({...defMenuState, 1: true})} />
					</label>
					<ul className={`z-[1000] w-full list-unstyled p-0 absolute bg-white w-100 visible left-0 top-0 min-h-[52.5em] ${menuStates[1] ? 'visible translate-x-[0] [transition:transform_0.15s_ease-in]' : 'invisible translate-x-full [transition:transform_0.15s_ease-out]'}`} aria-labelledby="headingHair">
						<li className="flex justify-between mx-g items-center py-[5px]">
							<label onClick={() => setMenuStates({...defMenuState, 1: false})}>
								<ChevronPrev className="h-[1em]" />
							</label>
							<a href="#" className="text-body mx-auto py-1" aria-label="CocoAndEve Logo">
								<BrandLogo className="lg:h-[34px]" />
							</a>
							<Close className="h-[1em]" src="icons/close.svg" />
						</li>
						<li className="border-b p-0"><h4 className="px-g py-1 mb-0">Hair</h4></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Nourishing Hair Masque</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Hair Heroes Gift Set</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">That's A Wrap Bundle</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Microfibre Hair Towel Wrap</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Moisture Boost Shower Cap</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Hair Kits & Gifts</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline"><strong>Shop All Hair</strong></a></li>
					</ul>
				</li>
				<li className="flex px-g py-0 border-b">
					<label htmlFor="skinCare" className="flex w-full relative p-0 items-center justify-between m-0 pb-1 pt-2" aria-expanded="false" aria-controls="skinCare">
						<h4 className="m-0 font-weight-normal">Self Tan</h4>
						<ChevronNext className="h-[1em] text-xs" onClick={() => setMenuStates({...defMenuState, 2: true})} />
					</label>
					<ul className={`z-[1000] w-full list-unstyled p-0 absolute bg-white w-100 visible left-0 top-0 min-h-[52.5em] ${menuStates[2] ? 'visible translate-x-[0] [transition:transform_0.15s_ease-in]' : 'invisible translate-x-full [transition:transform_0.15s_ease-out]'}`} aria-labelledby="headingHair">
						<li className="flex justify-between mx-g items-center py-[5px]">
							<label onClick={() => setMenuStates({...defMenuState, 2: false})}>
								<ChevronPrev className="h-[1em]" />
							</label>
							<a href="#" className="text-body mx-auto py-1" aria-label="CocoAndEve Logo">
								<BrandLogo className="lg:h-[34px]" />
							</a>
							<Close className="h-[1em]" src="icons/close.svg" />
						</li>
						<li className="border-b p-0"><h4 className="px-g py-1 mb-0">Self Tan</h4></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Bali Bronzing Bundle</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Bali Bronzing Foam</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Bronzing Face Drops</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Self Tan Travel Kit</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Deluxe Vegan Kabuki Brush</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Soft Velvet Tanning Mitt</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline"><strong>Shop All Tan</strong></a></li>
					</ul>
				</li>
				<li className="flex px-g py-0 border-b">
					<label htmlFor="skin" className="flex w-full relative p-0 items-center justify-between m-0 pb-1 pt-2" aria-expanded="false" aria-controls="skinCare">
						<h4 className="m-0 font-weight-normal">Skin</h4>
						<ChevronNext className="h-[1em] text-xs" onClick={() => setMenuStates({...defMenuState, 3: true})}/>
					</label>
					<ul className={`z-[1000] w-full list-unstyled p-0 absolute bg-white w-100 visible left-0 top-0 min-h-[52.5em] ${menuStates[3] ? 'visible translate-x-[0] [transition:transform_0.15s_ease-in]' : 'invisible translate-x-full [transition:transform_0.15s_ease-out]'}`} aria-labelledby="headingHair">
						<li className="flex justify-between mx-g items-center py-[5px]">
							<label onClick={() => setMenuStates({...defMenuState, 3: false})}>
								<ChevronPrev className="h-[1em]" />
							</label>
							<a href="#" className="text-body mx-auto py-1" aria-label="CocoAndEve Logo">
								<BrandLogo className="lg:h-[34px]" />
							</a>
							<Close className="h-[1em]" src="icons/close.svg" />
						</li>
						<li><h4 className="px-g py-1 mb-0">Skin</h4></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Bali Bronzing Bundle</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Bali Bronzing Foam</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Bronzing Face Drops</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Self Tan Travel Kit</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Deluxe Vegan Kabuki Brush</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Soft Velvet Tanning Mitt</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline"><strong>Shop All Skin</strong></a></li>
					</ul>
				</li>
				<li className="flex px-g py-0 border-b">
					<label htmlFor="bodycare" className="flex w-full relative p-0 items-center justify-between m-0 pb-1 pt-2" aria-expanded="false" aria-controls="bodycare">
						<h4 className="m-0 font-weight-normal">Bodycare</h4>
						<ChevronNext className="h-[1em] text-xs" onClick={() => setMenuStates({...defMenuState, 4: true})}/>
					</label>
					<ul className={`z-[1000] w-full list-unstyled p-0 absolute bg-white w-100 visible left-0 top-0 min-h-[52.5em] ${menuStates[4] ? 'visible translate-x-[0] [transition:transform_0.15s_ease-in]' : 'invisible translate-x-full [transition:transform_0.15s_ease-out]'}`} aria-labelledby="headingHair">
						<li className="flex justify-between mx-g items-center py-[5px]">
							<label onClick={() => setMenuStates({...defMenuState, 4: false})}>
								<ChevronPrev className="h-[1em]" />
							</label>
							<a href="#" className="text-body mx-auto py-1" aria-label="CocoAndEve Logo">
								<BrandLogo className="lg:h-[34px]" />
							</a>
							<Close className="h-[1em]" src="icons/close.svg" />
						</li>
						<li className="px-g py-1 mb-0"><h4 className="px-g py-1 mb-0">Bodycare</h4></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Bali Bod Bundle</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Bali Buffing Sugar</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Body Moisture Whip</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Bounce Body Masque</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Jelly Massage Mitt</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Smooth-on Shell Scoop</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline"><strong>Shop All Body</strong></a></li>
					</ul>
				</li>
				<li className="flex px-g py-0 border-b">
					<label htmlFor="bundles" className="flex w-full relative p-0 items-center justify-between m-0 pb-1 pt-2" aria-expanded="false" aria-controls="bundles">
						<h4 className="m-0 font-weight-normal">Bundles</h4>
						<ChevronNext className="h-[1em] text-xs" onClick={() => setMenuStates({...defMenuState, 5: true})}/>
					</label>
					<ul className={`z-[1000] w-full list-unstyled p-0 absolute bg-white w-100 visible left-0 top-0 min-h-[52.5em] ${menuStates[5] ? 'visible translate-x-[0] [transition:transform_0.15s_ease-in]' : 'invisible translate-x-full [transition:transform_0.15s_ease-out]'}`} aria-labelledby="headingHair">
						<li className="flex justify-between mx-g items-center py-[5px]">
							<label onClick={() => setMenuStates({...defMenuState, 5: false})}>
								<ChevronPrev className="h-[1em]" />
							</label>
							<a href="#" className="text-body mx-auto py-1" aria-label="CocoAndEve Logo">
								<BrandLogo className="lg:h-[34px]" />
							</a>
							<Close className="h-[1em]" src="icons/close.svg" />
						</li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Hair Heroes Gift Set</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Bali Bod Bundle</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Taste of the Tropics Kit</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Mini Mask Duo</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Shop all Products</a></li>
						<li className="border-b p-0"><a href="#" className="px-g pb-1 pt-2 block text-body no-underline">Shop all Kits & Gifts</a></li>
					</ul>
				</li>
				<li className="flex px-g  py-0 border-b"><a href="" className=" m-0 pb-1 pt-2">Bali Beauty Club</a></li>
				<li className="my-g p-g">
					<a href="#" className="block rounded w-full bg-primary text-white border-[1px] border-solid border-transparent px-[1.75em] py-[.5625em] text-[1em]" data-cy="shopall-btn">Shop All</a>
				</li>
				<li className="px-g py-1 border-b mb-g">
					<h4 id="countrySelect" className="flex items-center justify-between px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 relative collapsed p-0 font-normal" data-toggle="collapse" data-target="#collapseCountry" aria-expanded="false" aria-controls="collapseCountry">
						Rest of the World (SGD)
						<ChevronNext className={`h-[1em] text-xs ${storeSelection ? 'rotate-180' : ''}`} onClick={() => setStoreSelection(!storeSelection)} />
					</h4>
					<ul id="collapseCountry" className={`overflow-hidden list-unstyled card-body p-0 ${!storeSelection ? 'h-0' : 'h-[100px]'}`} role="tabpanel"
						aria-labelledby="countrySelect" data-parent="#mobileMenu">
						<li className="pt-g"><a href="#" className='text-body'>USA (USD)</a></li>
						<li className="pt-g"><a href="#" className='text-body'>United Kingdom (GBP)</a></li>
						<li className="pt-g"><a href="#" className='text-body'>Canada (CAD)</a></li>
						<li className="pt-g"><a href="#" className='text-body'>Australia (AUD)</a></li>
						<li className="pt-g"><a href="#" className='text-body'>Europe (EUR)</a></li>
						<li className="pt-g"><a href="#" className='text-body'>Germany (EUR)</a></li>
						<li className="pt-g"><a href="#" className='text-body'>France (EUR)</a></li>
						<li className="pt-g"><a href="#" className='text-body'>Rest of the World (SGD)</a></li>
					</ul>
				</li>
				<li className="flex flex-wrap  px-g pt-g">
					<a href="#" className="w-1/2 mb-1">Help</a>
					<a href="#" className="w-1/2 mb-1">Track my order</a>
					<a href="#" className="w-1/2 mb-1">Result IRL</a>
					<a href="#" className="w-1/2 mb-1">BLog</a>
				</li>
			</ul>
		</nav>
	);  
};

export default MobileMenu;