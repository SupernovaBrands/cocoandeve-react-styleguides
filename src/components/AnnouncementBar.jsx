import { useState } from 'react';
import PropTypes from 'prop-types';

const AnnouncementBar = (props) => {
	const { text, timer } = props;
	const [mainText, setText] = useState(text);

	return (
		<div className="announcement-bar bg-primary-light w-100">
			<div className="container text-center fw-bold">
				{timer ? (
					<a href="#">{mainText}</a>
				) : (
					<a href="#">{mainText}</a>
				)}
			</div>
		</div>
	);
}

AnnouncementBar.propTypes = {
	text: PropTypes.string.isRequired,
	timer: PropTypes.bool.isRequired,
};

export default AnnouncementBar;
