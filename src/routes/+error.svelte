<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/Header.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let isMounted = false;
	let navHeight: number = 0;
	let canvasHeight = 0;
	$: canvasWidth = isMounted ? window.innerWidth : 0;

	onMount(() => {
		isMounted = true;
		window.addEventListener('resize', () => {
			canvasWidth = window.innerWidth;
		});
	});
</script>

<div class="relative h-0 w-0">
	<div class="rainbow absolute left-0 top-0">
		{#await import('$lib/metaballs/Metaballs.svelte')}
			<div
				out:fade={{ duration: 100, delay: 75 }}
				class="w-full h-full bg-black absolute top-0 left-0"
			/>
		{:then Module}
			<div in:fade={{ duration: 100 }}>
				<Module.default bind:width={canvasWidth} bind:height={canvasHeight} />
			</div>
		{/await}
	</div>
</div>
<div bind:clientHeight={canvasHeight} class="background-shift w-full font-roboto text-gray-50">
	<Header bind:navHeight />
	<div class="relative w-full pt-9">
		<div class="fly-down mx-auto w-fit px-4">
			<h1
				style="filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 1px 1px black) drop-shadow(0px 2px 0px black);"
				class="rainbow mx-auto flex max-w-4xl flex-col bg-clip-text text-center text-6xl font-bold md:text-8xl"
			>
				<span><span class="text-transparent">404</span> Not Found</span>
			</h1>
		</div>
		<div class="mt-20 grid w-full grid-cols-1 grid-rows-1">
			<div class="rainbow absolute bottom-0 left-0 h-1 w-screen" />
			<div
				style="grid-column: 1; grid-row: 1;"
				class="relative mx-auto grid w-full max-w-4xl grid-cols-1 grid-rows-1 px-4"
			>
				<div
					style="grid-column: 1; grid-row: 1; width: calc(100% + 0.5rem); height: calc(100% + 0.25rem);"
					class="rainbow -mx-1 -mt-1 aspect-square rounded-t-[1.75rem]"
				/>
				<div
					style="grid-column: 1; grid-row: 1;"
					class="relative z-10 flex w-full flex-grow flex-col overflow-hidden rounded-t-3xl border border-b-0 border-[#374151] bg-black pt-11"
				>
					<div
						class="absolute left-0 top-0 z-10 flex w-full gap-2.5 border-b border-slate-700 bg-neutral-950 p-4"
					>
						<div class="h-2.5 w-2.5 rounded-full bg-red-500 opacity-50" />
						<div class="h-2.5 w-2.5 rounded-full bg-yellow-500 opacity-50" />
						<div class="h-2.5 w-2.5 rounded-full bg-green-500 opacity-50" />
					</div>
					<div class="h-full w-full">
						<iframe
							class="h-full w-full"
							width="560"
							height="315"
							src="https://www.youtube.com/embed/1Bw2dTY3SsQ?controls=0&amp;autoplay=1"
							title="YouTube video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowfullscreen
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<Footer />
