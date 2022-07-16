import type { Directory } from '$stores/directory.store';

export const get = async () => {
	// const allDirFiles = import.meta.glob('./**/*.md');
	const allDirFiles = import.meta.glob('../directory/**/*.md');
	const iterableDirFiles = Object.entries(allDirFiles);

	const allFiles = await Promise.all(
		iterableDirFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const postPath = path.slice(2, -3).replace('/directory/', '').split('/');

			return {
				meta: metadata,
				path: postPath
			};
		})
	);

	const dir = { contents: {} } as Directory;

	// transform allFiles into a directory structure
	allFiles.forEach((file) => {
		const { path, meta } = file;
		let currentDir = dir;

		path.forEach((dirName, index) => {
			if (index === path.length - 1) {
				currentDir.contents[dirName] = {
					...meta,
					path: path.join('/')
				};
			}

			if (!currentDir.contents[dirName]) {
				currentDir.contents[dirName] = { name: dirName, contents: {} };
			}

			currentDir = currentDir.contents[dirName] as Directory;
		});
	});

	return {
		body: dir
	};
};
