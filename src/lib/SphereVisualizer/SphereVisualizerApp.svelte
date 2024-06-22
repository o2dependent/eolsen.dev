<script lang="ts">
	import { onMount } from "svelte";
	import { loadingModule } from "./visualizer-loading.store";
	import { createVisualizerApp } from "./visualizer-app.store";

	onMount(() => {
		loadingModule.set(false);

		const canvas = document.getElementById(
			"babylon-canvas",
		) as HTMLCanvasElement;

		const { dispose } = createVisualizerApp(canvas);

		return () => {
			dispose();
		};
	});
</script>

<canvas
	style="width: 100%; height: 100vh;"
	id="babylon-canvas"
	width="100%"
	height="100vh"
></canvas>
