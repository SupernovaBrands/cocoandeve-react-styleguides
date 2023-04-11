import { useState } from 'react';

const Playground = (props) => {
    return (
        <section className="container pt-5 pb-0  pb-md-5 justify-content-center text-center">
            <div className="row">
                <div className="col-10 col-lg-8 p-0 pb-1 mx-auto">
                    <h1 className="mb-1 d-none d-md-block">Discover the Coco &amp; Eve playground</h1>
                    <h2 className="h1 mb-1 d-block d-md-none" role="heading">The Coco &amp; Eve playground</h2>
                    <p className="pt-1"><strong>We're totally coconuts about beauty!</strong></p>
                    <p className="font-weight-normal playground__heading">Which is why we have combined powerful &amp; tropical ingredients into different ranges to provide amazing results and make your life feel like a constant holiday. <br />21 beauty awards. 100% vegan. Cruelty free.</p>
                </div>
            </div>
            <div className="row playground playground--simple mb-3 mb-md-0">
                <div className="col-md-3 px-g">
                    <a href="/" className="text-body d-block">
                        <figure className="playground--simple-square bg-secondary-light position-relative mb-g mt-3 mb-md-3 pb-md-0 overflow-hidden">
                            <picture className="d-block">
                                <source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/hair_dt.jpg?v=1679383890" media="(min-width: 992px)" />
                                <img className="w-100" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/hair_3.png?v=1662715284" loading="lazy" />
                            </picture>
                            <figcaption className="p-2 pt-md-4 text-start text-lg-center">
                                <strong className="playground__title mb-3 mb-md-4">Hair</strong>
                                <p className="playground__subtitle mt-1">Explore our award-winning <br />Like a Virgin hair range</p>
                            </figcaption>
                        </figure>
                    </a>
                    <a href="#" className="btn btn-lg btn-primary">Shop Hair</a>
                </div>

                <div className="col-md-3 px-g">
                    <a href="/" className="text-body d-block">
                        <figure className="playground--simple-square bg-yellow-light position-relative mb-g mt-3 mb-md-3 pb-md-0 overflow-hidden">
                            <picture className="d-block">
                                <source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/tan_dt.jpg?v=1679383988" media="(min-width: 992px)" />
                                <img className="w-100" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/tan_2.png?v=1662715284" loading="lazy" />
                            </picture>
                            <figcaption className="p-2 pt-md-4 text-start text-lg-center">
                                <strong className="playground__title mb-3 mb-md-4">Tan</strong>
                                <p className="playground__subtitle mt-1">Explore our award-winning <br />Like a Virgin hair range </p>
                            </figcaption>
                        </figure>
                    </a>
                    <a href="#" className="btn btn-lg btn-primary">Shop Tan</a>
                </div>
                <div className="col-md-3 px-g">
                    <a href="/" className="text-body d-block">
                        <figure className="playground--simple-square bg-primary-light-second position-relative mb-g mt-3 mb-md-3 pb-md-0 overflow-hidden">
                            <picture className="d-block">
                                <source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/body_dt.jpg?v=1679384123" media="(min-width: 992px)" />
                                <img className="w-100" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/body_1.png?v=1662715287" loading="lazy" />
                            </picture>
                            <figcaption className="p-2 pt-md-4 text-start text-lg-center">
                                <strong className="playground__title mb-3 mb-md-4">Body</strong>
                                <p className="playground__subtitle mt-1">Explore Glow Figure. It's Bali <br />beauty for your body </p>
                            </figcaption>
                        </figure>
                    </a>
                    <a href="#" className="btn btn-lg btn-primary">Shop Body</a>
                </div>
                <div className="col-md-3 px-g">
                    <a href="/" className="text-body d-block">
                        <figure className="playground--simple-square bg-suncare-blue position-relative mb-g mt-3 mb-md-3 pb-md-0 overflow-hidden">
                            <picture className="d-block">
                                <source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/suncare_dt.jpg?v=1679384123" media="(min-width: 992px)" />
                                <img className="w-100" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/suncare_1.jpg?v=1679384286" loading="lazy" />
                            </picture>
                            <figcaption className="p-2 pt-md-4 text-start text-lg-center">
                                <strong className="playground__title mb-3 mb-md-4">Suncare</strong>
                                <p className="playground__subtitle mt-1">Explore suncare. Nourish <br />and protect skin with our SPF <br />essentials.</p>
                            </figcaption>
                        </figure>
                    </a>
                    <a href="#" className="btn btn-lg btn-primary">Shop Suncare</a>
                </div>
            </div>
        </section>
    );
};

export default Playground;