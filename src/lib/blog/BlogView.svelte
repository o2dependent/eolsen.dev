<script lang="ts">
	import showdown from "showdown";
	import type { BlogFileData } from "$stores/directory.store";

	export let curBlog: BlogFileData & { name: string; body: string };
	let file = "";
	$: {
		const f = new showdown.Converter().makeHtml(curBlog.body);
		file = f;
	}
</script>

<div class="prose prose-invert mb-4 w-full border-b border-slate-600 pb-2">
	<h1
		class="!m-0 !w-fit !bg-gradient-to-r from-red-500 via-pink-600 to-purple-500 bg-clip-text pb-2 !text-5xl !font-black !text-transparent"
	>
		{curBlog?.title}
	</h1>
	<div class="flex w-full">
		<div class="flex flex-grow gap-2">
			{#each curBlog.tags as tag}
				<button
					type="button"
					class="inline-flex h-6 items-center justify-center rounded-full bg-slate-700 px-2 text-sm text-white text-opacity-50 transition-colors hover:text-opacity-100"
				>
					{tag}
				</button>
			{/each}
		</div>
	</div>
</div>
<div class="prose prose-invert w-full pb-12">
	{@html file ?? ""}
</div>
