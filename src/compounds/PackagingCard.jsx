import FiveStars from '../../src/images/icons/five-stars.svg';
import Badges from 'react-bootstrap/Badge';
import Link from 'next/link';

const PackagingCard = (props) => {
    return (
        <div className={`${props.useCarousel ? 'carousel-item col-9 col-lg-4' : 'col-lg-4'}  ${props.useCarousel && props.activeIndex === props.item.index ? 'active ' : ''} ${props.itemMovingNext ? 'carousel-item-next carousel-item-start ' : ''} ${props.itemMovingPrev ? 'carousel-item-prev carousel-item-end ' : ''}`}>
            <picture>
                <source srcSet={props.item.srcSet} media="(min-width: 992px)"/>
                <img className="w-100" alt="/" src={props.item.src} />
            </picture>
            <div className="p-2 bg-white h-100">
                <p>
                    <strong>{props.item.title}</strong>
                </p>
                <p>"{props.item.comment}"</p>
            </div>
        </div>
    );
};

export default PackagingCard;
