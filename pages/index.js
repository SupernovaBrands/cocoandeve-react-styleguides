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
			<h1 className="py-2">Coco&Eve Styleguide</h1>
			<div className="row mt-3">
				{ files && Object.keys(files).map((file) => (
					<div className="col-12 col-lg-6 mb-3 d-flex flex-column align-items-start">
						<h2>{file}</h2>
						{ (files[file].map((subfile, index) => (<a key={`${subfile.title}-${index}`} href={subfile.link}>{subfile.title}</a>))) }
					</div>
				))}
			</div>
		</div>
	);
}
