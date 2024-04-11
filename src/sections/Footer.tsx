import Instagram from '../../src/images/icons/instagram.svg';
import FacebookSquare from '../../src/images/icons/facebook-square.svg';
import PinterestSquare from '../../src/images/icons/pinterest-square.svg';
import Youtube from '../../src/images/icons/youtube.svg';
import Tiktok from '../../src/images/icons/tiktok.svg';
import PalmTree from '../../src/images/icons/palm-tree.svg';
import { useState } from 'react';
import Form from "@/compounds/footer-newsletter-form";
import DropdownStore from '@/components/DropdownStore';
import Link from 'next/link';

const Footer = (props: any) => {
    const [email, setEmail] = useState('');

    const onSubmit = (evt) => {
        evt.preventDefault();
        console.log(email);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    return (
        <footer className="pt-4">
            <div className="container mb-4 lg:mb-3 px-g">
                <div className='lg:pb-3 grid grid-cols-[1fr] grid-rows-[auto] [grid-template-areas:"newsletter-heading"_"newsletter-form"] lg:grid-cols-[1fr_1fr] lg:[grid-template-areas:"newsletter-heading_newsletter-form"]'>
                    <div className="[grid-area:newsletter-heading]">
                        <h5 className="h1 mb-1 text-xl text-2xl">Newsletter</h5>
                        <p className='mb-1'>Receive exclusive offers, promotions and beauty tips via email.</p>
                    </div>
                    <div className="[grid-area:newsletter-form] flex flex-wrap">
                        <Form classes="lg:order-1" />
                        <p className="text-sm mt-1 lg-mt-0 mb-0 lg:mb-1 lg:order-0">Please read our <Link href="#" className="text-black text-sm underline">Privacy Policy</Link> for more information about how we use your data.</p>
                    </div>
                </div>
            </div>
            <div className="container mt-4 px-g">
                <div className='grid grid-cols-[1fr_1fr] grid-rows-[auto_auto_auto] [grid-template-areas:"nav-shop_nav-about"_"nav-help_nav-currency"] lg:grid-cols-[2fr_2fr_2fr_4fr_2fr_2fr] lg:grid-rows-[auto] lg:[grid-template-areas:"nav-shop_nav-about_nav-help_nav-banner_nav-follow_nav-currency"]'>
                    <div className="[grid-area:nav-shop]">
                        <h5 className=" mb-1 text-xl lg:text-2xl font-bold">Shop</h5>
                        <ul className="list-unstyled">
                            <li><a href="" className='text-body'>Hair</a></li>
                            <li><a href="" className='text-body'>Tan</a></li>
                            <li><a href="" className='text-body'>Body</a></li>
                            <li><a href="" className='text-body'>Value Sets</a></li>
                        </ul>
                    </div>
                    <div className="[grid-area:nav-about]">
                        <h5 className="mb-1 text-xl lg:text-2xl font-bold">About Us</h5>
                        <ul className="list-unstyled">
                            <li><a href="" className='text-body'>Our Story</a></li>
                            <li><a href="" className='text-body'>Stockist</a></li>
                            <li><a href="" className='text-body'>Affiliates</a></li>
                            <li><a href="" className='text-body'>Blog</a></li>
                        </ul>
                    </div>
                    <div className="[grid-area:nav-help] mt-3 lg:mt-0">
                        <h5 className=" mb-1 text-xl lg:text-2xl font-bold">Help</h5>
                        <ul className="list-unstyled">
                            <li><a href="" className='text-body'>Track My Order</a></li>
                            <li><a href="" className='text-body'>FAQ</a></li>
                            <li><a href="" className='text-body'>Shipping & Refund</a></li>
                            <li><a href="" className='text-body'>Contact Us</a></li>
                            <li><a href="" className='text-body'>Terms & Conditions</a></li>
                            <li><a href="" className='text-body'>Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className="[grid-area:nav-follow] hidden lg:block text-left">
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
                            <h5 className="mb-1 text-xl lg:text-2xl font-bold">Currency</h5>
                            <DropdownStore direction='dropup' />
                        </div>
                    </div>
                </div>
                <hr className="border-body opacity-[.2] mb-1 mt-4 lg:mb-1" />
                <p className="flex justify-center items-baseline mt-1 lg:mt-3 mb-4 text-sm">© 2024 Coco&amp;Eve</p>
            </div>
        </footer>
    );
};

export default Footer;
