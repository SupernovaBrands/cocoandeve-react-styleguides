// import { resolve } from 'path';
import propTypes from 'prop-types';
// import 'bootstrap/dist/css/bootstrap.css'
// import '../src/styles/colors.scss'
// import '../src/styles/svgs-page.scss'
import '../src/styles/main.scss'
import localFont from 'next/font/local';

const sofia = localFont({
	src: [
		{ 
			path: '../src/fonts/SofiaPro-Regular.woff2',
			weight: '400',
	  		style: 'normal',
		},
		{ 
			path: '../src/fonts/SofiaPro-Bold.woff2',
			weight: '700',
	  		style: 'normal',
		}
	],
	variable: '--font-sofia',
});

function MyApp({ Component, pageProps }) {
	return (
		<main className={`${sofia.variable} font-sans`}>
			<Component {...pageProps} />
		</main>
	);
}

MyApp.propTypes = {
	pageProps: propTypes.shape({}),
	Component: propTypes.elementType,
};

export default MyApp;
