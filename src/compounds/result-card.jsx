import FiveStars from '../../src/images/icons/five-stars.svg';

const ResultCard = (props) => {
    return (
        <div className="result-card col-lg-3">
            <picture>
                <source srcSet="https://via.placeholder.com/570x340" media="(min-width: 992px)"/>
                <source srcSet="https://via.placeholder.com/276x197.jpg/EFADBA"/>
                <img className="w-100" alt="/" src="https://via.placeholder.com/276x197.jpg/EFADBA" />
            </picture>
            <div className="p-2 bg-white h-100">
                <p className="d-flex justify-content-between align-items-center mb-0">
                    <FiveStars className="svg text-primary h4 mb-0" />
                    <span className="badge badge-blue mb-1 mt-1">{props.badge}</span>
                </p>
                <p>
                    <strong>Product:&nbsp;</strong>
                    <a href="#" title="Sunny Honey Bali Bronzing Foam" tabIndex="0" className="text-underline">
                        {props.title}
                    </a>
                </p>
                <p>"{props.comment}"</p>
                <p className="text-underline font-weight-bold">{props.author}</p>
            </div>
        </div>
    );  
};

export default ResultCard;