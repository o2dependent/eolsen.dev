import { writable } from "svelte/store";
import type { AppNames } from "./apps.store";
import { getCollection } from "astro:content";
import Desktop from "$lib/Desktop.svelte";

export type ProjectFileData = Awaited<
	ReturnType<typeof getCollection<"projects">>
>[number]["data"];
// export interface ProjectFileData {
// 	id: string;
// 	title: string;
// 	description: string;
// 	html: ConstructorOfATypedSvelteComponent;
// 	projectLink: string;
// 	githubLink: string;
// 	tags: string[];
// }

export type BlogFileData = Awaited<
	ReturnType<typeof getCollection<"blogs">>
>[number]["data"];
// export interface BlogFileData {
// 	id: string;
// 	title: string;
// 	description: string;
// 	html: ConstructorOfATypedSvelteComponent;
// 	tags: string[];
// }

export type TextFileData = Pick<
	ProjectFileData | BlogFileData,
	"tags" | "description" | "pubDate" | "title" | "heroImage" | "updatedDate"
>;
// export interface TextFileData {
// 	id: string;
// 	title: string;
// 	html: ConstructorOfATypedSvelteComponent;
// }

export interface DirectoryFile {
	name: string;
	slug: string;
	open: AppNames;
	data: ProjectFileData | TextFileData;
	body?: string;
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

const capitalize = (str: string) =>
	str
		.split(" ")
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join(" ");

const desktop = dir.contents.Desktop as Directory;

// transform allFiles into a directory structure
allFiles.forEach((file) => {
	const { slug, collection: _collection, id, body, data } = file ?? {};
	if (typeof _collection !== "string") return;

	const collection = capitalize(_collection) as DirectoryFile["open"];

	if (!(Object.keys(desktop.contents) as AppNames[]).includes(collection))
		return;

	if (
		collection in desktop.contents &&
		isDirectory(desktop.contents[collection])
	) {
		let open = collection as AppNames;
		if (["Projects", "Blogs"].includes(collection)) {
			open = collection.slice(0, -1) as AppNames;
		}
		(desktop.contents[collection] as Directory).contents[id] = {
			data,
			name: id,
			slug: slug ?? "",
			open,
			body,
		} satisfies DirectoryFile;
	}
});

export const directory = writable<Directory>(dir);
