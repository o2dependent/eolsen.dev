<script lang="ts">
	import Project from '$lib/project/Project.svelte';

	import Terminal from '$lib/terminal/Terminal.svelte';
	import { apps } from '$stores/apps.store';
	import { append } from 'svelte/internal';

	console.log({
		apps: $apps
	});
</script>

{#each Object.keys($apps) as appKey}
	{#if appKey === 'Terminal'}
		{#each $apps[appKey] as appWindow (appWindow.id)}
			<Terminal {appKey} {appWindow} />
		{/each}
	{:else if appKey === 'Project'}
		{#each $apps[appKey] as appWindow (appWindow.id)}
			<Project {appKey} {appWindow} />
		{/each}
	{:else}
		<div>srry uwu</div>
	{/if}
{/each}
