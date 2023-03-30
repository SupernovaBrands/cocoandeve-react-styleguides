import { Container } from "react-bootstrap";
import Play from '../../src/images/icons/play.svg';

const VideoCard = (props) => {
	return !props.useCardTemplate ? (
        <figure className={`${props.className} ${props.useCarousel ? 'carousel-item' : ''} video-card text-center ${props.useCarousel && props.activeIndex === props.item.index ? 'active ' : ''} ${props.itemMovingNext ? 'carousel-item-next carousel-item-start ' : ''} ${props.itemMovingPrev ? 'carousel-item-prev carousel-item-end ' : ''}`}>
            <picture className="d-block position-relative w-100">
                <source srcSet={props.item.srcSet} media="(min-width: 992px)" />
                <img src={props.item.src} alt="Placeholder" className="d-block w-100" />
                <Play className="svg" />
            </picture>
            {props.item.title && (
                <figcaption className="text-center mt-2">
                    <h2>{ props.item.title }</h2>
                </figcaption>
            )}
        </figure>
	): (
		<div className={`${props.className} carousel-item ${props.activeIndex === props.item.index ? 'active ' : ''} ${props.itemMovingNext ? 'carousel-item-next carousel-item-start ' : ''} ${props.itemMovingPrev ? 'carousel-item-prev carousel-item-end ' : ''}`}>
			<img className="img-fluid" src={`//via.placeholder.com/600x400?text=${props.item.label}`} alt={`slide ${props.item.index}`}/>
		</div>
	);
}

export default VideoCard;