<script lang="ts">
	import type { BlogFileData } from '$stores/directory.store';
	import type { createHistory } from '$utils/createHistory';

	import { fly } from 'svelte/transition';

	export let blogs: (BlogFileData & { name: string })[];
	export let history: ReturnType<typeof createHistory>;
	export let curBlog: typeof blogs[0] | undefined;
</script>

<div
	in:fly={{ duration: 200, x: -100 }}
	out:fly={{ duration: 200, x: -100 }}
	class="absolute flex h-full w-60 flex-col border-r-2 border-slate-700 bg-slate-800"
>
	<h2 class="border-b-2 border-slate-700 bg-cyan-900 p-2 text-xl font-bold text-white">Blogs</h2>
	<ul class="flex flex-col gap-2 p-2">
		{#each blogs as blog, index}
			<button
				on:click={() => {
					if ($history.current === blog.name || curBlog?.name === blog.name) {
						return;
					}
					history.push(`${blog.name}`);
				}}
				type="button"
				class="{curBlog?.name === blog.name
					? 'bg-slate-700 text-opacity-100'
					: ''} rounded p-2 text-left text-white text-opacity-50 transition-colors hover:bg-slate-700 hover:text-opacity-100"
			>
				{blog.title}
			</button>
		{/each}
	</ul>
</div>
