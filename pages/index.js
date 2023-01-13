import { useEffect, useState } from 'react';

export default function Home() {
	const [files, setFiles] = useState([]);

	useEffect(() => {
		fetch('/api/folders').then((e) => e.json()).then((data) => {
			const { folders } = data;
			setFiles(folders);
		});
	}, []);

	return (
		<div className="container">
			<div className="row">
				<h1>Coco&Eve Styleguide</h1>

			</div>
		</div>
	);
}
