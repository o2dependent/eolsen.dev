import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
	const posts = await getCollection("blogs");
	const projects = await getCollection("projects");
	const items = [
		...posts.map((post) => ({
			...post.data,
			link: `/blog/${post.slug}/`,
		})),
		...projects.map((project) => ({
			...project.data,
			link: `/project/${project.slug}/`,
		})),
	];
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items,
	});
}
