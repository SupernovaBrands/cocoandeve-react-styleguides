import { resolve } from 'path';

const fs = require('fs');
const lodash = require('lodash');

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(req, res) {
	const pages = './pages';
	const folders = {};
	let count = 0;
	let countF = 0;

	const getFolders = () => new Promise((resolve) => {
		fs.readdir(pages, (err, files) => {
			const collectFiles = files.filter((file, i) => {
				const dir = fs.lstatSync(`${pages}/${file}`).isDirectory();
				if (dir && !file.includes('api')) {
					return file
				}
			});

			collectFiles.forEach(async (file, i) => {
				const dir = fs.lstatSync(`${pages}/${file}`).isDirectory();
				if (dir && !file.includes('api')) {
					count += 1;
					folders[file] ||= [];
					fs.readdir(`${pages}/${file}`, async (errs, fileList) => {
						await fileList.forEach((f) => {
							const obj = { link: `/${file}/${f}`, title: lodash.startCase(f.replace('.jsx', '').replace('-', ' ')) };
							folders[file].push(obj);

							if (i === collectFiles.length - 1) {
								resolve(folders);
							}
						});
					});
				}
			});
		});
	});

	await getFolders().then(() => res.status(200).json({ folders }));
}
