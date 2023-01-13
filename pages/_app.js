import { resolve } from 'path';
import propTypes from 'prop-types';

function MyApp({ Component, pageProps }) {
	return (
		<Component {...pageProps} />
	);
}

MyApp.propTypes = {
	pageProps: propTypes.shape({}),
	Component: propTypes.elementType,
};

export default MyApp;
