import { useState } from 'react';

const Playground = (props) => {
    return (
        <section className="container pt-5 pb-0  pb-md-5 justify-content-center text-center">
            <div className="row playground playground--simple mb-3 mb-md-0">
                <div className="col-md-4 px-g">
                    <a href="/" className="text-body">
                        <figure className="playground--simple-square bg-secondary-light position-relative mb-g mt-3 mb-md-3 pb-md-0 overflow-hidden">
                            <picture className="d-block">
                                <source srcset="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/hair.jpg?v=1662715284" media="(min-width: 992px)" />
                                <img className="w-100" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/hair_3.png?v=1662715284" loading="lazy" />
                            </picture>
                            <figcaption className="p-2 p-md-5 text-start">
                                <strong className="hero-font-size mb-3 mb-md-4">Hair</strong>
                                <p className="playground__subtitle mt-1">Explore our award-winning <br />Like a Virgin hair range</p>
                            </figcaption>
                        </figure>	
                    </a>
                    <a href="#" className="btn btn-lg btn-primary">Shop Hair</a>
                </div>
                <div className="col-md-4 px-g">
                    <a href="/" className="text-body">
                        <figure className="playground--simple-square bg-primary-light-second position-relative mb-g mt-3 mb-md-3 pb-md-0 overflow-hidden">
                            <picture className="d-block">
                                <source srcset="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/body.png?v=1662715287" media="(min-width: 992px)" />
                                <img className="w-100" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/body_1.png?v=1662715287" loading="lazy" />
                            </picture>
                            <figcaption className="p-2 p-md-5 text-start">
                                <strong className="hero-font-size mb-3 mb-md-4">Body</strong>
                                <p className="playground__subtitle mt-1">Explore Glow Figure. It's Bali <br />beauty for your body </p>
                            </figcaption>
                        </figure>
                    </a>
                    <a href="#" className="btn btn-lg btn-primary">Shop Body</a>
                </div>
                <div className="col-md-4 px-g">
                    <a href="/" className="text-body">
                        <figure className="playground--simple-square bg-yellow-light position-relative mb-g mt-3 mb-md-3 pb-md-0 overflow-hidden">
                            <picture className="d-block">
                                <source srcset="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/tan_1.png?v=1662715284" media="(min-width: 992px)" />
                                <img className="w-100" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/tan_2.png?v=1662715284" loading="lazy" />
                            </picture>
                            <figcaption className="p-2 p-md-5 text-start">
                                <strong className="hero-font-size mb-3 mb-md-4">Tan</strong>
                                <p className="playground__subtitle mt-1">Explore our award-winning <br />Like a Virgin hair range </p>
                            </figcaption>
                        </figure>
                    </a>
                    <a href="#" className="btn btn-lg btn-primary">Shop Tan</a>
                </div>
            </div>
        </section>
    );
};

export default Playground;