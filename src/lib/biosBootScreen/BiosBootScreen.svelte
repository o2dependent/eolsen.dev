<script lang="ts">
	import { fade } from 'svelte/transition';

	export let loaded: boolean;
</script>

{#if !loaded}
	<div
		out:fade={{
			duration: 500
		}}
		class="font-mono fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center gap-2 bg-black font-cmd text-2xl text-white"
	>
		<div class="h-24 w-24 overflow-hidden rounded-full ring-2 ring-white">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
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
					<circle cx="257" cy="264" r="206" fill="#fff" />
				</mask>
				<g mask="url(#mask0_405_643)">
					<path d="M43 93H471V143H43V93Z" fill="#fff" />
					<path d="M43 238H282V288H43V238Z" fill="#fff" />
					<path d="M43 383H471V433H43V383Z" fill="#fff" />
				</g>
			</svg>
		</div>
		<div class="spinner">
			<div class="bar1" />
			<div class="bar2" />
			<div class="bar3" />
			<div class="bar4" />
			<div class="bar5" />
			<div class="bar6" />
			<div class="bar7" />
			<div class="bar8" />
			<div class="bar9" />
			<div class="bar10" />
			<div class="bar11" />
			<div class="bar12" />
		</div>
	</div>
{/if}

<style lang="postcss">
	div.spinner {
		position: relative;
		width: 54px;
		height: 54px;
	}

	div.spinner div {
		width: 6%;
		height: 16%;
		background: #fff;
		position: absolute;
		left: 49%;
		top: 43%;
		opacity: 0;
		-webkit-border-radius: 50px;
		-webkit-box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
		-webkit-animation: fade 1s linear infinite;
	}

	@keyframes fade {
		from {
			opacity: 1;
		}
		to {
			opacity: 0.25;
		}
	}

	div.spinner div.bar1 {
		-webkit-transform: rotate(0deg) translate(0, -130%);
		-webkit-animation-delay: 0s;
	}

	div.spinner div.bar2 {
		-webkit-transform: rotate(30deg) translate(0, -130%);
		-webkit-animation-delay: -0.9167s;
	}

	div.spinner div.bar3 {
		-webkit-transform: rotate(60deg) translate(0, -130%);
		-webkit-animation-delay: -0.833s;
	}
	div.spinner div.bar4 {
		-webkit-transform: rotate(90deg) translate(0, -130%);
		-webkit-animation-delay: -0.7497s;
	}
	div.spinner div.bar5 {
		-webkit-transform: rotate(120deg) translate(0, -130%);
		-webkit-animation-delay: -0.667s;
	}
	div.spinner div.bar6 {
		-webkit-transform: rotate(150deg) translate(0, -130%);
		-webkit-animation-delay: -0.5837s;
	}
	div.spinner div.bar7 {
		-webkit-transform: rotate(180deg) translate(0, -130%);
		-webkit-animation-delay: -0.5s;
	}
	div.spinner div.bar8 {
		-webkit-transform: rotate(210deg) translate(0, -130%);
		-webkit-animation-delay: -0.4167s;
	}
	div.spinner div.bar9 {
		-webkit-transform: rotate(240deg) translate(0, -130%);
		-webkit-animation-delay: -0.333s;
	}
	div.spinner div.bar10 {
		-webkit-transform: rotate(270deg) translate(0, -130%);
		-webkit-animation-delay: -0.2497s;
	}
	div.spinner div.bar11 {
		-webkit-transform: rotate(300deg) translate(0, -130%);
		-webkit-animation-delay: -0.167s;
	}
	div.spinner div.bar12 {
		-webkit-transform: rotate(330deg) translate(0, -130%);
		-webkit-animation-delay: -0.0833s;
	}
</style>
