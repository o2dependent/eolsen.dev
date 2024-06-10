<script lang="ts">
	import Globe from "./../icons/Globe.svelte";
	import Meyda from "meyda";
	import { onMount } from "svelte";
	import { SphereVisualizerApp } from "./App";
	import {
		DropdownMenu,
		ScrollArea,
		Separator,
		Toolbar,
		Tooltip,
	} from "bits-ui";
	import Play from "../icons/Play.svelte";
	import Stop from "../icons/Stop.svelte";
	import ListBullet from "../icons/ListBullet.svelte";
	import { fly } from "svelte/transition";
	import MagicWand from "../icons/MagicWand.svelte";
	import File from "../icons/File.svelte";
	import DotFilled from "../icons/DotFilled.svelte";
	import type { ChangeEventHandler } from "svelte/elements";
	import { cursorFlow } from "$utils/cursorFlow";
	import HorizontalAutoScroll from "./HorizontalAutoScroll.svelte";

	export let audioList: { name: string; url: string }[] = [];

	let loading = true;
	let isAudioListOpen = false;
	let isDropdownOpen = false;
	let currentAudioName = "";
	let willRecord = false;
	let isRecording = false;

	let app: SphereVisualizerApp;

	let audioBuffer: AudioBuffer;
	let audioContext: AudioContext;
	let source: AudioBufferSourceNode;
	let analyzer: Meyda.MeydaAnalyzer;
	let features: Record<string, any> | null = null;
	onMount(() => {
		const canvas = document.getElementById(
			"babylon-canvas",
		) as HTMLCanvasElement;

		app = new SphereVisualizerApp(canvas);
		app.setup().then(() => {
			audioContext = new AudioContext();

			handleRemoteAudio(audioList?.[0]?.url, audioList?.[0]?.name).then(
				() => (loading = false),
			);
		});

		return () => {
			app.dispose();
		};
	});

	const setAnalyzer = () => {
		if (analyzer) analyzer.stop();

		analyzer = Meyda.createMeydaAnalyzer({
			audioContext: audioContext,
			source: source,
			bufferSize: 512,
			featureExtractors: [
				"rms",
				"spectralFlatness",
				"chroma",
				"zcr",
				"complexSpectrum",
				"mfcc",
				"amplitudeSpectrum",
				"energy",
				"loudness",
				"perceptualSharpness",
				"perceptualSpread",
				"powerSpectrum",
				"spectralCentroid",
				"spectralKurtosis",
				"spectralRolloff",
				"spectralSkewness",
				"spectralSlope",
				"spectralSpread",
				"buffer",
			] satisfies Meyda.MeydaAudioFeature[],
			inputs: 2,
			callback: (_features: Record<string, any>) => {
				features = _features;
				if (features !== null) app.setMeydaFeatures(features);
			},
		});
		analyzer.start();
		app.setMeydaAnalyser(analyzer);
	};

	const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		const file = (event?.target as HTMLInputElement)?.files?.[0];

		if (file) {
			const reader = new FileReader();

			reader.onload = (e) => {
				const buffer = e?.target?.result;
				loadAudioBuffer(buffer).then(setAnalyzer);
				currentAudioName =
					file?.name?.split(/.mp3|.mp4/)?.[0] ?? "Custom Audio";
			};

			reader.readAsArrayBuffer(file);
		}
	};

	const loadAudioBuffer = async (
		buffer: string | ArrayBuffer | null | undefined,
	) => {
		if (playing) stopAudio();

		if (!buffer) return console.error("No buffer provided");
		if (!(buffer instanceof ArrayBuffer))
			return console.error("Invalid buffer");

		try {
			audioBuffer = await audioContext.decodeAudioData(buffer);

			source = audioContext.createBufferSource();
			source.buffer = audioBuffer;
			source.connect(audioContext.destination);

			// console.log("Audio buffer loaded:", audioBuffer);
		} catch (error) {
			console.error("Error decoding audio data:", error);
		}
	};

	const handleRemoteAudio = async (url: string, name: string) => {
		const res = await fetch(url);
		const buffer = await res.arrayBuffer();
		loadAudioBuffer(buffer).then(setAnalyzer);
		currentAudioName = name;
	};

	let playing = false;

	const playAudio = () => {
		if (playing || !audioBuffer) {
			return;
		}
		if (willRecord) {
			isRecording = true;
			app.startRecording();
		}
		source = audioContext.createBufferSource();
		source.buffer = audioBuffer;
		source.connect(audioContext.destination);
		analyzer.setSource(source);
		source.start();
		source.addEventListener("ended", (e) => {
			stopAudio();
		});
		playing = true;
	};

	const stopAudio = () => {
		if (source && playing) {
			source.stop();
			playing = false;
		}
		if (isRecording) {
			isRecording = false;
			app.stopRecording();
		}
	};

	const togglePlay = () => (playing ? stopAudio() : playAudio());
