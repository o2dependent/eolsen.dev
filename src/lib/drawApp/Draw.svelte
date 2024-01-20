<script lang="ts">
	import Window from '$lib/window/Window.svelte';
	import type { AppWindow } from '$stores/apps.store';
	export let appWindow: AppWindow;
	import ColorDropper from './svgs/ColorDropper.svelte';
	import FillBucket from './svgs/FillBucket.svelte';
	import Pencil from './svgs/Pencil.svelte';

	import { onMount } from 'svelte';

	interface Tool {
		name: 'pencil' | 'select' | 'fill';
		color: string;
	}

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let width: number = 800;
	let height: number = 800;
	let pixelNum: number = 32;
	let pixelArray: string[][] = new Array(pixelNum).fill(new Array(pixelNum).fill('#ffffff'));
	let isMouseDown: boolean = false;
	let tool: Tool = {
		name: 'pencil',
		color: '#000000'
	};

	const drawCanvas = () => {
		// > Draw a grid of rectangles
		for (let i = 0; i < pixelNum; i++) {
			for (let j = 0; j < pixelNum; j++) {
				ctx.fillStyle = pixelArray[j][i];
				ctx.fillRect(
					i * (width / pixelNum),
					j * (height / pixelNum),
					width / pixelNum,
					height / pixelNum
				);
			}
		}
		requestAnimationFrame(drawCanvas);
	};

	$: {
		pixelArray = new Array(pixelNum).fill(new Array(pixelNum).fill('#ffffff'));
	}

	onMount(() => {
		ctx = canvas.getContext('2d')!;

		requestAnimationFrame(drawCanvas);

		const pixelMouseDown = (y: number, x: number) => {
			if (tool.name === 'pencil') {
				// draw
				let newArrIdx = [...pixelArray[y]];
				newArrIdx[x] = tool.color;
				pixelArray[y] = newArrIdx;
				pixelArray = [...pixelArray];
			} else if (tool.name === 'select') {
				// change color to current pixel color
				tool.color = pixelArray[y][x];
				tool.name = 'pencil';
			} else if (tool.name === 'fill') {
				// recursively fill all pixels of the same color with current color
				const currentColor = pixelArray[y][x];
				let newArr = [...pixelArray].map((row) => [...row]);

				const fill = (y: number, x: number) => {
					if (y < 0 || y > pixelNum - 1 || x < 0 || x > pixelNum - 1) return;
					if (newArr[y][x] === tool.color || newArr[y][x] !== currentColor) return;
					newArr[y][x] = tool.color;
					fill(y - 1, x);
					fill(y + 1, x);
					fill(y, x - 1);
					fill(y, x + 1);
				};
				fill(y, x);
				pixelArray = [...newArr];
			}
		};

		// > Add event listeners
		canvas.addEventListener('mousedown', (e: MouseEvent) => {
			isMouseDown = true;
			const docListener = () => {
				isMouseDown = false;
				document.removeEventListener('mouseup', docListener);
			};
			const x = Math.floor(e.offsetX / (width / pixelNum));
			const y = Math.floor(e.offsetY / (height / pixelNum));
			pixelMouseDown(y, x);
			document.addEventListener('mouseup', docListener);
		});

		canvas.addEventListener('mousemove', (e: MouseEvent) => {
			if (isMouseDown) {
				const x = Math.floor(e.offsetX / (width / pixelNum));
				const y = Math.floor(e.offsetY / (height / pixelNum));
				pixelMouseDown(y, x);
			}
		});

		canvas.addEventListener('mouseleave', (e: MouseEvent) => {
			isMouseDown = false;
		});

		canvas.addEventListener('mouseenter', (e: MouseEvent) => {
			isMouseDown = false;
		});

		canvas.addEventListener('mouseup', (e: MouseEvent) => {
			isMouseDown = false;
		});

		canvas.addEventListener('mouseout', (e: MouseEvent) => {
			isMouseDown = false;
		});
	});
</script>

