import Testimonial from '~/sections/Testimonial';

const Editors = () => {
    return (
        <section className="list-logo container my-4 block">
            <ul className="flex flex-wrap items-center lg:justify-between lg:px-g flex-nowrap mb-0 lg:mx-[-15px] sm:mx-[-7.5px]">
                <li className="col-auto flex-[0_0_auto] w-auto max-w-full h4 mb-0 relative lg:px-g sm:px-hg">Featured in:</li>
                <Testimonial
                    srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_nylon_x19.jpg?v=1687419613"
                    src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_nylon_x15.jpg?v=1687419613"
                >
                </Testimonial>
                <Testimonial
                    srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_cosmopolitan_x24.jpg?v=1687419613"
                    src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_cosmopolitan_x17.jpg?v=1687419613"
                >
                </Testimonial>
                <Testimonial
                    srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_elle_x26.jpg?v=1687419613"
                    src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_elle_x22.jpg?v=1687419613"
                >
                </Testimonial>
                <Testimonial
                    srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_glamor_x26.jpg?v=1687419613"
                    src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_glamor_x17.jpg?v=1687419613"
                >
                </Testimonial>
                <Testimonial
                    srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_refinery_x40.jpg?v=1687419613"
                    src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_refinery_x36.jpg?v=1687419613"
                >
                </Testimonial>
                <Testimonial
                    srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_mail-online_x26.jpg?v=1687419613"
                    src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/pr_mail-online_x17.jpg?v=1687419613"
                >
                </Testimonial>
            </ul>
        </section>
    )
}

export default Editors;