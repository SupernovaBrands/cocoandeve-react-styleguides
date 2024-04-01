import { useState } from 'react';

const Playground = (props) => {
    return (
        <section className="container pb-0 md:pb-12 justify-center text-center">
            <div className="flex flex-wrap">
                <div className="w-4/5 lg:w-2/3 p-0 pb-1 mx-auto">
                    <h1 className="mb-1 hidden md:block">Discover the Coco &amp; Eve playground</h1>
                    <h2 className="h1 mb-1 block md:hidden" role="heading">The Coco &amp; Eve playground</h2>
                    <p className="pt-1 mb-[1em]"><strong>We're totally coconuts about beauty!</strong></p>
                    <p className="font-normal playground__heading">Which is why we have combined powerful &amp; tropical ingredients into different ranges to provide amazing results and make your life feel like a constant holiday. <br />21 beauty awards. 100% vegan. Cruelty free.</p>
                </div>
            </div>
            <div className="flex flex-wrap playground playground--simple mb-3 md:mb-0">
                <div className="md:w-1/4 px-g">
                    <a href="/" className="text-body block">
                        <figure className="playground--simple-square bg-secondary-light relative mb-g mt-3 md:mb-4 md:pb-0 overflow-hidden">
                            <picture className="block">
                                <source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/playground_hair_DT_V2_540x680_crop_center.jpg" media="(min-width: 992px)" />
                                <img className="w-full" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/hair_3.png?v=1662715284" loading="lazy" />
                            </picture>
                            <figcaption className="p-2 md:py-5 md:px-2 text-left lg:text-center">
                                <strong className="playground__title mb-3 md:mb-6">Hair</strong>
                                <p className="playground__subtitle mt-1 mb-[1em]">Explore our award-winning <br />Like a Virgin hair range</p>
                            </figcaption>
                        </figure>
                    </a>
                    <a href="#" className="inline-block bg-primary hover:bg-primary-darken rounded-lg border-2 border-primary font-bold text-white py-[13px] px-[54px]">Shop Hair</a>
                </div>

                <div className="md:w-1/4 px-g">
                    <a href="/" className="text-body block">
                        <figure className="playground--simple-square bg-yellow-light relative mb-g mt-3 md:mb-4 md:pb-0 overflow-hidden">
                            <picture className="block">
                                <source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/playground_tan_DT_V2_540x680_crop_center.jpg" media="(min-width: 992px)" />
                                <img className="w-full" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/tan_2.png?v=1662715284" loading="lazy" />
                            </picture>
                            <figcaption className="p-2 md:py-5 md:px-2 text-left lg:text-center">
                                <strong className="playground__title mb-3 md:mb-6">Tan & SPF</strong>
                                <p className="playground__subtitle mt-1 mb-[1em]">Explore Tan & SPF <br /> for a safe & sun-kissed glow!</p>
                            </figcaption>
                        </figure>
                    </a>
                    <a href="#" className="inline-block bg-primary hover:bg-primary-darken rounded-lg border-2 border-primary font-bold text-white py-[13px] px-[54px]">Shop Tan</a>
                </div>
                <div className="md:w-1/4 px-g">
                    <a href="/" className="text-body block">
                        <figure className="playground--simple-square bg-primary-light-second relative mb-g mt-3 md:mb-4 md:pb-0 overflow-hidden">
                            <picture className="block">
                                <source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/playground_skin_DT_V2_540x680_crop_center.jpg?v=1695350852" media="(min-width: 992px)" />
                                <img className="w-full" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/playground_skin_MB_V2.jpg?v=1695350853" loading="lazy" />
                            </picture>
                            <figcaption className="p-2 md:py-5 md:px-2 text-left lg:text-center">
                                <strong className="playground__title mb-3 md:mb-6">Skin</strong>
                                <p className="playground__subtitle mt-1 mb-[1em]">Explore our antioxidant <br />skincare for a radiant glow</p>
                            </figcaption>
                        </figure>
                    </a>
                    <a href="#" className="inline-block bg-primary hover:bg-primary-darken rounded-lg border-2 border-primary font-bold text-white py-[13px] px-[54px]">Shop Skin</a>
                </div>
                <div className="md:w-1/4 px-g">
                    <a href="/" className="text-body block">
                        <figure className="playground--simple-square bg-primary-light-second relative mb-g mt-3 md:mb-4 md:pb-0 overflow-hidden">
                            <picture className="block">
                                <source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/playground_body_DT_V2_540x680_crop_center.jpg?v=1695350852" media="(min-width: 992px)" />
                                <img className="w-full" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/body_1.png?v=1662715287" loading="lazy" />
                            </picture>
                            <figcaption className="p-2 md:py-5 md:px-2 text-left lg:text-center">
                                <strong className="playground__title mb-3 md:mb-6">Body</strong>
                                <p className="playground__subtitle mt-1 mb-[1em]">Explore Glow Figure. It's Bali <br />beauty for your body </p>
                            </figcaption>
                        </figure>
                    </a>
                    <a href="#" className="inline-block bg-primary hover:bg-primary-darken rounded-lg border-2 border-primary font-bold text-white py-[13px] px-[54px]">Shop Body</a>
                </div>
            </div>
        </section>
    );
};

export default Playground;