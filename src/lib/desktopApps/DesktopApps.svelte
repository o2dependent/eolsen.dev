<script lang="ts">
	import AboutApp from '$lib/aboutApp/AboutApp.svelte';
	import Blog from '$lib/blog/Blog.svelte';
	import Draw from '$lib/drawApp/Draw.svelte';

	import Project from '$lib/project/Project.svelte';

	import Terminal from '$lib/terminal/Terminal.svelte';
	import { apps } from '$stores/apps.store';
</script>

{#each $apps as appWindow (appWindow.id)}
	{#if appWindow.name === 'Terminal'}
		<Terminal {appWindow} />
	{:else if appWindow.name === 'Project'}
		<Project {appWindow} />
	{:else if appWindow.name === 'About Site'}
		<AboutApp {appWindow} />
	{:else if appWindow.name === 'Pixel Paint'}
		<Draw {appWindow} />
	{:else if appWindow.name === 'Blog'}
		<Blog {appWindow} />
	{/if}
{/each}
