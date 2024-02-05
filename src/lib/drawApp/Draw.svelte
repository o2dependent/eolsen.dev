<script lang="ts">
	import Window from "$lib/window/Window.svelte";
	import type { AppWindow } from "$stores/apps.store";
	import chroma from "chroma-js";
	import Select from "svelte-select";
	import ColorDropper from "./svgs/ColorDropper.svelte";
	import FillBucket from "./svgs/FillBucket.svelte";
	import Pencil from "./svgs/Pencil.svelte";
	import { onMount } from "svelte";
	import DrawColorPicker from "./DrawColorPicker.svelte";

	export let appWindow: AppWindow;

	interface Tool {
		name: "pencil" | "select" | "fill";
		color: string;
	}

	let canvas: HTMLCanvasElement;
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
		new Array(pixelNum).fill("#ffffff"),
	);
	let isMouseDown: boolean = false;
	let tool: Tool = {
		name: "pencil",
		color: "#000000",
	};

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
		pixelArray = new Array(pixelNum).fill(new Array(pixelNum).fill(""));
	}

	onMount(() => {
		ctx = canvas.getContext("2d")!;

		const pixelMouseDown = (y: number, x: number) => {
			if (tool.name === "pencil") {
				// draw
				let newArrIdx = [...pixelArray[y]];
				console.log(newArrIdx[x]);
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
					if (newArr[y][x] === tool.color || newArr[y][x] !== currentColor)
						return;
					newArr[y][x] = tool.color;
					fill(y - 1, x);
					fill(y + 1, x);
					fill(y, x - 1);
					fill(y, x + 1);
				};
				fill(y, x);
				pixelArray = [...newArr];
			}
			drawCanvas();
		};

		// > Add event listeners
		canvas.addEventListener("mousedown", (e: MouseEvent) => {
			isMouseDown = true;
			const docListener = () => {
				isMouseDown = false;
				document.removeEventListener("mouseup", docListener);
			};
			const x = Math.floor(e.offsetX / (width / pixelNum));
			const y = Math.floor(e.offsetY / (height / pixelNum));
			pixelMouseDown(y, x);
			document.addEventListener("mouseup", docListener);
		});

		canvas.addEventListener("mousemove", (e: MouseEvent) => {
			if (isMouseDown) {
				const x = Math.floor(e.offsetX / (width / pixelNum));
				const y = Math.floor(e.offsetY / (height / pixelNum));
				pixelMouseDown(y, x);
			}
		});

		canvas.addEventListener("mouseleave", (e: MouseEvent) => {
			isMouseDown = false;
		});

		canvas.addEventListener("mouseenter", (e: MouseEvent) => {
			isMouseDown = false;
		});

		canvas.addEventListener("mouseup", (e: MouseEvent) => {
			isMouseDown = false;
		});

		canvas.addEventListener("mouseout", (e: MouseEvent) => {
			isMouseDown = false;
		});
	});
</script>

<Window
	startingHeight="fit"
	startingWidth="fit"
	windowClass="!resize-none bg-black"
	{appWindow}
>
	<div id="pixel-paint-container">
		<div id="pixel-paint-tools">
			<div class="tool-container">
				<button
					class="tool-btn {tool.name === 'pencil' ? 'selected' : ''}"
					on:click={() => (tool.name = "pencil")}><Pencil /></button
				>
				<button
					class="tool-btn {tool.name === 'select' ? 'selected' : ''}"
					on:click={() => (tool.name = "select")}><ColorDropper /></button
				>
				<button
					class="tool-btn {tool.name === 'fill' ? 'selected' : ''}"
					on:click={() => (tool.name = "fill")}><FillBucket /></button
				>
				<!-- <button on:click={() => drawCanvas()}>Draw canvas</button> -->
			</div>
			<div class="tool-container">
				<!-- <Select
					containerStyles="--min-height: 2rem; --max-height: 2rem; --height: 2rem;"
					inputStyles="--min-height: 2rem; --max-height: 2rem; --height: 2rem;"
					class="p-0 !w-32 text-black"
					clearable={false}
					searchable={false}
					bind:value={pixelNumSelected}
					items={pixelNumSelectValues}
				/> -->
				<!-- <label>Width <input bind:value={width} type="number" /></label> -->
				<!-- <label>Height <input bind:value={height} type="number" /></label> -->
				<!-- <label class="block w-full aspect-square relative p-0.5">
					<div
						style="background-color: {tool.color}"
						class="w-full aspect-square rounded-full border border-black/50"
					></div>
					<input
					class="opacity-0 absolute top-0 left-0 w-full h-full"
					bind:value={tool.color}
					type="color"
					/>
				</label> -->
				<DrawColorPicker bind:color={tool.color} />
			</div>
		</div>
		<canvas id="pixel-paint-canvas" bind:this={canvas} {width} {height} />
	</div>
</Window>

<style lang="postcss">
	#pixel-paint-container {
		@apply relative flex;
	}
	#pixel-paint-canvas {
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
		@apply flex flex-col items-center justify-between w-10 bg-gray-100;
	}
	#pixel-paint-tools > .tool-container {
		@apply flex flex-col w-full;
	}
	.tool-btn {
		@apply bg-gray-100 aspect-square w-full flex items-center justify-center text-black;
		&.selected {
			@apply bg-blue-500 text-white;
		}
	}
</style>
