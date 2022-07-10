<script lang="ts">
	import TerminalIcon from '$lib/appIcons/TerminalIcon.svelte';
	import { apps } from '../../stores/apps.store';
	import AppBarItem from './AppBarItem.svelte';
</script>

<div class="mb-4 flex w-full select-none items-center justify-center">
	<div
		class="flex gap-4 rounded-lg bg-neutral-500 bg-opacity-50 p-2 ring ring-neutral-500 backdrop-blur"
	>
		{#each Object.keys($apps) as appKey}
			<AppBarItem {appKey} />
		{/each}
	</div>
</div>
