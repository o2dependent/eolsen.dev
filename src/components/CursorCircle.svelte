<script lang="ts">
	import { onMount } from "svelte";

	let cursorCircle: HTMLDivElement;

	console.clear();

	// Create objects to track mouse position and custom cursor position
	const mouse = { x: 0, y: 0 }; // Track current mouse position
	const previousMouse = { x: 0, y: 0 }; // Store the previous mouse position
	const circle = { x: 0, y: 0 }; // Track the circle position

	// Initialize variables to track scaling and rotation
	let currentScale = 0; // Track current scale value
	let currentAngle = 0; // Track current angle value

	// Smoothing factor for cursor movement speed (0 = smoother, 1 = instant)
	const speed = 0.17;

	// Start animation
	const tick = () => {
		// MOVE
		// Calculate circle movement based on mouse position and smoothing
		circle.x += (mouse.x - circle.x) * speed;
		circle.y += (mouse.y - circle.y) * speed;
		// Create a transformation string for cursor translation
		const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

		// SQUEEZE
		// 1. Calculate the change in mouse position (deltaMouse)
		const deltaMouseX = mouse.x - previousMouse.x;
		const deltaMouseY = mouse.y - previousMouse.y;
		// Update previous mouse position for the next frame
		previousMouse.x = mouse.x;
		previousMouse.y = mouse.y;
		// 2. Calculate mouse velocity using Pythagorean theorem and adjust speed
		const mouseVelocity = Math.min(
			Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4,
			150,
		);
		// 3. Convert mouse velocity to a value in the range [0, 0.5]
		const scaleValue = (mouseVelocity / 150) * 0.5;
		// 4. Smoothly update the current scale
		currentScale += (scaleValue - currentScale) * speed;
		// 5. Create a transformation string for scaling
		const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

		// ROTATE
		// 1. Calculate the angle using the atan2 function
		const angle = (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI;
		// 2. Check for a threshold to reduce shakiness at low mouse velocity
		if (mouseVelocity > 20) {
			currentAngle = angle;
		}
		// 3. Create a transformation string for rotation
		const rotateTransform = `rotate(${currentAngle}deg)`;

		cursorCircle.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
		window.requestAnimationFrame(tick);
	};
	onMount(() => {
		// Start the animation loop
		tick();
		// Update mouse position on the 'mousemove' event
		const mousemove = (e: MouseEvent) => {
			mouse.x = e.x;
			mouse.y = e.y;
		};
		window.addEventListener("mousemove", mousemove);
		return () => {
			window.removeEventListener("mousemove", mousemove);
		};
	});
</script>

<div id="cursor-circle" bind:this={cursorCircle}></div>

<style lang="postcss">
	#cursor-circle {
		--circle-size: 40px;
		height: var(--circle-size);
		width: var(--circle-size);
		top: calc(var(--circle-size) / 2 * -1);
		left: calc(var(--circle-size) / 2 * -1);
		@apply z-50 pointer-events-none rounded-full border-white border fixed;
	}
</style>