</script>

<div
	class="fixed bottom-2 left-1/2 w-fit -translate-x-1/2 max-w-xl md:w-full flex items-center justify-center"
>
	<Toolbar.Root
		class="flex h-12 items-center justify-center rounded-10px border border-border bg-background-alt px-[4px] py-1 shadow-mini w-full max-w-screen-sm"
	>
		<div class="flex items-center">
			<Tooltip.Root>
				<Tooltip.Trigger>
					<div class="rounded-9px" use:cursorFlow>
						<Toolbar.Button
							on:click={!loading ? togglePlay : undefined}
							class="inline-flex items-center justify-center rounded-9px px-3 py-2 text-sm font-medium text-foreground/80 transition-all hover:bg-muted active:scale-98 active:bg-dark-10"
						>
							{#if playing}
								<Stop class="size-6" />
							{:else}
								<Play class="size-6" />
							{/if}
						</Toolbar.Button>
					</div>
				</Tooltip.Trigger>
				<Tooltip.Content
					transition={fly}
					transitionConfig={{ y: 8, duration: 150 }}
					sideOffset={8}
				>
					<div class="bg-background">
						<Tooltip.Arrow
							class="rounded-[2px] border-l border-t border-dark-10"
						/>
					</div>
					<div
						class="flex items-center justify-center rounded-input border border-dark-10 bg-background p-3 text-sm font-medium shadow-popover outline-none"
					>
						{#if playing}
							Stop
						{:else}
							Play
						{/if}
					</div>
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger>
					<div class="rounded-9px" use:cursorFlow>
						<Toolbar.Button
							on:click={() => app.seizureModeToggle()}
							data-state={app?.seizureMode ? "active" : undefined}
							class="inline-flex items-center justify-center rounded-9px px-3 py-2 text-sm  font-medium text-foreground/80 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 [data-state=active]:bg-dark-10"
						>
							<MagicWand class="size-6" />
						</Toolbar.Button>
					</div>
				</Tooltip.Trigger>
				<Tooltip.Content
					transition={fly}
					transitionConfig={{ y: 8, duration: 150 }}
					sideOffset={8}
				>
					<div class="bg-background">
						<Tooltip.Arrow
							class="rounded-[2px] border-l border-t border-dark-10"
						/>
					</div>
					<div
						class="flex items-center justify-center rounded-input border border-dark-10 bg-background p-3 text-sm font-medium shadow-popover outline-none"
					>
						Color seizure mode
					</div>
				</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<div class="rounded-9px" use:cursorFlow>
						<Toolbar.Button
							on:click={() => app.toggleWireframe()}
							data-state={app?.seizureMode ? "active" : undefined}
							class="inline-flex items-center justify-center rounded-9px px-3 py-2 text-sm  font-medium text-foreground/80 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 [data-state=active]:bg-dark-10"
						>
							<Globe class="size-6" />
						</Toolbar.Button>
					</div>
				</Tooltip.Trigger>
				<Tooltip.Content
					transition={fly}
					transitionConfig={{ y: 8, duration: 150 }}
					sideOffset={8}
				>
					<div class="bg-background">
						<Tooltip.Arrow
							class="rounded-[2px] border-l border-t border-dark-10"
						/>
					</div>
					<div
						class="flex items-center justify-center rounded-input border border-dark-10 bg-background p-3 text-sm font-medium shadow-popover outline-none"
					>
						Toggle Wireframe
					</div>
				</Tooltip.Content>
			</Tooltip.Root>

			<!-- FEATURE: RECORDING - LOW QUALITY RECORDING | NEED TO ADD AUDIO INTO AUDIO -->
			<div>
				<!-- <Tooltip.Root>
					<Tooltip.Trigger class="h-full flex justify-center items-center">
						<Toolbar.Button

							on:click={() => (willRecord = !willRecord)}
							class="inline-flex items-center justify-center rounded-9px h-full px-1.5 py-0 text-sm font-medium text-foreground/80 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 [data-state=active]:bg-dark-10"
						>
							<DotFilled class="size-10 {willRecord ? 'text-red-500' : ''}" />
						</Toolbar.Button>
					</Tooltip.Trigger>
					<Tooltip.Content
						transition={fly}
						transitionConfig={{ y: 8, duration: 150 }}
						sideOffset={8}
					>
						<div class="bg-background">
							<Tooltip.Arrow
								class="rounded-[2px] border-l border-t border-dark-10"
							/>
						</div>
						<div
							class="flex items-center justify-center rounded-input border border-dark-10 bg-background p-3 text-sm font-medium shadow-popover outline-none"
						>
							Record canvas
						</div>
					</Tooltip.Content>
				</Tooltip.Root> -->
			</div>
		</div>
		<Separator.Root class="-my-1 mx-1 w-[1px] self-stretch bg-dark-10" />
		<div
			class="flex items-center w-32 h-full md:w-full md:flex-grow px-3 shadow-inner bg-muted rounded mx-1 text-muted-foreground whitespace-nowrap"
		>
			<HorizontalAutoScroll text={currentAudioName}></HorizontalAutoScroll>
		</div>
		<Separator.Root class="-my-1 mx-1 w-[1px] self-stretch bg-dark-10" />

		<DropdownMenu.Root
			open={isDropdownOpen}
			onOpenChange={(o) => (isDropdownOpen = o)}
		>
			<DropdownMenu.Trigger class="">
				<div class="flex items-center">
					<div class="rounded-9px" use:cursorFlow>
						<Toolbar.Button
							class="inline-flex items-center justify-center rounded-9px px-3 py-2 text-sm  font-medium text-foreground/80 transition-all hover:bg-muted active:scale-98 active:bg-dark-10"
						>
							<ListBullet class="mr-2 size-6" />
							<span class="whitespace-nowrap hidden md:block">
								Change music
							</span>
						</Toolbar.Button>
					</div>
				</div>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-full max-w-[229px] rounded-xl border border-muted bg-background px-1 py-1.5 shadow-popover"
				transition={fly}
				sideOffset={8}
				side="top"
			>
				<DropdownMenu.Label class="py-3 pl-3 pr-1.5"
					>AudioList</DropdownMenu.Label
				>
				<DropdownMenu.Separator class="my-1 -ml-1 -mr-1 block h-px bg-muted" />
				<ScrollArea.Root class="relative h-[205px] bg-muted rounded-md">
					<ScrollArea.Viewport class="h-full w-full">
						<ScrollArea.Content>
							{#each audioList as { name, url }}
								<div class="rounded-button" use:cursorFlow>
									<DropdownMenu.Item
										on:click={() => handleRemoteAudio(url, name)}
										class="flex pl-3 pr-1.5 h-10 select-none items-center rounded-button py-3 text-sm font-medium !ring-0 !ring-transparent data-[highlighted]:bg-dark-10"
									>
										<div class="flex items-center">
											{name}
										</div>
									</DropdownMenu.Item>
								</div>
							{:else}
								<p class="pl-3">No audio here!</p>
							{/each}
						</ScrollArea.Content>
					</ScrollArea.Viewport>
					<ScrollArea.Scrollbar
						orientation="vertical"
						class="flex h-full w-2.5 touch-none select-none rounded-full border-l border-l-transparent p-px transition-all hover:w-3 hover:bg-dark-10"
					>
						<ScrollArea.Thumb
							class="relative flex-1 rounded-full bg-muted-foreground opacity-40 transition-opacity hover:opacity-100"
						/>
					</ScrollArea.Scrollbar>
					<ScrollArea.Corner />
				</ScrollArea.Root>

				<DropdownMenu.Separator class="my-1 -ml-1 -mr-1 block h-px bg-muted" />
				<div class="rounded-button" use:cursorFlow>
					<DropdownMenu.Item
						on:click={() => {
							const fileInput = document.getElementById("file-input");
							fileInput?.click();
						}}
						class="relative flex h-10 select-none items-center rounded-button py-3 pl-3 pr-1.5 text-sm font-medium !ring-0 !ring-transparent data-[highlighted]:bg-muted cursor-pointer"
					>
						<File class="mr-2" />
						<p>Custom input</p>
					</DropdownMenu.Item>
				</div>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Toolbar.Root>
</div>
<input
	id="file-input"
	class="absolute z-50 left-0 top-0 opacity-0 w-0 h-0 cursor-pointer"
	type="file"
	accept=".mp3, .mp4"
	on:change|stopPropagation={handleFileChange}
/>
<canvas
	style="width: 100%; height: 100vh;"
	id="babylon-canvas"
	width="100%"
	height="100vh"
></canvas>
