import Testimonial from '@/sections/Testimonial';

const Editors = () => {
    const DATA = [
        {
            id: 1,
            srcSet: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_nylon_x19.jpg?v=1687419613',
            src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_nylon_x15.jpg?v=1687419613'
        },
        {
            id: 2,
            srcSet: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_cosmopolitan_x24.jpg?v=1687419613',
            src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_cosmopolitan_x17.jpg?v=1687419613'
        },
        {
            id: 3,
            srcSet: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_elle_x26.jpg?v=1687419613',
            src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_elle_x22.jpg?v=1687419613'
        },
        {
            id: 4,
            srcSet: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_glamor_x26.jpg?v=1687419613',
            src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_glamor_x17.jpg?v=1687419613'
        },
        {
            id: 5,
            srcSet: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_refinery_x40.jpg?v=1687419613',
            src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_refinery_x36.jpg?v=1687419613'
        },
        {
            id: 6,
            srcSet: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_mail-online_x26.jpg?v=1687419613',
            src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_mail-online_x17.jpg?v=1687419613'
        }
    ];
    return (
        <section className="list-logo container my-4 overflow-scroll lg:overflow-hidden">
            <ul className="list-unstyled flex -mx-hg lg:-mx-g items-center lg:justify-between lg:px-g flex-nowrap mb-0">
                <li className="w-auto flex grow-0 shrink-0 px-hg lg:px-g basis-auto lg:grid lg:grid-cols-1">Featured in:</li>
                {DATA.map((logo) => <Testimonial key={logo.id} data={logo} />)}
            </ul>
        </section>
    )
}

export default Editors;