<Window startingHeight="fit" startingWidth="fit" windowClass="!resize-none bg-black" {appWindow}>
	<div class="relative">
		<div class="w-full py-1">
			<label for="pixelNum"
				>Size
				<select name="pixelNum" id="pixelNum" bind:value={pixelNum}>
					<option value={16}>16x16</option>
					<option value={32}>32x32</option>
					<option value={64}>64x64</option>
				</select>
			</label>
			<!-- <label>Width <input bind:value={width} type="number" /></label> -->
			<!-- <label>Height <input bind:value={height} type="number" /></label> -->
			<label>Color <input bind:value={tool.color} type="color" max="100" /></label>
			<button
				class="tool-btn {tool.name === 'pencil' ? 'selected' : ''}"
				on:click={() => (tool.name = 'pencil')}><Pencil /></button
			>
			<button
				class="tool-btn {tool.name === 'select' ? 'selected' : ''}"
				on:click={() => (tool.name = 'select')}><ColorDropper /></button
			>
			<button
				class="tool-btn {tool.name === 'fill' ? 'selected' : ''}"
				on:click={() => (tool.name = 'fill')}><FillBucket /></button
			>
			<button on:click={() => drawCanvas()}>Draw canvas</button>
			<button class="h-6 w-6" type="button">
				<svg class="h-full w-full" viewBox="0 0 24 24">
					<path
						d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
						class="fill-current"
					/>
				</svg>
			</button>
		</div>
		<canvas class=" rounded-md border border-white/50" bind:this={canvas} {width} {height} />
	</div>
</Window>

<style lang="postcss">
	.tool-btn {
		background-color: white;
		border: 1px solid black;
		border-radius: 0.5rem;
		padding: 0.25rem;
		&.selected {
			filter: invert(1);
		}
	}
	.pixel-art-container {
		background-color: var(--bg);
		border: 1px solid var(--border-color);
		border-radius: 1rem;
		padding: 1rem;
		box-shadow: 0 0.25rem 0.5rem 0.25rem #00000040;
	}
	.row {
		display: flex;
		flex-direction: row;
	}
	.pixel-canvas {
		& .pixel {
			border: 2px solid var(--pixel-color);
			background-color: var(--pixel-color);
			width: var(--pixel-width);
			height: var(--pixel-height);
			&:hover {
				border-color: var(--select-color);
			}
		}
	}
	.download-img {
		width: 50vmin;
		height: 50vmin;
	}
	@media screen and (max-width: 768px) {
		.download-img {
			width: 90vmin;
			height: 90vmin;
		}
	}
	.download-link {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		background-color: var(--highlight);
		border-radius: 0.25rem;
		padding: 0.75rem;
		margin-top: 0.5rem;
		text-decoration: none;
		color: var(--contrast);
	}
	.tool-btn {
		background-color: white;
		border: 1px solid black;
		border-radius: 0.5rem;
		padding: 0.25rem;
		&.selected {
			filter: invert(1);
		}
	}
	.pixel-art-container {
		background-color: var(--bg);
		border: 1px solid var(--border-color);
		border-radius: 1rem;
		padding: 1rem;
		box-shadow: 0 0.25rem 0.5rem 0.25rem #00000040;
	}
	.row {
		display: flex;
		flex-direction: row;
	}
	.pixel-canvas {
		& .pixel {
			border: 2px solid var(--pixel-color);
			background-color: var(--pixel-color);
			width: var(--pixel-width);
			height: var(--pixel-height);
			&:hover {
				border-color: var(--select-color);
			}
		}
	}
	.download-img {
		width: 50vmin;
		height: 50vmin;
	}
	@media screen and (max-width: 768px) {
		.download-img {
			width: 90vmin;
			height: 90vmin;
		}
	}
	.download-link {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		background-color: var(--highlight);
		border-radius: 0.25rem;
		padding: 0.75rem;
		margin-top: 0.5rem;
		text-decoration: none;
		color: var(--contrast);
	}
</style>
