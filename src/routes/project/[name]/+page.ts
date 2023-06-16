import {
	directory,
	type Directory,
	type DirectoryFile,
	type ProjectFileData
} from '$stores/directory.store';
import type { Load } from '@sveltejs/kit';
import { get } from 'svelte/store';

const $directory = get(directory);
const projectDir = (
	($directory.contents?.['Desktop'] as Directory)?.contents?.['Projects'] as Directory
).contents;
const projects = Object.keys(projectDir).map((key) => {
	const project = {
		...((projectDir[key as keyof typeof projectDir] as DirectoryFile).data as ProjectFileData),
		name: key
	};
	return project;
});

export const load: Load = async ({ url, params }) => {
	console.log(url);
	if (!params.name) {
		return {
			status: 404,
			success: false,
			project: undefined
		};
	}
	console.log($directory);
	const project = projects.find((project) => project.name === params.name);

	return {
		params,
		status: 200,
		project
	};
};
