import Play from '../../src/images/icons/play.svg';

const VideoCard = (props: any) => {
	return !props.useCardTemplate ? (
        <figure className="video-card mb-4 px-lg-2">
            <picture className="block relative w-full">
                <source srcSet={props.item.srcSet} media="(min-width: 992px)" />
                <img src={props.item.src} alt="Placeholder" className="block w-full" />
                <Play className="svg" fill="white" />
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