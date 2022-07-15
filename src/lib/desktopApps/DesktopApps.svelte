<script lang="ts">
	import Project from '$lib/project/Project.svelte';

	import Terminal from '$lib/terminal/Terminal.svelte';
	import { apps } from '$stores/apps.store';
</script>

{#each $apps as appWindow (appWindow.id)}
	{#if appWindow.name === 'Terminal'}
		<Terminal {appWindow} />
	{:else if appWindow.name === 'Project'}
		<Project {appWindow} />
	{:else}
		<div>srry uwu</div>
	{/if}
{/each}
