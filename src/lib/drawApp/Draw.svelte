<script lang="ts">
	import { fly } from "svelte/transition";
	import Window from "$lib/window/Window.svelte";
	import type { AppWindow } from "$stores/apps.store";
	import chroma from "chroma-js";
	import Select from "svelte-select";
	import ColorDropper from "./svgs/ColorDropper.svelte";
	import FillBucket from "./svgs/FillBucket.svelte";
	import Pencil from "./svgs/Pencil.svelte";
	import { onMount } from "svelte";
	import DrawColorPicker from "./DrawColorPicker.svelte";
	import LayerIcon from "./svgs/LayerIcon.svelte";
	import { clickOutside } from "$utils/clickOutside";
	import PlusIcon from "./svgs/PlusIcon.svelte";
	import EyeClosedIcon from "./svgs/EyeClosedIcon.svelte";
	import EyeOpenIcon from "./svgs/EyeOpenIcon.svelte";
	import TrashIcon from "./svgs/TrashIcon.svelte";
	import EllipsisVerticalIcon from "./svgs/EllipsisVerticalIcon.svelte";

	export let appWindow: AppWindow;

	interface Tool {
		name: "pencil" | "select" | "fill" | "eraser";
		color: string;
	}

	let canvas: Record<string, HTMLCanvasElement> = {};
	let ctx: CanvasRenderingContext2D;
	let width: number = 800;
	let height: number = 800;
	let pixelNumSelected: { value: number; label: string } = {
		value: 32,
		label: "32x32",
	};
	$: pixelNum = pixelNumSelected.value;
	const pixelNumSelectValues = [
		{ value: 16, label: "16x16" },
		{ value: 32, label: "32x32" },
		{ value: 64, label: "64x64" },
		{ value: 128, label: "128x128" },
		{ value: 256, label: "256x256" },
	];

	let pixelArray: string[][] = new Array(pixelNum).fill(
		new Array(pixelNum).fill("#ffffff00"),
	);
	let isMouseDown: boolean = false;
	let tool: Tool = {
		name: "pencil",
		color: "#000000",
	};
	let lastPainted: { time: number; x: number; y: number } | null = null;
	const OVERPAINT_DELAY = 100;

	let fillDistance = 1.75;

	const drawCanvas = () => {
		ctx.clearRect(0, 0, width, height);
		// > Draw a grid of rectangles
		for (let i = 0; i < pixelNum; i++) {
			for (let j = 0; j < pixelNum; j++) {
				if (!pixelArray[j][i]) continue;
				ctx.fillStyle = pixelArray[j][i];
				ctx.fillRect(
					i * (width / pixelNum),
					j * (height / pixelNum),
					width / pixelNum,
					height / pixelNum,
				);
			}
		}
	};

	$: {
		pixelArray = new Array(pixelNum).fill(
			new Array(pixelNum).fill("#ffffff00"),
		);
	}

	const pixelMouseDown = (y: number, x: number) => {
		if (!layers[layerSelectedIdx].visible) return;
		if (tool.name === "pencil") {
			// draw
			let newArrIdx = [...pixelArray[y]];
			if (lastPainted?.x === x && lastPainted?.y === y) {
				if (Date.now() - lastPainted.time < OVERPAINT_DELAY) return;
			}
			if (newArrIdx[x])
				newArrIdx[x] = chroma
					.mix(
						newArrIdx[x],
						chroma.hex(tool.color).alpha(1).hex(),
						chroma.hex(tool.color).alpha(),
					)
					.hex();
			else newArrIdx[x] = tool.color;
			pixelArray[y] = newArrIdx;
			pixelArray = [...pixelArray];
			lastPainted = { time: Date.now(), x, y };
		} else if (tool.name === "select") {
			// change color to current pixel color
			tool.color = pixelArray[y][x];
			tool.name = "pencil";
		} else if (tool.name === "fill") {
			// recursively fill all pixels of the same color with current color
			const currentColor = pixelArray[y][x];
			let newArr = [...pixelArray].map((row) => [...row]);

			const fill = (y: number, x: number) => {
				if (y < 0 || y > pixelNum - 1 || x < 0 || x > pixelNum - 1) return;
				const distance = pixelArray[y][x]
					? chroma.distance(pixelArray[y][x], currentColor, "gl")
					: 0;
				if (
					newArr[y][x] === tool.color ||
					newArr[y][x] !== currentColor ||
					distance > fillDistance
				)
					return;
				newArr[y][x] = tool.color;
				fill(y - 1, x);
				fill(y + 1, x);
				fill(y, x - 1);
				fill(y, x + 1);
			};
			fill(y, x);
			pixelArray = [...newArr];
		} else if (tool.name === "eraser") {
			// erase
			let newArrIdx = [...pixelArray[y]];
			if (lastPainted?.x === x && lastPainted?.y === y) {
				if (Date.now() - lastPainted.time < OVERPAINT_DELAY) return;
			}
			newArrIdx[x] = "#ffffff00";
			pixelArray[y] = newArrIdx;
			pixelArray = [...pixelArray];
			lastPainted = { time: Date.now(), x, y };
		}
		drawCanvas();
	};

	// > Add event listeners
	const canvasmousedown = (e: MouseEvent) => {
		isMouseDown = true;
		const docListener = () => {
			isMouseDown = false;
			lastPainted = null;
			document.removeEventListener("mouseup", docListener);
		};
		const x = Math.floor(e.offsetX / (width / pixelNum));
		const y = Math.floor(e.offsetY / (height / pixelNum));
		pixelMouseDown(y, x);
		document.addEventListener("mouseup", docListener);
	};

	const canvasmousemove = (e: MouseEvent) => {
		if (isMouseDown) {
			const x = Math.floor(e.offsetX / (width / pixelNum));
			const y = Math.floor(e.offsetY / (height / pixelNum));
			pixelMouseDown(y, x);
		}
	};

	const canvasmouseleave = (e: MouseEvent) => {
		isMouseDown = false;
		lastPainted = null;
	};

	const canvasmouseenter = (e: MouseEvent) => {
		isMouseDown = false;
		lastPainted = null;
	};

	const canvasmouseup = (e: MouseEvent) => {
		isMouseDown = false;
		lastPainted = null;
	};

	const canvasmouseout = (e: MouseEvent) => {
		isMouseDown = false;
		lastPainted = null;
	};

	let layersOpen = false;
	let layers = [
		{
			name: "Layer 1",
			visible: true,
		},
	];
	let layerSelectedIdx = 0;
	const addLayer = () => {
		let layerNum = 1;
		let layerName = `Layer ${layerNum}`;
		while (layers.some((layer) => layer.name === layerName)) {
			layerNum++;
			layerName = `Layer ${layerNum}`;
		}
		layers = [
			...layers,
			{
				name: layerName,
				visible: true,
			},
		];
	};
	const changeLayer = (idx: number) => {
		layerSelectedIdx = idx;
		ctx = canvas[layers[idx].name]?.getContext("2d", {
			willReadFrequently: true,
		})!;
		const newLayerPixelArray: typeof pixelArray = [];
		for (let y = 0; y < pixelNum; y++) {
			newLayerPixelArray[y] = [];
			for (let x = 0; x < pixelNum; x++) {
				let [r, g, b, a] = [
					...ctx.getImageData(
						x * (width / pixelNum),
						y * (height / pixelNum),
						1,
						1,
					).data,
				];
				if (a === 0) {
					newLayerPixelArray[y][x] = "#ffffff00";
					continue;
				}
				const color = chroma.rgb(r, g, b, a / 255).hex();
				newLayerPixelArray[y][x] = color;
			}
		}
		pixelArray = newLayerPixelArray;
	};
	const removeLayer = (idx: number) => {
		console.log(idx);
		const newLayers = [...layers].filter((_, i) => i !== idx);
		console.log({ layers, newLayers, canvas });
		if (newLayers.length - 1 < layerSelectedIdx) {
			layerSelectedIdx = newLayers.length - 1;
		}
		layers = newLayers;
		changeLayer(layerSelectedIdx);
	};

	onMount(() => {
		ctx = canvas?.[layers[layerSelectedIdx].name]?.getContext("2d", {
			willReadFrequently: true,
		})!;
	});
