import {
	Html, Head, Main, NextScript,
} from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
			</Head>
			<body>
				<Main />
				<NextScript />
				<div id="backdrop-root"></div>
				<div id="modal-root"></div>
			</body>
		</Html>
	);
}
