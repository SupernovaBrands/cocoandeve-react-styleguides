import Instagram from '~/images/icons/instagram.svg';
import FacebookSquare from '~/images/icons/facebook-square.svg';
import PinterestSquare from '~/images/icons/pinterest-square.svg';
import Youtube from '~/images/icons/youtube.svg';
import Tiktok from '~/images/icons/tiktok.svg';
// import PalmTree from '~/images/icons/palm-tree.svg';
import { useEffect, useState } from 'react';
import { encryptParam, getCookie } from "~/modules/utils";
import Form from "~/compounds/footer-newsletter-form";
import DropdownStore from '~/components/DropdownStore';

const FooterTest = (props) => {
    // console.log('footer test prop', props);
    const { store, aboutMenu, helpMenu, shopMenu } = props;
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const onSubmit = (evt) => {
        evt.preventDefault();
        // console.log('email', email);
        const ajaxRequest = new XMLHttpRequest();
        ajaxRequest.open('POST', `https://s-app.cocoandeve.com/bluecore/registrations`, true);
        ajaxRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        const date = new Date();
        const tse = date.getTime();
        const content = `{email:'${email}',time:${tse}}`;
        const signature = encryptParam(content);
        ajaxRequest.send(`signature=${signature}&email=${email}&country=${getCookie('country_code')}&store=${store}&brand=cocoandeve&reg_source=footer`);
        setSubmitted(true);
        try {
            // @ts-ignore
            if (typeof globalThis.window.ttq) {
                // @ts-ignore
                globalThis.window.ttq.identify({ email });
                // @ts-ignore
                globalThis.window.ttq.instance('CC3JF1JC77U9MSBJLS5G').track('Subscribe');
            }
            // @ts-ignore
            if (typeof globalThis.window.fbq) {
                //@ts-ignore
                globalThis.window.fbq('track', 'Lead');
            }
        } catch(e){
            console.log(e);
        }
    
        try {
            // @ts-ignore
            window.wtba = window.wtba || [];
            // @ts-ignore
            window.wtba.push({
                "type": "identify",
                "email": email
            });
        } catch (e) {
            console.log('error wtba push');
        }
    };
    const handleEmail = (e) => {
        // console.log(e.target.value);
        setEmail(e.target.value);
    }
    return (
        <footer className="pt-4 pb-1 mb-2">
            <div className="container lg:mb-3 px-g flex flex-wrap">
                <div className="w-full lg:w-1/2 px-0 lg:px-g lg:pr-4">
                    <h5 className="font-bold mb-1 text-xl lg:text-2xl">Newsletter</h5>
                    <p className="mb-1 lg:mb-2">Receive exclusive offers, promotions and beauty tips via email.</p>
                    <Form classes="footer__newsletter-form lg:order-1" onSubmit={onSubmit} submitted={submitted} handleEmail={handleEmail} email={email} />
                    <p className="footer__newsletter-tos text-sm mt-1 mb-1 lg:order-0 text-gray-600 lg:text-body-color lg:opacity-60 mb-5 lg:mt-1 lg:mb-0">Please read our <a href="/pages/privacy-policy" className="text-sm text-gray-600 lg:text-body-color underline">Privacy Policy</a> for more information about how we use your data.</p>
                </div>
                <div className="w-full lg:w-1/2 px-0 lg:px-g">
                    <div className="flex flex-wrap w-full lg:-mx-g">
                        <ul className="lg:px-g hidden lg:block text-sm lg:flex-1 lg:basis-auto">
                            <li className="mb-1"><p className="text-sm text-body font-bold">Shop</p></li>
                            {shopMenu && shopMenu.map((link) => {
                                return <li className="mb-25"><a href={link.handle} className="text-sm text-body">{link.title}</a></li>
                            })}
                            {/* <li><a href="#" className="text-sm text-body">Hair</a></li>
                            <li><a href="#" className="text-sm text-body">Tan & SPF</a></li>
                            <li><a href="#" className="text-sm text-body">Skin</a></li>
                            <li><a href="#" className="text-sm text-body">Body</a></li>
                            <li><a href="#" className="text-sm text-body">Value Sets</a></li> */}
                        </ul>
                        <ul className="lg:px-g hidden lg:block text-sm lg:flex-1 lg:basis-auto">
                            <li className="mb-1"><p className="text-sm text-body font-bold">About Us</p></li>
                            {aboutMenu && aboutMenu.map((link) => {
                                return <li className="mb-25"><a href={link.handle} className="text-sm text-body">{link.title}</a></li>
                            })}
                            {/* <li><a href="#" className="text-sm text-body">Our Story</a></li>
                            <li><a href="#" className="text-sm text-body">Sustainability</a></li>
                            <li><a href="#" className="text-sm text-body">Stockist</a></li>
                            <li><a href="#" className="text-sm text-body">Affiliates</a></li>
                            <li><a href="#" className="text-sm text-body">Blog</a></li>
                            <li><a href="#" className="text-sm text-body">Careers</a></li>
                            <li><a href="#" className="text-sm text-body">Rewards Program</a></li> */}
                        </ul>
                        <ul className="lg:px-g hidden lg:block text-sm lg:flex-1 lg:basis-auto">
                            <li className="mb-1"><p className="text-sm text-body font-bold">Help</p></li>
                            {helpMenu && helpMenu.map((link) => {
                                return <li className="mb-25"><a href={link.handle} className="text-sm text-body">{link.title}</a></li>
                            })}
                            {/* <li><a href="#" className="text-sm text-body">Track My Order</a></li>
                            <li><a href="#" className="text-sm text-body">Help Center</a></li>
                            <li><a href="#" className="text-sm text-body">Shipping</a></li>
                            <li><a href="#" className="text-sm text-body">Refund Policy</a></li>
                            <li><a href="#" className="text-sm text-body">Terms & Conditions</a></li>
                            <li><a href="#" className="text-sm text-body">Privacy Policy</a></li>
                            <li><a href="#" className="text-sm text-body">Accessibility Statement</a></li> */}
                        </ul>
                        <div className="footer__socials-currency w-full lg:w-auto flex lg:flex-1 lg:basis-auto inline lg:flex-col mb-2">
                            <div className="w-1/2 lg:w-full lg:mb-3">
                                <p className="text-sm font-bold mb-1">Follow Us</p>
                                <a href="https://www.instagram.com/cocoandeve/" className="inline-flex pe-1" target="_blank" aria-label="Instagram">
                                    <Instagram className="h-[1em]" />
                                </a>
                                <a href="https://www.facebook.com/cocoandeve" className="inline-flex pe-1" target="_blank" aria-label="Facebook">
                                    <FacebookSquare className="h-[1em]" />
                                </a>
                                <a href="https://www.pinterest.com/cocoeve0497/_shop/" className="inline-flex pe-1" target="_blank" aria-label="Pinterest">
                                    <PinterestSquare className="h-[1em]" />
                                </a>
                                <a href="https://www.youtube.com/channel/UCVd0r8NG3Q5E9DMppEYBabA" className="inline-flex pe-1" target="_blank" aria-label="Youtube">
                                    <Youtube className="h-[1em]" />
                                </a>
                                <a href="https://www.tiktok.com/@coco_and_eve" className="inline-flex" target="_blank" aria-label="Tiktok">
                                    <Tiktok className="h-[1em]" />
                                </a>
                            </div>
                            <div className="w-1/2 lg:w-full">
                                <p className="text-sm font-bold mb-1">Currency</p>
                                <DropdownStore direction='dropup' store={store} />
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="flex flex-wrap text-sm lg:hidden">
                    <li className="mb-2"><a href="/pages/track-my-order" className="text-body text-sm mr-2">My Order</a></li>
                    <li className="mb-2"><a href="https://support.cocoandeve.com/hc/en-us" className="text-body text-sm mr-2">Help</a></li>
                    <li className="mb-2"><a href="/pages/delivery-returns" className="text-body text-sm mr-2">Shipping</a></li>
                    <li className="mb-2"><a href="/pages/refund-policy" className="text-body text-sm mr-2">Refund</a></li>
                    <li className="mb-2"><a href="/pages/privacy-policy" className="text-body text-sm mr-2">Privacy</a></li>
                    <li className="mb-2"><a href="/pages/terms-and-conditions" className="text-body text-sm mr-2">Terms</a></li>
                    <li className="mb-2"><a href="/pages/accessibility-statement" className="text-body text-sm mr-2">Accessibility</a></li>
                </ul>
                <hr className="block w-full border-body mb-1 mt-1 lg:mt-3 lg:mb-1 bg-gray-600 opacity-20" />
                <p className="footer__copyright text-center block w-full justify-center items-baseline mt-g lg:mt-3 mb-g lg:mb-[16px] lg:text-base text-sm ">© 2025 Coco&amp;Eve</p>
            </div>
        </footer>
    );
};

export default FooterTest;