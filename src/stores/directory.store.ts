import { writable } from "svelte/store";
import type { AppNames } from "./apps.store";
import { getCollection } from "astro:content";
import Desktop from "$lib/Desktop.svelte";

export interface TextFileData {
	id: string;
	title: string;
	html: ConstructorOfATypedSvelteComponent;
}

export interface ProjectFileData {
	id: string;
	title: string;
	description: string;
	html: ConstructorOfATypedSvelteComponent;
	projectLink: string;
	githubLink: string;
	tags: string[];
}

export interface BlogFileData {
	id: string;
	title: string;
	description: string;
	html: ConstructorOfATypedSvelteComponent;
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

function isDirectory(obj: any): obj is Directory {
	return (
		obj && typeof obj.name === "string" && typeof obj.contents === "object"
	);
}

console.log("HELLLLLLOOOOOO");
// const allDirFiles = import.meta.glob('./**/*.md');
const projects = await getCollection("projects");
const blogs = await getCollection("blogs");
const allFiles = [...projects, ...blogs];

const dir = {
	contents: {
		Desktop: {
			name: "Desktop",
			contents: {
				Projects: { name: "Projects", contents: {} },
				Blogs: { name: "Blogs", contents: {} },
			},
		},
	},
	name: "~",
} as Directory;

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

// transform allFiles into a directory structure
allFiles.forEach((file) => {
	const { slug, collection, id, body, render, data } = file ?? {};
	if (typeof collection !== "string") return;

	let open: DirectoryFile["open"] | null = null;
	if (collection === "projects") open = "Project";
	else if (collection === "blogs") open = "Blog";
	else return;

	let capCollection = capitalize(collection);

	if (
		capCollection in dir.contents &&
		isDirectory((dir.contents.Desktop as Directory).contents[capCollection])
	) {
		(
			(dir.contents.Desktop as Directory).contents[capCollection] as Directory
		).contents[id] = {
			data,
			name: id,
			open,
		} as DirectoryFile;
	}
});
console.log(dir);
export const directory = writable<Directory>(dir);
