<script>
	import AppBar from '$lib/appbar/AppBar.svelte';
	import DesktopApps from '$lib/desktopApps/DesktopApps.svelte';
</script>

<div class="flex h-full flex-col">
	<div class="flex-grow">
		<DesktopApps />
	</div>
	<AppBar />
</div>
