import Instagram from '~/images/icons/instagram.svg';
import FacebookSquare from '~/images/icons/facebook-square.svg';
import PinterestSquare from '~/images/icons/pinterest-square.svg';
import Youtube from '~/images/icons/youtube.svg';
import Tiktok from '~/images/icons/tiktok.svg';
import PalmTree from '~/images/icons/palm-tree.svg';
import { useEffect, useState } from 'react';
import Form from "~/compounds/footer-newsletter-form";
import DropdownStore from '~/components/DropdownStore';
import Link from 'next/link';

import { encryptParam, getCookie } from "~/modules/utils";

const Footer = (props: any) => {
    const { aboutMenu, shopMenu, helpMenu, store } = props;
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

    useEffect(() => {
        fetch('/api/account/auth').then((res) => res.json()).then((data) => {
            if (data.isLoggedIn) setEmail(data.email);
        });
    }, []);

    const capitalize = (str, lower = false) =>
        (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
    ;

    return (
        <footer className="pt-4 pb-1">
            <div className="container mb-4 lg:mb-3 px-g">
                <div className='lg:pb-3 grid grid-cols-[1fr] grid-rows-[auto] [grid-template-areas:"newsletter-heading"_"newsletter-form"] lg:grid-cols-[1fr_1fr] lg:[grid-template-areas:"newsletter-heading_newsletter-form"]'>
                    <div className="[grid-area:newsletter-heading]">
                        <h5 className="h1 mb-1 text-xl text-2xl">Newsletter</h5>
                        <p className='mb-1'>Receive exclusive offers, promotions and beauty tips via email.</p>
                    </div>
                    <div className="[grid-area:newsletter-form] flex flex-wrap">
                        <Form classes="lg:order-1" onSubmit={onSubmit} submitted={submitted} handleEmail={handleEmail} email={email}  />
                        <p className="text-base lg:text-sm mt-1 lg:mt-0 mb-1 lg:mb-1 lg:order-0 text-gray-600">Please read our <a href="/pages/privacy-policy" className="text-black text-base lg:text-sm underline">Privacy Policy</a> for more information about how we use your data.</p>
                    </div>
                </div>
            </div>
            <div className="container mt-4 px-g">
                <div className='grid grid-cols-[1fr_1fr] grid-rows-[auto_auto_auto] [grid-template-areas:"nav-shop_nav-about"_"nav-help_nav-currency"] lg:grid-cols-[1.5fr_1.5fr_2fr_1.5fr_1.5fr_1.5fr] lg:grid-rows-[auto] lg:[grid-template-areas:"nav-shop_nav-about_nav-help_nav-banner_nav-follow_nav-currency"]'>
                    <div className="[grid-area:nav-shop] mb-g lg:mb-0">
                        <h5 className="mb-1 text-xl lg:text-2xl font-bold">Shop</h5>
                        <ul className="list-unstyled">
                            {shopMenu?.map((item) => (<li key={`shop-${item.title}`}><a href={item.handle} className='text-body'>{capitalize(item.title)}</a></li>))}
                        </ul>
                    </div>
                    <div className="[grid-area:nav-about] mb-g lg:mb-0">
                        <h5 className="mb-1 text-xl lg:text-2xl font-bold">About Us</h5>
                        <ul className="list-unstyled">
                            {aboutMenu?.map((item) => (<li key={`about-${item.title}`}><a href={item.handle} className='text-body'>{capitalize(item.title)}</a></li>))}
                        </ul>
                    </div>
                    <div className="[grid-area:nav-help] mt-3 lg:mt-0">
                        <h5 className=" mb-1 text-xl lg:text-2xl font-bold">Help</h5>
                        <ul className="list-unstyled mb-g">
                            {helpMenu?.map((item) => (<li key={`help-${item.title}`}><a href={item.handle} className='text-body'>{capitalize(item.title)}</a></li>))}
                        </ul>
                    </div>
                    <div className="[grid-area:nav-follow] hidden lg:block text-left lg:text-right">
                        <div className="inline-block lg:text-left">
                            <h5 className=" mb-1 text-xl lg:text-2xl font-bold">Follow Us</h5>
                            <a href="https://www.instagram.com/cocoandeve/" className="inline-flex pe-1" target="_blank">
                                <Instagram className="h-[1.25em] hover:fill-primary-darken" />
                            </a>
                            <a href="https://www.facebook.com/cocoandeve" className="inline-flex pe-1" target="_blank">
                                <FacebookSquare className="h-[1.25em] lg:ml-[4px] hover:fill-primary-darken" />
                            </a>
                            <a href="https://www.pinterest.com/coco_and_eve/" className="inline-flex pe-1" target="_blank">
                                <PinterestSquare className="h-[1.25em] lg:ml-[4px] hover:fill-primary-darken" />
                            </a>
                            <a href="https://www.youtube.com/channel/UCVd0r8NG3Q5E9DMppEYBabA" className="inline-flex pe-1" target="_blank">
                                <Youtube className="h-[1.25em] lg:ml-[4px] hover:fill-primary-darken" />
                            </a>
                            <a href="https://www.tiktok.com/@coco_and_eve" className="inline-flex pe-1" target="_blank">
                                <Tiktok className="h-[1.25em] lg:ml-[4px] hover:fill-primary-darken" />
                            </a>
                        </div>
                    </div>
                    <div className="[grid-area:nav-currency] mb-2 lg:my-0 lg:text-right mt-3 lg:mt-0">
                        <div className='[grid-area:nav-follow] mt-3 mb-2 lg:my-0 hidden inline-block text-left'>
                            <h5 className=" mb-1 text-xl lg:text-2xl font-bold">Follow Us</h5>
                            <a href="https://www.instagram.com/cocoandeve/" className="inline-flex pe-1 " target="_blank">
                                <Instagram className="h-[1.25em]" />
                            </a>
                            <a href="https://www.facebook.com/cocoandeve" className="inline-flex pe-1" target="_blank">
                                <FacebookSquare className="h-[1.25em]" />
                            </a>
                            <a href="https://www.pinterest.com/cocoeve0497/_shop/" className="inline-flex pe-1" target="_blank">
                                <PinterestSquare className="h-[1.25em]" />
                            </a>
                            <a href="https://www.youtube.com/channel/UCVd0r8NG3Q5E9DMppEYBabA" className="inline-flex pe-1" target="_blank">
                                <Youtube className="h-[1.25em]" />
                            </a>
                            <a href="https://www.tiktok.com/@coco_and_eve" className="inline-flex pe-1" target="_blank">
                                <Tiktok className="h-[1.25em]" />
                            </a>
                        </div>
                        <div className='[grid-area:nav-currency] lg:my-0 text-left inline-block mb-2'>
                            <div className='mb-2 lg:my-0 lg:hidden text-left'>
                                <h5 className=" mb-1 text-xl lg:text-2xl font-bold">Follow Us</h5>
                                <a href="https://www.instagram.com/cocoandeve/" className="inline-flex pe-1" target="_blank">
                                    <Instagram className="h-[1em]" />
                                </a>
                                <a href="https://www.facebook.com/cocoandeve" className="inline-flex pe-1" target="_blank">
                                    <FacebookSquare className="ml-[4px] h-[1em]" />
                                </a>
                                <a href="https://www.pinterest.com/cocoeve0497/_shop/" className="inline-flex pe-1" target="_blank">
                                    <PinterestSquare className="ml-[4px] h-[1em]" />
                                </a>
                                <a href="https://www.youtube.com/channel/UCVd0r8NG3Q5E9DMppEYBabA" className="inline-flex pe-1" target="_blank">
                                    <Youtube className="ml-[4px] h-[1em]" />
                                </a>
                                <a href="https://www.tiktok.com/@coco_and_eve" className="inline-flex" target="_blank">
                                    <Tiktok className="ml-[4px] h-[1em]" />
                                </a>
                            </div>
                            <div className='d-block'>
                                <h5 className="mb-1 text-xl lg:text-2xl font-bold">Currency</h5>
                                <DropdownStore direction='dropup' store={store} />
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="border-body mb-1 mt-2 lg:mt-3 lg:mb-1 lg:opacity-20" />
                <p className="flex justify-center items-baseline mt-g lg:mt-3 mb-g lg:mb-[16px] lg:text-base text-sm ">© 2024 Coco&amp;Eve</p>
            </div>
        </footer>
    );
};

export default Footer;
