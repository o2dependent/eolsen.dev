<script lang="ts">
	import Window from '$lib/window/Window.svelte';
	import type { AppWindow } from '$stores/apps.store';
	import TerminalBase from './TerminalBase.svelte';
	import type { TerminalLine } from './terminal';

	export let appWindow: AppWindow;

	let lines: TerminalLine[] = [
		{
			text: `
 __          __  _
 \\ \\        / / | |
  \\ \\  /\\  / /__| | ___ ___  _ __ ___   ___
   \\ \\/  \\/ / _ \\ |/ __/ _ \\| '_ \` _ \\ / _ \\
    \\  /\\  /  __/ | (_| (_) | | | | | |  __/
     \\/  \\/ \\___|_|\\___\\___/|_| |_| |_|\\___|
`,
			class:
				'w-fit font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-600 to-purple-600'
		},
		{
			text: `
         __  ___    __        ______               __      __  ___
|\\/| /\\ |  \\|__    |__)\\ /   |__  ||__| /\\ |\\ |   /  \\|   /__\`|__ |\\ |
|  |/~~\\|__/|___   |__) |    |___ ||  |/~~\\| \\|   \\__/|___.__/|___| \\|


`,
			class:
				'w-fit pl-10 !font-black text-[0.5rem] leading-[0.6rem] text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-600 to-purple-600'
		}
	];
</script>

<Window {appWindow}>
	<TerminalBase id={appWindow.id} bind:lines />
</Window>

<style>
	label::-webkit-scrollbar-thumb {
		border-radius: 10px !important;
	}
	.stage::before {
		animation: animateBg 10s linear infinite;
		background-image: linear-gradient(
			90deg,
			#897ed3,
			#5b73df,
			#498ada,
			#208ea2,
			#64b3d9,
			#42eca6,
			#64b3d9,
			#208ea2,
			#498ada,
			#5b73df,
			#897ed3
		);
		background-size: 1100% 100%;
	}
	@keyframes animateBg {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 100% 0%;
		}
	}
</style>
