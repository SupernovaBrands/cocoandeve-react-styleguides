import { useState } from 'react';
import PropTypes from 'prop-types';

const AnnouncementBar = (props) => {
	const { text } = props;
	const [mainText, setText] = useState(text);

	return (
		<div className="announcement-bar bg-starorange w-100">
			<div className="container text-center font-weight-bold">{mainText}</div>
		</div>
	);
}

AnnouncementBar.propTypes = {
	text: PropTypes.string.isRequired,
};

export default AnnouncementBar;
