import Link from "next/link";

const PlaygroundCard = ({ data }) => (
    <figure className="w-full lg:w-1/4 px-g relative mb-g">
        <Link href="#">
            <picture className={`rounded block ${data.className}`}>
                <source srcSet={data.srcSet} media="(min-width: 992px)" />
                <img className="rounded w-full" src={data.src} loading="lazy" />
            </picture>
            <figcaption className="w-2/3 md:w-full text-left lg:text-center absolute px-2 md:px-3 lg:px-g top-[50%] -translate-y-[50%] lg:transform-none lg:top-[3.125em] lg:left-0 lg:right-0">
                <p className="text-lg md:text-2xl font-bold md:mb-0 text-body mb-g">{data.title}</p>
                <p className="font-size-sm md:text-base lg:px-g text-body mb-g" dangerouslySetInnerHTML={{ __html: data.subtitle }} />
                <span className="btn btn-lg rounded-full btn-primary px-3 py-1 md:px-4 md:py-g border-2 border-primary">{data.ctaText}</span>
            </figcaption>
        </Link>
    </figure>
);

const Playground = () => {
    const PLAYGROUND = [
        {
            id: 1,
            link: '#',
            className: 'bg-primary-light-second',
            src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/playground_hair_mb_828x.jpg?v=1687332953',
            srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/e15ca9cc-50d1-4f6d-0358-d93c1b36fe00/public',
            title: 'Hair',
            subtitle: 'Glossy, hydrated locks are <br />just one click away!',
            ctaText: 'Shop Hair'
        },
        {
            id: 2,
            link: '#',
            className: 'bg-sh-orange-light',
            src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/playground_tan_mb_828x.jpg?v=1687332953',
            srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/0cb7f041-82e1-409e-becf-9fc3b442c700/public',
            title: 'Tan & SPF',
            subtitle: 'Everything you need to be safely sun-kissed',
            ctaText: 'Shop Tan & SPF'
        },
        {
            id: 3,
            link: '#',
            className: 'bg-suncare-blue',
            src: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/56d68602-7dc7-4692-807c-e51400248a00/828x',
            srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/cd7179f3-ffda-4adb-0b56-72bad978e600/public',
            title: 'Skin',
            subtitle: 'Boost your glow with our antioxidant range!',
            ctaText: 'Shop Skin'
        },
        {
            id: 4,
            link: '#',
            className: 'bg-bali-bod-blue-light',
            src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/playground_body_mb_828x.jpg?v=1687332953',
            srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/186aae4e-3716-4625-6395-0bcf76a35300/public',
            title: 'Body',
            subtitle: 'Meet your all-over obsession, Glow Figure',
            ctaText: 'Shop Body'
        }
    ];
    return (
        <section className="container text-center pb-0 playground--collection-list range-banner pt-5">
            <p className="h1 text-nowrap mb-1">Discover our Playground</p>
            <p className="font-bold mb-g">We're totally coco-nuts about beauty!</p>
            <p className="range-banner__subtitle mb-2 md:mb-4 md:text-lg">Infusing powerful and tropical ingredients <br className="lg:hidden" />for amazing results. <br className="hidden lg:block" />21 beauty awards. <br className="lg:hidden" />100% clean. Cruelty free.</p>
            <div className="flex flex-wrap -mx-hg lg:-mx-g items-center">
                {PLAYGROUND.map((range: any) => <PlaygroundCard data={range} /> )}
            </div>
        </section>
    )
};

export default Playground;
