<script lang="ts">
	import type { ProjectFileData, BlogFileData, TextFileData } from '$stores/directory.store';
	import type { createHistory } from '$utils/createHistory';
	export let tags: string[];
	export let items: ((ProjectFileData | BlogFileData | TextFileData) & { name: string })[];
	export let history: ReturnType<typeof createHistory>;
	export let curItem: typeof items[0] | undefined;

	let activeTag: string | undefined;
	let activeItems = items;
	let alertDismissed = false;

	$: {
		if (typeof activeTag === 'string') {
			activeItems = items.filter(
				(item) => 'tags' in item && item?.tags?.includes?.(activeTag ?? '')
			);
		} else {
			activeItems = items;
		}
	}
</script>

<div class="flex h-full w-full flex-col gap-4 px-4">
	<div class="sticky top-0 left-0 flex items-center gap-2 bg-slate-800">
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
	<div class="content-grid grid w-full gap-2">
		{#each activeItems as item, index}
			<button
				on:click={() => {
					if ($history.current === item.name || curItem?.name === item.name) {
						return;
					}
					history.push(`${item.name}`);
				}}
				type="button"
				class="group flex flex-col gap-2 rounded-xl bg-slate-700/25 p-2 text-left text-white text-opacity-50 shadow-none transition-all hover:bg-slate-700/50 hover:text-opacity-100 hover:shadow-xl"
				><div class="flex w-full flex-col justify-between">
					<h2 class="flex-grow text-2xl font-black">
						{item.title}
					</h2>
					{#if 'tags' in item}
						<div class="flex gap-2">
							{#each item.tags as tag}
								<button
									type="button"
									class="inline-flex h-6 items-center justify-center rounded-full bg-slate-700 px-2 text-sm text-white text-opacity-50 shadow-none transition-all hover:text-opacity-100 group-hover:shadow-inner"
								>
									{tag}
								</button>
							{/each}
						</div>
					{/if}
				</div>
				{#if 'description' in item}
					<p>{item?.description ?? ''}</p>
				{/if}
			</button>
		{/each}
	</div>
</div>

<style lang="postcss">
	.content-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-auto-rows: minmax(100px, auto);
	}
</style>
