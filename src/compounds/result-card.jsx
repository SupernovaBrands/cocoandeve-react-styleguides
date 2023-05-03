import FiveStars from '../../src/images/icons/five-stars.svg';
import Badges from 'react-bootstrap/Badge';
import Link from 'next/link';

const ResultCard = (props) => {
    return (
        <div className={`${props.useCarousel ? 'carousel-item col-9 col-lg-3' : 'col-lg-4'} result-card overflow-hidden  ${props.useCarousel && props.activeIndex === props.item.index ? 'active ' : ''} ${props.itemMovingNext ? 'carousel-item-next carousel-item-start ' : ''} ${props.itemMovingPrev ? 'carousel-item-prev carousel-item-end ' : ''}`}>
            <picture>
                <source srcSet={props.item.srcSet} media="(min-width: 992px)"/>
                <img className="w-100" alt="/" src={props.item.src} />
            </picture>
            <div className="p-2 bg-white h-100 pt-0">
                <p className="d-flex justify-content-between align-items-center mb-0">
                    <FiveStars className="svg text-primary h4 mb-0" />
                    <Badges bg={props.item.badgeColor} className="mb-1 mt-1">{props.item.badge}</Badges>
                </p>
                <p>
                    <strong>Product:&nbsp;</strong>
                    <Link href="#" title={props.item.title} tabIndex="0" className="text-underline">
                        {props.item.title}
                    </Link>
                </p>
                <p>"{props.item.comment}"</p>
                <p className="text-underline fw-bold">{props.item.author}</p>
            </div>
        </div>
    );
};

export default ResultCard;
