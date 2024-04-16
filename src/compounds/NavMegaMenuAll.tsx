import { useState } from 'react';

const NavMegaMenuAll = (props: any) => {
    return (
        <div className="z-[1010] nav-mega-menu hidden left-0 border-t w-full border-top-body mt-[18px] bg-white absolute before:bg-transparent before:w-full before:h-[1.25em] before:absolute before:-mt-[1.25em]">
            <div className="container pt-3 flex flex-wrap items-center justify-between px-g">
                <div className="flex w-full">
                    <div className="max-w-[14.625em] mr-3 mb-3 px-0">
                        <button className="text-lg px-3 bg-gray-400 text-primary rounded border border-transparent font-bold  py-1 mb-2 w-full">
                            Shop all products
                        </button>
                        <img src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/0493b42e-6873-464e-e99e-859d6b859700/public" alt="Shop all mega menu" className="d-block w-100 rounded" />
                    </div>
                    <div className="ml-3 mb-3 flex flex-wrap justify-between  px-0 flex-grow-1 w-full">
                        <div className="d-flex flex-column">
                            <a href="http://us.cocoandeve.com/collections/hair" className="block mb-2 text-lg text-body font-bold">Hair</a>
                            <ol className="list-unstyled">
                                <li className="mb-1 ">
                                    <a href="/collections/shampoo-conditioner" className="text-body">Body Tan</a>
                                </li>
                                <li className="mb-1 ">
                                    <a href="/collections/treatments" className="text-body">Body Tan</a>
                                </li>
                                <li className="mb-1 ">
                                    <a href="/collections/hair-styling" className="text-body">Body Tan</a>
                                </li>
                                <li className="mb-1 ">
                                    <a href="/collections/hair-accessories" className="text-body">Body Tan</a>
                                </li>
                                <li className=" mb-1">
                                    <a href="/collections/hair" className="text-body font-bold">Body Tan</a>
                                </li>
                            </ol>
                        </div>
                        <div className="d-flex flex-column">
                            <a href="http://us.cocoandeve.com/collections/hair" className="block mb-2 text-lg text-body font-bold">Tan & SPF</a>
                            <ol className="list-unstyled">
                                <li className="mb-1 ">
                                    <a href="/collections/shampoo-conditioner" className="text-body">Face Tan</a>
                                </li>
                                <li className="mb-1 ">
                                    <a href="/collections/treatments" className="text-body">Body Tan</a>
                                </li>
                                <li className="mb-1 ">
                                    <a href="/collections/hair-styling" className="text-body">Suncare</a>
                                </li>
                                <li className="mb-1 ">
                                    <a href="/collections/hair-accessories" className="text-body">Tanning Mitts</a>
                                </li>
                                <li className=" mb-1">
                                    <a href="/collections/hair" className="text-body font-bold">Tan Accessories</a>
                                </li>
                            </ol>
                        </div>
                        <div className="d-flex flex-column">
                            <a href="http://us.cocoandeve.com/collections/hair" className="block mb-2 text-lg text-body font-bold">Skin</a>
                            <ol className="list-unstyled">
                                <li className="mb-1 ">
                                    <a href="/collections/shampoo-conditioner" className="text-body">Shampoo &amp; Conditioner</a>
                                </li>
                                <li className="mb-1 ">
                                    <a href="/collections/treatments" className="text-body">Treatments</a>
                                </li>
                                <li className="mb-1 ">
                                    <a href="/collections/hair-styling" className="text-body">Hair Styling</a>
                                </li>
                                <li className="mb-1 ">
                                    <a href="/collections/hair-accessories" className="text-body">Hair Accessories</a>
                                </li>
                                <li className=" mb-1">
                                    <a href="/collections/hair" className="text-body font-bold">Shop Hair Range</a>
                                </li>
                            </ol>
                        </div>
                        <div className="d-flex flex-column">
                            <a href="http://us.cocoandeve.com/collections/hair" className="block mb-2 text-lg text-body font-bold">Body</a>
                            <ol className="list-unstyled">
                                <li className="mb-1 ">
                                    <a href="/collections/shampoo-conditioner" className="text-body">Shampoo &amp; Conditioner</a>
                                </li>
                                <li className="mb-1 ">
                                    <a href="/collections/treatments" className="text-body">Treatments</a>
                                </li>
                                <li className="mb-1 ">
                                    <a href="/collections/hair-styling" className="text-body">Hair Styling</a>
                                </li>
                                <li className="mb-1 ">
                                    <a href="/collections/hair-accessories" className="text-body">Hair Accessories</a>
                                </li>
                                <li className=" mb-1">
                                    <a href="/collections/hair" className="text-body font-bold">Shop Hair Range</a>
                                </li>
                            </ol>
                        </div>
                        <div className="d-flex flex-column">
                            <a href="http://us.cocoandeve.com/collections/hair" className="block mb-2 text-lg text-body font-bold">Value Sets</a>
                            <ol className="list-unstyled">
                                <li className="mb-1 ">
                                    <a href="/collections/shampoo-conditioner" className="text-body">Hair Sets</a>
                                </li>
                                <li className="mb-1 ">
                                    <a href="/collections/treatments" className="text-body">Tan Sets</a>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );  
};

export default NavMegaMenuAll;