<script lang="ts">
	import { onMount } from "svelte";
	import { fly, fade } from "svelte/transition";
	let mounted = false;
	export let audio: HTMLAudioElement;
	let ringVisible = false;
	onMount(() => (mounted = true));
	$: {
		if (mounted && audio) {
			// console.log(audio);
			audio?.play?.();
			setTimeout(() => {
				ringVisible = true;
			}, 1750);
		}
	}
</script>

{#if mounted}
	<div
		in:fade={{
			duration: 222,
		}}
		out:fade={{
			duration: 1000,
		}}
		class="overflow-hidden rounded-full {ringVisible
			? 'ring-[50vmax]'
			: 'ring-0'} ring-white {ringVisible
			? 'ring-opacity-100'
			: 'ring-opacity-0'} transition-all duration-1000"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="512"
			height="512"
			viewBox="0 0 512 512"
			fill="none"
		>
			<circle cx="256" cy="256" r="256" fill="black" />
			<mask
				id="mask0_405_643"
				style="mask-type:alpha"
				maskUnits="userSpaceOnUse"
				x="51"
				y="58"
				width="412"
				height="412"
			>
				<circle cx="257" cy="264" r="206" fill="#FEFEFE" />
			</mask>
			<g mask="url(#mask0_405_643)">
				<path
					in:fly={{
						duration: 300,
						x: -500,
						delay: 222,
					}}
					d="M43 93H471V143H43V93Z"
					fill="#FEFEFE"
				/>
				<path
					in:fly={{
						duration: 300,
						x: -250,
						delay: 705,
					}}
					d="M43 238H282V288H43V238Z"
					fill="#FEFEFE"
				/>
				<path
					in:fly={{
						duration: 300,
						x: -500,
						delay: 1083,
					}}
					d="M43 383H471V433H43V383Z"
					fill="#FEFEFE"
				/>
			</g>
		</svg>
	</div>
{/if}
