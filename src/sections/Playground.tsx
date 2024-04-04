import { Button } from '@/components/index';

const Playground = (props) => {
    return (
        <section className="container text-center pb-0 playground--collection-list range-banner pt-5">
            <p className="h1 text-nowrap mb-1">Discover our Playground</p>
            <p className="font-bold mb-[1rem]">We're totally coco-nuts about beauty!</p>
            <p className="range-banner__subtitle mb-2 md:mb-4">Infusing powerful and tropical ingredients <br className="lg:hidden" />for amazing results. <br className="hidden lg:block" />21 beauty awards. <br className="lg:hidden" />100% clean. Cruelty free.</p>
            <div className="flex flex-wrap items-center">
                <figure className="w-full lg:w-1/4 px-g relative mb-[1rem]">
                    <a href="#">
                        <picture className="block bg-primary-light-second">
                            <source srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/e15ca9cc-50d1-4f6d-0358-d93c1b36fe00/public" media="(min-width: 992px)" />
                            <img className="w-full" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/playground_hair_mb_828x.jpg?v=1687332953" loading="lazy" />
                        </picture>
                        <figcaption className="w-2/3 md:w-full text-left lg:text-center absolute px-2 md:px-3 lg:px-g hair">
                            <p className="range-banner__title font-bold md:mb-0 text-body-color">Hair</p>
                            <p className="range-banner__caption text-sm lg:px-g text-body-color mb-[1rem]">Glossy, hydrated locks are <br />just one click away!</p>
                            <span className="bg-primary inline-block font-bold hover:bg-primary-darken border-primary text-white rounded-full px-3 py-1 md:px-4 md:py-g">Shop Hair</span>
                        </figcaption>
                    </a>
                </figure>
                <figure className="w-full lg:w-1/4 px-g relative mb-[1rem]">
                    <a href="#">
                        <picture className="block bg-sh-orange-light">
                            <source srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/0cb7f041-82e1-409e-becf-9fc3b442c700/public" media="(min-width: 992px)" />
                            <img className="w-full" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/playground_tan_mb_828x.jpg?v=1687332953" loading="lazy" />
                        </picture>
                        <figcaption className="w-2/3 md:w-full text-left lg:text-center absolute px-2 md:px-3 lg:px-g hair">
                            <p className="range-banner__title font-bold md:mb-0 text-body-color">Tan & SPF</p>
                            <p className="range-banner__caption text-sm text-body-color mb-[1rem]">Everything you need to be safely sun-kissed</p>
                            <span className="bg-primary inline-block font-bold hover:bg-primary-darken border-primary text-white rounded-full px-3 py-1 md:px-4 md:py-g">Shop Tan & SPF</span>
                        </figcaption>
                    </a>
                </figure>
                <figure className="w-full lg:w-1/4 px-g relative mb-[1rem]">
                    <a href="#">
                        <picture className="block bg-suncare-blue">
                            <source srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/cd7179f3-ffda-4adb-0b56-72bad978e600/public" media="(min-width: 992px)" />
                            <img className="w-full" src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/56d68602-7dc7-4692-807c-e51400248a00/828x" loading="lazy" />
                        </picture>
                        <figcaption className="w-2/3 md:w-full text-left lg:text-center absolute px-2 md:px-3 lg:px-g hair">
                            <p className="range-banner__title font-bold md:mb-0 text-body-color">Skin</p>
                            <p className="range-banner__caption text-sm lg:px-g text-body-color mb-[1rem]">Boost your glow with our antioxidant range!</p>
                            <span className="bg-primary inline-block font-bold hover:bg-primary-darken border-primary text-white rounded-full px-3 py-1 md:px-4 md:py-g">Shop Skin</span>
                        </figcaption>
                    </a>
                </figure>
                <figure className="w-full lg:w-1/4 px-g relative mb-[1rem]">
                    <a href="#">
                        <picture className="block bg-bali-bod-blue-light">
                            <source srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/186aae4e-3716-4625-6395-0bcf76a35300/public" media="(min-width: 992px)" />
                            <img className="w-full" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/playground_body_mb_828x.jpg?v=1687332953" loading="lazy" />
                        </picture>
                        <figcaption className="w-2/3 md:w-full text-left lg:text-center absolute px-2 md:px-3 lg:px-g hair">
                            <p className="range-banner__title font-bold md:mb-0 text-body-color">Body</p>
                            <p className="range-banner__caption text-sm lg:px-g text-body-color mb-[1rem]">Meet your all-over obsession, Glow Figure</p>
                            <span className="bg-primary inline-block font-bold hover:bg-primary-darken border-primary text-white rounded-full px-3 py-1 md:px-4 md:py-g">Shop Body</span>
                        </figcaption>
                    </a>
                </figure>
            </div>
        </section>
    );
};

export default Playground;