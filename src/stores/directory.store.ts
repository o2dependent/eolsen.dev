import { writable } from "svelte/store";
import type { AppNames } from "./apps.store";
import Desktop from "$lib/Desktop.svelte";
import type { getCollection } from "astro:content";

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

export const directory = writable<Directory>({} as Directory);
