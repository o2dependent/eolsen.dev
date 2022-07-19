<script lang="ts">
	import Window from '$lib/window/Window.svelte';
	import type { AppWindow } from '$stores/apps.store';

	export let appWindow: AppWindow;
</script>

<Window
	startingHeight="360px"
	startingWidth="560px"
	headerClass="!bg-slate-900 !shadow"
	{appWindow}
>
	<div slot="header" class="flex w-full items-center justify-center pr-14">
		<div
			class="flex items-center justify-center gap-[1px] overflow-hidden rounded-md border border-slate-700 "
		>
			{#each ['Overview', 'About', 'Contact'] as item, i}
				<button
					class="flex rounded px-1 text-center text-slate-500 hover:bg-slate-700 hover:text-white"
				>
					{item}
				</button>
				{#if i < 2}
					<div class="h-3 w-[1px] bg-slate-500" />
				{/if}
			{/each}
		</div>
	</div>
	<div class="h-full w-full bg-slate-800" />
</Window>