</script>

<Window
	startingHeight="fit"
	startingWidth="fit"
	windowClass="!resize-none bg-black"
	{appWindow}
>
	<div id="pixel-paint-container">
		<div class:layers-open={layersOpen} id="pixel-paint-tools">
			<div class="settings-container"></div>

			<div class="tool-container">
				<button
					class:selected={tool.name === "pencil"}
					class="tool-btn"
					on:click={() => (tool.name = "pencil")}
				>
					<Pencil />
				</button>
				<button
					class:selected={tool.name === "eraser"}
					class="tool-btn"
					on:click={() => (tool.name = "eraser")}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24px"
						height="24px"
						viewBox="0 0 24 24"
					>
						<path
							fill="currentColor"
							d="M17.25 18H22v2h-6.75zm-12.5 2l-2.125-2.125q-.575-.575-.587-1.425T2.6 15l11-11.4q.575-.6 1.413-.6t1.412.575L21.4 8.55q.575.575.575 1.425T21.4 11.4L13 20z"
						/>
					</svg>
				</button>
				<button
					class:selected={tool.name === "select"}
					class="tool-btn"
					on:click={() => (tool.name = "select")}
				>
					<ColorDropper />
				</button>
				<button
					class:selected={tool.name === "fill"}
					class="tool-btn"
					on:click={() => (tool.name = "fill")}
				>
					<FillBucket />
				</button>
				<div use:clickOutside={() => (layersOpen = false)}>
					<button
						class:selected={layersOpen}
						class="tool-btn relative"
						on:click={() => (layersOpen = !layersOpen)}
					>
						<LayerIcon />
					</button>
					{#if layersOpen}
						<div
							in:fly={{ y: -4, duration: 350 }}
							out:fly={{ y: -4, duration: 250 }}
							id="pixel-paint-layers-container"
						>
							<div class="flex w-full justify-between px-3 pb-2">
								<h2 class="text-2xl">Layers</h2>
								<button on:click={addLayer} type="button" class="aspect-square">
									<PlusIcon />
								</button>
							</div>
							<div class="flex flex-col gap-1 px-2">
								{#each layers as layer, idx}
									<button
										type="button"
										class="flex gap-2 items-center bg-white rounded py-1 px-2"
										class:bg-opacity-15={idx === layerSelectedIdx}
										class:bg-opacity-5={idx !== layerSelectedIdx}
										on:click={() => changeLayer(idx)}
									>
										<label
											class="relative h-5 w-5 flex items-center justify-center cursor-pointer"
										>
											<input
												on:click|stopPropagation
												class="cursor-pointer peer/visible opacity-0 absolute top-0 left-0 w-full h-full"
												type="checkbox"
												on:change={(e) => {
													const newLayers = [...layers];
													newLayers[idx].visible = e.currentTarget.checked;
													layers = newLayers;
												}}
												checked={layer.visible}
											/>
											<div class="peer-checked/visible:hidden">
												<EyeClosedIcon />
											</div>
											<div class="peer-checked/visible:block hidden">
												<EyeOpenIcon />
											</div>
										</label>

										<!-- <input
												type="text"
												name="name"
												on:change={(e) => {
													const newLayers = [...layers];
													newLayers[idx].name = e.currentTarget.value;
													layers = newLayers;
												}}
												value={layer.name}
												class="bg-transparent text-neutral-300 w-full focus:outline-none border-none focus:bg-neutral-500/50 rounded px-1"
											/> -->
										<p class="text-neutral-300 text-left w-full px-1">
											{layer.name}
										</p>
										<button
											type="button"
											disabled={layers?.length === 1}
											on:click={layers?.length > 1
												? () => removeLayer(idx)
												: null}
											class="relative h-5 w-5 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
										>
											<TrashIcon />
										</button>
									</button>
								{/each}
							</div>
						</div>
					{/if}
				</div>
				<!-- <button on:click={() => drawCanvas()}>Draw canvas</button> -->
				<!-- <Select
					containerStyles="--min-height: 2rem; --max-height: 2rem; --height: 2rem;"
					inputStyles="--min-height: 2rem; --max-height: 2rem; --height: 2rem;"
					class="p-0 !w-32 text-black"
					clearable={false}
					searchable={false}
					bind:value={pixelNumSelected}
					items={pixelNumSelectValues}
				/> -->
				<!-- <label>Width <input bind:value={width} type="number" />
</label> -->
				<!-- <label>Height <input bind:value={height} type="number" />
</label> -->
				<!-- <label class="block w-full aspect-square relative p-0.5">
					<div
						style="background-color: {tool.color}"
						class="w-full aspect-square rounded-full border border-black/50"
					>
</div>
					<input
					class="opacity-0 absolute top-0 left-0 w-full h-full"
					bind:value={tool.color}
					type="color"
					/>
				</label> -->
				<DrawColorPicker bind:color={tool.color} />
			</div>
		</div>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<div
			style="width: {width}px; height: {height}px;"
			id="pixel-paint-canvas-container"
			on:mousedown={canvasmousedown}
			on:mousemove={canvasmousemove}
			on:mouseleave={canvasmouseleave}
			on:mouseenter={canvasmouseenter}
			on:mouseup={canvasmouseup}
			on:mouseout={canvasmouseout}
		>
			{#each layers as layer (layer.name)}
				<canvas
					class="absolute top-0 left-0"
					class:opacity-0={!layer.visible}
					bind:this={canvas[layer?.name]}
					{width}
					{height}
				/>
			{/each}
		</div>
	</div>
</Window>

<style lang="postcss">
	#pixel-paint-container {
		@apply relative flex flex-col;
	}
	#pixel-paint-canvas-container {
		--checkerboard-size: 1.5rem;
		background-image: linear-gradient(45deg, #ddd 25%, transparent 25%),
			linear-gradient(135deg, #ddd 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, #ddd 75%),
			linear-gradient(135deg, transparent 75%, #ddd 75%);
		background-color: #eee;
		background-size: var(--checkerboard-size) var(--checkerboard-size);
		background-position:
			0 0,
			calc(var(--checkerboard-size) / 2) 0,
			calc(var(--checkerboard-size) / 2) calc(var(--checkerboard-size) / -2),
			0px calc(var(--checkerboard-size) / 2);
		@apply flex-grow;
	}
	#pixel-paint-tools {
		@apply flex items-center justify-between w-full h-10 bg-neutral-950 relative z-10;
	}
	#pixel-paint-layers-container {
		@apply absolute top-12 right-4 w-56 py-2 rounded bg-neutral-950/95 backdrop-blur-sm text-neutral-300;
	}
	#pixel-paint-layers-container::before {
		content: "";
		@apply absolute -top-1 right-12 w-2 h-2 bg-neutral-950 rotate-45;
	}
	#pixel-paint-tools > .tool-container {
		@apply flex gap-4 pr-4;
	}
	#pixel-paint-tools > .settings-container {
		@apply flex w-full;
	}
	.tool-btn {
		@apply aspect-square h-full flex items-center justify-center text-neutral-300 transition-colors;
		&.selected {
			@apply text-blue-500;
		}
	}
</style>
