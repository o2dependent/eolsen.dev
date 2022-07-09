<script>
	import AppBar from '$lib/appbar/AppBar.svelte';
import DesktopApps from '$lib/desktopApps/DesktopApps.svelte';
</script>

<div class="flex flex-col h-full">
	<div class="flex-grow">
		<DesktopApps />
	</div>
	<AppBar />
</div>
