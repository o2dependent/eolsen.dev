<script lang="ts">
	import type { BlogFileData } from '$stores/directory.store';
	import type { createHistory } from '$utils/createHistory';

	export let tags: string[];
	export let blogs: (BlogFileData & { name: string })[];
	export let history: ReturnType<typeof createHistory>;
	export let curBlog: (typeof blogs)[0] | undefined;

	let activeTag: string | undefined;
	let activeBlogs = blogs;

	$: {
		if (typeof activeTag === 'string') {
			activeBlogs = blogs.filter((blog) => blog?.tags?.includes?.(activeTag ?? ''));
		} else {
			activeBlogs = blogs;
		}
	}
</script>

<div class="flex h-full w-full flex-col gap-4 px-4">
	<div class="sticky left-0 top-0 flex items-center gap-2 bg-slate-800">
		<span class="text-xl font-black text-white">Tags</span>
		{#each tags as tag}
			<button
				on:click={() => {
					activeTag = activeTag === tag ? undefined : tag;
				}}
				type="button"
				class="inline-flex h-6 items-center justify-center rounded-full bg-slate-700 px-2 text-sm text-white text-opacity-50 shadow-none transition-all hover:text-opacity-100 group-hover:shadow-inner {activeTag ===
				tag
					? 'ring-1 ring-white text-opacity-100'
					: ''}"
			>
				{tag}
			</button>
		{/each}
	</div>
	<div
		class="grid w-full gap-2"
		style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))"
	>
		{#each activeBlogs as blog, index}
			<button
				on:click={() => {
					if ($history.current === blog.name || curBlog?.name === blog.name) {
						return;
					}
					history.push(`${blog.name}`);
				}}
				type="button"
				class="group rounded-xl bg-slate-700/25 p-2 text-left text-white text-opacity-50 shadow-none transition-all hover:bg-slate-700/50 hover:text-opacity-100 hover:shadow-xl"
			>
				<h2 class="text-2xl font-black">
					{blog.title}
				</h2>
				<div class="flex flex-grow gap-2">
					{#each blog.tags as tag}
						<button
							type="button"
							class="inline-flex h-6 items-center justify-center rounded-full bg-slate-700 px-2 text-sm text-white text-opacity-50 shadow-none transition-all hover:text-opacity-100 group-hover:shadow-inner"
						>
							{tag}
						</button>
					{/each}
				</div>
			</button>
		{/each}
	</div>
</div>
