import { useState } from 'react';
import Close from '../../src/images/icons/close.svg';
import ChevronDown from '../../src/images/icons/chevron-down.svg';
import Accordion from 'react-bootstrap/Accordion';

const MobileMenu = (props) => {
    const mobileNavClick = (e) => {
        if (e.target !== e.currentTarget) return;
        props.onToggleMobileNav();
    }

    return (
        <nav id="mobile-nav" class="mobile-nav position-fixed d-lg-none" onClick={mobileNavClick}>
		    <Close class="mobile-nav__close svg text-white" onClick={() => props.onToggleMobileNav()} />
            <ul id="mobileMenu" class="mobile-nav__menu accordion position-fixed h-100 col-9 bg-white list-unstyled py-2 mb-0"
			role="tablist" aria-multiselectable="true">
                <li class="mb-1">
                    <a href="#" class="btn btn-primary btn-block w-100" data-cy="shopall-btn">Shop All</a>
                </li>
                <Accordion defaultActiveKey="" flush>
                    <Accordion.Item eventKey="0" className='border-0'>
                        <Accordion.Button className='shadow-none border-0 py-0'>
                            <figure id="headingHair" class="media card-header d-flex position-relative p-0" aria-expanded="false" aria-controls="hairCare">
                                <img class="rounded" src="https://via.placeholder.com/40x40/EFADBA" alt="Generic placeholder image" />
                                <figcaption class="media-body ms-1 w-100">
                                    <small>Haircare</small>
                                    <h4 class="m-0">Like a Virgin</h4>
                                </figcaption>
                            </figure>
                        </Accordion.Button>
                        <Accordion.Body className="px-0 pt-0">
                            <ul id="hairCare" class="list-unstyled card-body p-0" aria-labelledby="headingHair">
                                <li><a href="#">Nourishing Hair Masque</a></li>
                                <li><a href="#">Hair Heroes Gift Set</a></li>
                                <li><a href="#">That's A Wrap Bundle</a></li>
                                <li><a href="#">Microfibre Hair Towel Wrap</a></li>
                                <li><a href="#">Moisture Boost Shower Cap</a></li>
                                <li><a href="#">Hair Kits & Gifts</a></li>
                                <li><a href="#"><strong>Shop All Hair</strong></a></li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2" className='border-0'>
                        <Accordion.Button className='shadow-none border-0 py-0'>
                            <figure class="media card-header d-flex position-relative p-0" aria-expanded="false" aria-controls="hairCare">
                                <img class="rounded" src="https://via.placeholder.com/40x40/EFADBA" alt="Generic placeholder image" />
                                <figcaption class="media-body ms-1 w-100">
                                    <small>Self Tanner</small>
                                    <h4 class="m-0">Sunny Honey</h4>
                                </figcaption>
                            </figure>
                        </Accordion.Button>
                        <Accordion.Body className="px-0 pt-0">
                            <ul class="list-unstyled card-body p-0" aria-labelledby="headingHair">
                                <li><a href="#">Bali Bronzing Bundle</a></li>
                                <li><a href="#">Bali Bronzing Foam</a></li>
                                <li><a href="#">Bronzing Face Drops</a></li>
                                <li><a href="#">Self Tan Travel Kit</a></li>
                                <li><a href="#">Deluxe Vegan Kabuki Brush</a></li>
                                <li><a href="#">Soft Velvet Tanning Mitt</a></li>
                                <li><a href="#"><strong>Shop All Tan</strong></a></li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3" className='border-0'>
                        <Accordion.Button className='shadow-none border-0 py-0'>
                            <figure class="media card-header d-flex position-relative p-0" aria-expanded="false" aria-controls="hairCare">
                                <img class="rounded" src="https://via.placeholder.com/40x40/EFADBA" alt="Generic placeholder image" />
                                <figcaption class="media-body ms-1 w-100">
                                    <small>Bodycare</small>
                                    <h4 class="m-0">Glow Figure</h4>
                                </figcaption>
                            </figure>
                        </Accordion.Button>
                        <Accordion.Body className="px-0 pt-0">
                            <ul class="list-unstyled card-body p-0" aria-labelledby="headingHair">
                                <li><a href="#">Bali Bod Bundle</a></li>
                                <li><a href="#">Bali Buffing Sugar</a></li>
                                <li><a href="#">Body Moisture Whip</a></li>
                                <li><a href="#">Bounce Body Masque</a></li>
                                <li><a href="#">Jelly Massage Mitt</a></li>
                                <li><a href="#">Smooth-on Shell Scoop</a></li>
                                <li><a href="#"><strong>Shop All Body</strong></a></li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3" className='border-0'>
                        <Accordion.Button className='shadow-none border-0 py-0'>
                            <figure class="media card-header d-flex position-relative p-0" aria-expanded="false" aria-controls="hairCare">
                                <img class="rounded" src="https://via.placeholder.com/40x40/EFADBA" alt="Generic placeholder image" />
                                <figcaption class="media-body ms-1 w-100">
                                    <small>Bundles</small>
                                    <h4 class="m-0">Value Kits</h4>
                                </figcaption>
                            </figure>
                        </Accordion.Button>
                        <Accordion.Body className="px-0 pt-0">
                            <ul class="list-unstyled card-body p-0" aria-labelledby="headingHair">
                                <li><a href="#">Hair Heroes Gift Set</a></li>
                                <li><a href="#">Bali Bod Bundle</a></li>
                                <li><a href="#">Taste of the Tropics Kit</a></li>
                                <li><a href="#">Mini Mask Duo</a></li>
                                <li><a href="#">Shop all Products</a></li>
                                <li><a href="#">Shop all Kits & Gifts</a></li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <li><a href="#">My Account</a></li>
                <li><a href="#">Track My Order</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Result IRL</a></li>
                <li><a href="#">Contact Us</a></li>
                <li class="border-bottom border-top card py-1 my-g">
                    <h4 id="countrySelect" class="card-header position-relative collapsed p-0 mb-25 mt-25" data-toggle="collapse" data-target="#collapseCountry" aria-expanded="false" aria-controls="collapseCountry">
                        Rest of the World (SGD)
                        <ChevronDown className="svg font-size-xs chevron-down" />
                    </h4>
                    <ul id="collapseCountry" class="collapse list-unstyled card-body p-0"
                        aria-labelledby="countrySelect" data-parent="#mobileMenu">
                        <li class="pt-g"><a href="#">USA (USD)</a></li>
                        <li><a href="#">United Kingdom (GBP)</a></li>
                        <li><a href="#">Canada (CAD)</a></li>
                        <li><a href="#">Australia (AUD)</a></li>
                        <li><a href="#">Europe (EUR)</a></li>
                        <li><a href="#">Germany (EUR)</a></li>
                        <li><a href="#">France (EUR)</a></li>
                        <li><a href="#">Rest of the World (SGD)</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );  
};

export default MobileMenu;