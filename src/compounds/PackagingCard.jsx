import FiveStars from '../../src/images/icons/five-stars.svg';
import Badges from 'react-bootstrap/Badge';
import Link from 'next/link';

const PackCard = (props) => {
    return (
        <div className={`${props.item.classes} ${props.item.addedClasses} ${props.useCarousel ? 'carousel-item col-9 col-lg-3' : 'col-lg-4'} pack-card  ${props.useCarousel && props.activeIndex === props.item.index ? 'active ' : ''} ${props.itemMovingNext ? 'carousel-item-next carousel-item-start ' : ''} ${props.itemMovingPrev ? 'carousel-item-prev carousel-item-end ' : ''}`}>
            <picture>
                <source srcSet={props.item.srcSet} media="(min-width: 992px)"/>
                <img className="w-100" alt="/" src={props.item.src} />
            </picture>
            <div className="p-2 h-100 bg-primary-light">
                <p>
                    <strong>{props.item.title}</strong>
                </p>
                <p>{props.item.body}</p>
            </div>
        </div>
    );
};

export default PackCard;
