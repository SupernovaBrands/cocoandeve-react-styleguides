import propTypes from 'prop-types';

export default function Button(props) {
	const { children } = props;
	return (
		<button className="btn btn-primary mb-2" type="button">{children}</button>
	);
}

Button.propTypes = {
	children: propTypes.string.isRequired,
};
