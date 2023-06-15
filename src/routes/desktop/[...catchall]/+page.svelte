<script>
	import BiosBootScreen from '$lib/biosBootScreen/BiosBootScreen.svelte';

	let loaded = false;
</script>

{#await import('$lib/Desktop.svelte') then Module}
	<Module.default bind:loaded />
{/await}
<!-- <Desktop bind:loaded /> -->
<BiosBootScreen {loaded} />
<!-- <BootScreen /> -->
