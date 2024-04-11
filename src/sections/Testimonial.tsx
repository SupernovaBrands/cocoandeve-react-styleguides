const Testimonial = ({ data }) => (
    <li className="w-auto flex grow-0 shrink-0 px-hg lg:px-g basis-auto lg:grid lg:grid-cols-1">
        <picture>
            <source srcSet={data.srcSet} media="(min-width: 992px)" />
            <img className="w-full" src={data.src} loading="lazy" />
        </picture>
    </li>
);

export default Testimonial;
