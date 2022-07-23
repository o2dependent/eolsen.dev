import { writable } from 'svelte/store';
import type { AppNames } from './apps.store';

export interface TextFileData {
	id: string;
	title: string;
	html: string;
}

export interface ProjectFileData {
	id: string;
	title: string;
	description: string;
	html: string;
	projectLink: string;
	githubLink: string;
	tags: string[];
}

export interface BlogFileData {
	id: string;
	title: string;
	description: string;
	html: string;
	tags: string[];
}

export interface DirectoryFile {
	open: AppNames;
	data: ProjectFileData | TextFileData;
}

export interface Directory {
	name: string;
	contents: { [name: string]: Directory | DirectoryFile };
}
// const allDirFiles = import.meta.glob('./**/*.md');
const allDirFiles = import.meta.globEager('../directory/**/*.{md,svx}');
const iterableDirFiles = Object.entries(allDirFiles);

const allFiles = iterableDirFiles.map(([path, data]) => {
	console.log(data);
	// const resolved = await resolver();
	// const { metadata } = resolved;

	const postPath = path.slice(2, -3).replace('/directory/', '').split('/');

	return {
		meta: { ...data.metadata, html: data.default },
		path: postPath
	};
});

const dir = { contents: {} } as Directory;
console.log({ allFiles });
// transform allFiles into a directory structure
allFiles.forEach((file) => {
	const { path, meta } = file;
	let currentDir = dir;

	path.forEach((dirName, index) => {
		if (index === path.length - 1) {
			currentDir.contents[dirName] = {
				data: meta,
				name: dirName,
				open: dirName
			} as DirectoryFile;
		}

		if (!currentDir.contents[dirName]) {
			currentDir.contents[dirName] = { name: dirName, contents: {} };
		}

		currentDir = currentDir.contents[dirName] as Directory;
	});
});

export const directory = writable<Directory>(dir);
