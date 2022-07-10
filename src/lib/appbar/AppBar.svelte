<script lang="ts">
	import TerminalIcon from '$lib/appIcons/TerminalIcon.svelte'
import {apps} from '../../stores/apps.store'
import AppBarItem from './AppBarItem.svelte';
</script>

<div class="mb-4 w-full flex justify-center items-center">
	<div class="p-2 flex gap-4 rounded-lg bg-neutral-500 bg-opacity-50 backdrop-blur ring ring-neutral-500">
		{#each Object.keys($apps) as appKey}
			<AppBarItem {appKey} />
		{/each}
	</div>
</div>
