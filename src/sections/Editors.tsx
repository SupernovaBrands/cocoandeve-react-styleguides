import Testimonial from '@/sections/Testimonial';

const Editors = () => {
    const DATA = [
        {
            id: 1,
            srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/05e7dd9f-51b5-43c2-603e-f192867cdb00/public',
            src: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/05e7dd9f-51b5-43c2-603e-f192867cdb00/public',
            size: { width: 84, height: 15, widthLg: 106, heightLg: 19 }
        },
        {
            id: 2,
            srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/90ca804e-f0a1-460d-3bcf-97dd9477d200/public',
            src: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/90ca804e-f0a1-460d-3bcf-97dd9477d200/public',
            size: { width: 90, height: 17, widthLg: 127, heightLg: 24 }
        },
        {
            id: 3,
            srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/419db1b0-0851-494d-b3fc-4c080ed08f00/public',
            src: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/419db1b0-0851-494d-b3fc-4c080ed08f00/public',
            size: { width: 55, height: 22, widthLg: 65, heightLg: 26 }
        },
        {
            id: 4,
            srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/4905a8e3-d16e-4e27-a903-6a527bd05100/public',
            src: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/4905a8e3-d16e-4e27-a903-6a527bd05100/public',
            size: { width: 72, height: 17, widthLg: 110, heightLg: 26 }
        },
        {
            id: 5,
            srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/ed711819-5774-4639-08fa-3b4cc255c600/public',
            src: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/ed711819-5774-4639-08fa-3b4cc255c600/public',
            size: { width: 62, height: 36, widthLg: 68, heightLg: 40 }
        },
        {
            id: 6,
            srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d21469fa-4de6-48d2-d1ba-ed4afbb5ae00/public',
            src: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d21469fa-4de6-48d2-d1ba-ed4afbb5ae00/public',
            size: { width: 110, height: 17, widthLg: 169, heightLg: 26 }
        }
    ];
    return (
        <section className="list-logo container my-4 overflow-scroll lg:overflow-hidden px-g">
            <ul className="list-unstyled flex -mx-hg lg:-mx-g items-center lg:justify-between lg:px-g flex-nowrap mb-0">
                <li className="w-auto flex grow-0 shrink-0 px-hg lg:px-g basis-auto lg:grid lg:grid-cols-1 h4">Featured in:</li>
                {DATA.map((logo) => <Testimonial key={logo.id} data={logo} />)}
            </ul>
        </section>
    )
}

export default Editors;
