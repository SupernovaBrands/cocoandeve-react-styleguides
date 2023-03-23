import { useState } from 'react';

const Playground = (props) => {
    return (
        <section class="container pt-5 pb-0  pb-md-5 justify-content-center text-center">
            <div class="row playground playground--simple mb-3 mb-md-0">
                <div class="col-md-4 px-g">
                    <a href="/" class="text-body">
                        <figure class="playground--simple-square bg-secondary-light position-relative mb-g mt-3 mb-md-3 pb-md-0 overflow-hidden">
                            <picture class="d-block">
                                <source srcset="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/hair.jpg?v=1662715284" media="(min-width: 992px)" />
                                <img class="w-100" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/hair_3.png?v=1662715284" loading="lazy" />
                            </picture>
                            <figcaption class="p-2 p-md-5 text-start">
                                <strong class="hero-font-size mb-3 mb-md-4">Hair</strong>
                                <p class="playground__subtitle mt-1">Explore our award-winning <br />Like a Virgin hair range</p>
                            </figcaption>
                        </figure>	
                    </a>
                    <a href="#" class="btn btn-lg btn-primary">Shop Hair</a>
                </div>
                <div class="col-md-4 px-g">
                    <a href="/" class="text-body">
                        <figure class="playground--simple-square bg-primary-light-second position-relative mb-g mt-3 mb-md-3 pb-md-0 overflow-hidden">
                            <picture class="d-block">
                                <source srcset="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/body.png?v=1662715287" media="(min-width: 992px)" />
                                <img class="w-100" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/body_1.png?v=1662715287" loading="lazy" />
                            </picture>
                            <figcaption class="p-2 p-md-5 text-start">
                                <strong class="hero-font-size mb-3 mb-md-4">Body</strong>
                                <p class="playground__subtitle mt-1">Explore Glow Figure. It's Bali <br />beauty for your body </p>
                            </figcaption>
                        </figure>
                    </a>
                    <a href="#" class="btn btn-lg btn-primary">Shop Body</a>
                </div>
                <div class="col-md-4 px-g">
                    <a href="/" class="text-body">
                        <figure class="playground--simple-square bg-yellow-light position-relative mb-g mt-3 mb-md-3 pb-md-0 overflow-hidden">
                            <picture class="d-block">
                                <source srcset="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/tan_1.png?v=1662715284" media="(min-width: 992px)" />
                                <img class="w-100" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/tan_2.png?v=1662715284" loading="lazy" />
                            </picture>
                            <figcaption class="p-2 p-md-5 text-start">
                                <strong class="hero-font-size mb-3 mb-md-4">Tan</strong>
                                <p class="playground__subtitle mt-1">Explore our award-winning <br />Like a Virgin hair range </p>
                            </figcaption>
                        </figure>
                    </a>
                    <a href="#" class="btn btn-lg btn-primary">Shop Tan</a>
                </div>
            </div>
        </section>
    );
};

export default Playground;