const Testimonial = ({ data }) => (
    <figure className="w-auto flex grow-0 shrink-0 px-hg lg:px-3 basis-auto lg:grid lg:grid-cols-1">
        <picture>
            <source srcSet={data.srcSet} media="(min-width: 992px)" height={data.size.heightLg} width={data.size.widthLg} />
            <img src={data.src} loading="lazy" height={data.size.height} width={data.size.width} alt={data.alt} />
        </picture>
    </figure>
);

export default Testimonial;
