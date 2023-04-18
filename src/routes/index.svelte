<script>
	import AppBar from '$lib/appbar/AppBar.svelte';
	import BootScreen from '$lib/bootScreen/BootScreen.svelte';
	import DesktopApps from '$lib/desktopApps/DesktopApps.svelte';
	import DesktopTop from '$lib/desktopTop/DesktopTop.svelte';
	import { onMount } from 'svelte';

	let bootingUp = true;

	onMount(() => {
		setTimeout(() => {
			bootingUp = false;
		}, 2500);
	});
</script>

<BootScreen isShowing={bootingUp} />
<div class="flex h-full flex-col">
	<DesktopTop />
	<div id="desktop" class="flex-grow">
		<div class="container mx-auto">
			<DesktopApps />
		</div>
	</div>
	<AppBar />
</div>
