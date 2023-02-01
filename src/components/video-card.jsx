import { Container } from "react-bootstrap";
import Play from '../../src/images/icons/play.svg';

const VideoCard = (props) => {
    const { title } = props;
	return (
		<figure class="video-card {{class}}">
            <picture class="d-block position-relative w-100" data-toggle="modal"
                data-src="{{src}}"
                data-target="#videoCardModal">
                <source srcset="https://via.placeholder.com/{{#if imgsize}}?text={{imgsize}}{{else}}720x720{{/if}}{{#if imgtext}}?text={{imgtext}}{{/if}}" media="(min-width: 992px)" />
                <img src="https://via.placeholder.com/592x592" alt="Placeholder" class="d-block w-100" />
                <Play className="svg" />
            </picture>
            {title && (
                <figcaption class="text-center mt-2">
                    <h2>{ title }</h2>
                </figcaption>
            )}
        </figure>
	);
}

export default VideoCard;