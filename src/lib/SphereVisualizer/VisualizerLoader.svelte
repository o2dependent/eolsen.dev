<script lang="ts">
	import { fade } from "svelte/transition";
	import { loadingGL, loadingModule } from "./visualizer-loading.store";
</script>

{#if $loadingGL || $loadingModule}
	<div out:fade class="cube-wrapper">
		<div class="cube-container">
			<div class="cube blur-cube">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div class="background-blur"></div>
			<div class="cube">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div class="text z-50">
				<h1 class="font-thin text-[3vmin] -mb-[75%]">
					{$loadingGL
						? "Loading Web GL..."
						: $loadingModule
							? "Loading Visualizer Module..."
							: "Lets go!"}
				</h1>
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.cube-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.background-blur {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		backdrop-filter: blur(5px);
		width: 100vw;
		height: 100vh;
		/*      width: calc(var(--size) * 2);
     height: calc(var(--size) * 2); */
	}

	@keyframes loading-rainbow {
		0% {
			color: #fb5b58;
		}
		14.58% {
			color: #ff3d74;
		}
		25.52% {
			color: #f92195;
		}
		37.5% {
			color: #e322bc;
		}
		51.56% {
			color: #b55ee6;
		}
		64.06% {
			color: #7680fc;
		}
		76.04% {
			color: #0096ff;
		}
		87.5% {
			color: #00d0f2;
		}
		100% {
			color: #00e3b8;
		}
	}

	.cube-container {
		--size: 25vmin;
		--color: rgb(238 9 121 / 0.75);
		/* --border-color: rgb(255 255 255 / 1); */
		--border-color: currentColor;
		--border-width: 2px;
		display: grid;
		position: relative;
		min-width: var(--size);
		min-height: var(--size);
		animation: loading-rainbow 10s ease infinite alternate-reverse;

		& .text {
			display: flex;
			justify-content: center;
			align-items: flex-end;
			grid-area: 1/1/2/2;
		}

		& .cube {
			grid-area: 1/1/2/2;
			width: var(--size);
			height: var(--size);
			transform-style: preserve-3d;
			animation: cube 2s infinite ease;
			&.blur-cube div {
				border: calc(var(--border-width) * 2) solid var(--border-color);
			}
			& div {
				width: 100%;
				height: 100%;
				position: absolute;
				border: var(--border-width) solid var(--border-color);
				/*       background: var(--color); */

				&:nth-child(1) {
					transform: translateZ(calc((var(--size) / 2) * -1)) rotateY(180deg);
				}

				&:nth-child(2) {
					transform: rotateY(-270deg) translateX(50%);
					transform-origin: top right;
				}

				&:nth-child(3) {
					transform: rotateY(270deg) translateX(-50%);
					transform-origin: center left;
				}

				&:nth-child(4) {
					transform: rotateX(90deg) translateY(-50%);
					transform-origin: top center;
				}

				&:nth-child(5) {
					transform: rotateX(-90deg) translateY(50%);
					transform-origin: bottom center;
				}

				&:nth-child(6) {
					transform: translateZ(calc(var(--size) / 2));
				}
			}
		}
	}

	@keyframes cube {
		0% {
			transform: rotate(490deg) rotateX(-25deg) rotateY(25deg);
		}
		50% {
			transform: rotate(490deg) rotateX(-385deg) rotateY(25deg);
		}
		100% {
			transform: rotate(490deg) rotateX(-385deg) rotateY(385deg);
		}
	}
</style>
