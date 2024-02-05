<script lang="ts">
	import { fade } from "svelte/transition";
	import BootLogo from "./BootLogo.svelte";
	import Background from "./background.png";

	let screenActive: "enter" | "bootup" | "none" = "enter";
	let audio: HTMLAudioElement;

	$: {
		if (screenActive === "bootup") {
			setTimeout(() => {
				screenActive = "none";
			}, 2650);
		}
	}
</script>

<audio bind:this={audio} src="./boot_up.wav" />
{#if screenActive !== "none"}
	<div class="fixed left-0 top-0 z-10 h-full w-full bg-black" />
{/if}
{#if screenActive === "bootup"}
	<div
		in:fade={{
			duration: 222,
		}}
		out:fade={{
			duration: 500,
		}}
		class="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black"
	>
		<BootLogo {audio} />
	</div>
{:else if screenActive === "enter"}
	<div
		out:fade={{
			duration: 500,
		}}
		in:fade={{
			duration: 500,
		}}
		class="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black"
	>
		<img
			class="fixed -z-10 h-full w-full object-cover"
			src={Background.src}
			alt=""
		/>
		<button
			on:click={() => (screenActive = "bootup")}
			class="flex flex-col items-center justify-center gap-4"
		>
			<img
				style="filter: drop-shadow(0 0 0.25rem #00000040);"
				src="./profile_pic.jpg"
				alt="Tortoise shell cat named Lua"
				class="h-40 w-40 rounded-full"
			/>
			<p style="filter: drop-shadow(0 0 0.25rem #00000040);" class="text-2xl">
				Ethan Olsen
			</p>
		</button>
	</div>
{/if}
