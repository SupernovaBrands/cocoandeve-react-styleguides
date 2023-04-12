import Instagram from '../../src/images/icons/instagram.svg';
import FacebookSquare from '../../src/images/icons/facebook-square.svg';
import PinterestSquare from '../../src/images/icons/pinterest-square.svg';
import Youtube from '../../src/images/icons/youtube.svg'; 
import Tiktok from '../../src/images/icons/tiktok.svg';
import PalmTree from '../../src/images/icons/palm-tree.svg';
import { useState } from 'react';

const Footer = (props) => {
    const [email, setEmail] = useState('');

    const onSubmit = (evt) => {
        evt.preventDefault();
        console.log(email);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    return (
        <footer className="pt-md-6 pb-md-6 pt-4 pt-lg-4 pb-1 mobile-wrapper">
            <div className="container mb-4">
                <div className="footer-grid-newsletter">
                    <div className="footer-grid-newsletter__newsletter-heading">
                        <h5 className="h1">Newsletter</h5>
                        <p>Receive exclusive offers, promotions and beauty tips via email.</p>
                    </div>
                    <div className="footer-grid-newsletter__newsletter-form d-flex flex-wrap">
                        <p className="footer__note font-size-sm order-1 order-lg-0 mt-2 mt-lg-0 mb-0 mb-lg-1">Please read our Privacy Policy for more information about how we use your data.</p>
                        <form className="order-0 order-lg-1 col-12 col-lg-11 p-0" onSubmit={onSubmit}>
                            <div className="input-group">
                                <input type="email" className="form-control" placeholder="Enter your email" aria-label="Enter your email" value={email} onChange={handleEmail} />
                                <div className="input-group-append">
                                    <button className="btn btn-primary h-100" type="submit">Subscribe</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="container mt-4">
                <div className="footer-grid-nav">
                    <div className="footer-grid-nav__shop">
                        <h5 className="h2">Shop</h5>
                        <ul className="list-unstyled">
                            <li><a href="">Hair</a></li>
                            <li><a href="">Tan</a></li>
                            <li><a href="">Body</a></li>
                            <li><a href="">Value Sets</a></li>
                        </ul>
                    </div>
                    <div className="footer-grid-nav__about">
                        <h5 className="h2">About Us</h5>
                        <ul className="list-unstyled">
                            <li><a href="">Our Story</a></li>
                            <li><a href="">Stockist</a></li>
                            <li><a href="">Affiliates</a></li>
                            <li><a href="">Blog</a></li>
                        </ul>
                    </div>
                    <div className="footer-grid-nav__help mt-3 mt-lg-0">
                        <h5 className="h2">Help</h5>
                        <ul className="list-unstyled">
                            <li><a href="">Track My Order</a></li>
                            <li><a href="">FAQ</a></li>
                            <li><a href="">Shipping & Refund</a></li>
                            <li><a href="">Contact Us</a></li>
                            <li><a href="">Terms & Conditions</a></li>
                            <li><a href="">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className="footer-grid-nav__banner text-lg-center">
                        <a href="#"><img className="mt-2 mt-lg-0 mb-lg-2" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Group_9525.png?v=1656597716" alt="Rewards" /></a>
                    </div>
                    <div className="footer-grid-nav__follow my-3 my-lg-0">
                        <h5 className="h1">Follow Us</h5>
                        <a href="https://www.instagram.com/cocoandeve/" className="d-inline-flex pe-1" target="_blank">
                            <Instagram className="svg" />
                        </a>
                        <a href="https://www.facebook.com/cocoandeve" className="d-inline-flex pe-1" target="_blank">
                            <FacebookSquare className="svg" />
                        </a>
                        <a href="https://www.pinterest.com/cocoeve0497/_shop/" className="d-inline-flex pe-1" target="_blank">
                            <PinterestSquare className="svg" />
                        </a>
                        <a href="https://www.youtube.com/channel/UCVd0r8NG3Q5E9DMppEYBabA" className="d-inline-flex pe-1" target="_blank">
                            <Youtube className="svg" />
                        </a>
                        <a href="https://www.tiktok.com/@coco_and_eve" className="d-inline-flex pe-1" target="_blank">
                            <Tiktok className="svg" />
                        </a>
                    </div>
                    <div className="footer-grid-nav__currency my-3 my-lg-0">
                        <h5 className="h1">Currency</h5>
                        <div className="dropdown">
                            <a className="dropdown-toggle fw-bold" href="#" role="button" id="dropdownMenuLink"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                US (USD)
                            </a>
                            <div className="dropdown-menu p-0 d-block overflow-hidden" aria-labelledby="dropdownMenuLink">
                                <a className="dropdown-item pt-1 pb-1 active" href="#">United Kingdom (GBP)</a>
                                <a className="dropdown-item pt-1 pb-1" href="#">USA (USD)</a>
                                <a className="dropdown-item pt-1 pb-1" href="#">Canada (CAD)</a>
                                <a className="dropdown-item pt-1 pb-1" href="#">Australia (AUD)</a>
                                <a className="dropdown-item pt-1 pb-1" href="#">Germany (EUR)</a>
                                <a className="dropdown-item pt-1 pb-1" href="#">France (EUR)</a>
                                <a className="dropdown-item pt-1 pb-1" href="#">Europe (EUR)</a>
                                <a className="dropdown-item pt-1 pb-1" href="#">Rest of the World (USD)</a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="footer__hr-bottom" />
                <p className="d-flex justify-content-center align-items-baseline mt-3">© 2022 Coco&amp;Eve  <PalmTree className="svg ms-25" /></p>
            </div>
        </footer>
    );
};

export default Footer;