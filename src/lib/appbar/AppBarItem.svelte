<script lang="ts">
	import { addApp, type AppNames } from '../../stores/apps.store';
	import { fade } from 'svelte/transition';
	import AppIcon from '$lib/appIcons/AppIcon.svelte';

	export let appKey: string;

	let isHovered: boolean = false;

	const onAddAppHandler = (appString: string) => () => addApp(appString as AppNames);
</script>

<button
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
	on:click={onAddAppHandler(appKey)}
	class="group relative flex flex-col items-center justify-center"
>
	<!-- <div class="h-12 w-12 flex items-center justify-center rounded-sm bg-neutral-500">
	</div> -->
	<AppIcon {appKey} />
	{#if isHovered}
		<p
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 100 }}
			style="filter: drop-shadow(1px 0 0 rgb(115 115 115)) drop-shadow(-1px 0 0 rgb(115 115 115)) drop-shadow(0 1px 0 rgb(115 115 115)) drop-shadow(0 -1px 0 rgb(115 115 115));"
			class="absolute bottom-[4.25rem] left-1/2 w-max -translate-x-1/2 rounded bg-neutral-800 p-0.5 px-2 py-1 text-white before:absolute before:-bottom-1 before:left-1/2 before:h-2 before:w-2 before:-translate-x-1/2 before:rotate-45 before:bg-neutral-800"
		>
			{appKey}
		</p>
	{/if}
</button>
