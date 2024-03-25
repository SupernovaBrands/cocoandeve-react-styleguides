import FiveStars from '../../src/images/icons/five-stars.svg';
import Link from 'next/link';

const ResultCard = (props: any) => {
    return (
        <div className={`${props.useCarousel ? 'carousel-item col-9 lg:w-1/4' : 'lg:w-1/4'} result-card overflow-hidden  ${props.useCarousel && props.activeIndex === props.item.index ? 'active ' : ''} ${props.itemMovingNext ? 'carousel-item-next carousel-item-start ' : ''} ${props.itemMovingPrev ? 'carousel-item-prev carousel-item-end ' : ''}`}>
            <picture>
                <source srcSet={props.item.srcSet} media="(min-width: 992px)"/>
                <img className="w-full" alt="/" src={props.item.src} />
            </picture>
            <div className="p-2 bg-white h-100">
                <p className="flex justify-between items-center mb-0">
                    <FiveStars className="svg--current-color h-[1em] text-primary text-base mb-0" />
                    <span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-blue text-white mb-1 mt-1">Body</span>
                </p>
                <p className='mb-1'>
                    <strong>Product:&nbsp;</strong>
                    <Link href="#" title={props.item.title} className="text-underline">
                        {props.item.title}
                    </Link>
                </p>
                <p className='mb-1'>"{props.item.comment}"</p>
                <p className="underline font-bold">{props.item.author}</p>
            </div>
        </div>
    );
};

export default ResultCard;
