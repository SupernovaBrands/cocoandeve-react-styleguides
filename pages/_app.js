import { resolve } from 'path';
import propTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.css'
import '../src/styles/main.scss'
import '../src/styles/colors.scss'

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
