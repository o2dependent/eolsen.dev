<script lang="ts">
	import type { AppNames } from "$stores/apps.store";
	import AppBarItem from "./AppBarItem.svelte";

	const appNames: AppNames[] = ["Terminal", "Project", "Blog", "Pixel Paint"];
</script>

<div class="mb-2 mt-1 flex w-full select-none items-center justify-center">
	<div
		class="flex gap-4 rounded-lg bg-neutral-500 bg-opacity-50 p-2 ring ring-neutral-500 backdrop-blur"
	>
		{#each appNames as appKey}
			<AppBarItem {appKey} />
		{/each}
	</div>
</div>
