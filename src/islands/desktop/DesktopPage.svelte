<script lang="ts">
	import BiosBootScreen from "$lib/biosBootScreen/BiosBootScreen.svelte";
	import { directory, type Directory } from "$stores/directory.store";
	import { onMount } from "svelte";

	export let dir: Directory;

	let loaded = false;

	onMount(() => {
		window.document.body.setAttribute("data-href", window.location.pathname);
		directory.set(dir);
	});
</script>

{#await import("$lib/Desktop.svelte") then Module}
	<Module.default bind:loaded />
{/await}
<!-- <Desktop bind:loaded /> -->
<BiosBootScreen {loaded} />

<!-- <BootScreen /> -->
<style>
	:global(html, body) {
		color: white;
	}
</style>
