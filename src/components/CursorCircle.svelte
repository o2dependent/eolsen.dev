<script lang="ts">
	import { cursorCircle } from "$utils/cursor-circle.store";
	import { onMount } from "svelte";

	let borderWidth = "1px";

	let transform = "translate(0, 0) rotate(0deg) scale(1, 1)";
	let width = "var(--circle-size)";
	let height = "var(--circle-size)";
	let borderRadius = "100%";
	let top = "calc(var(--circle-size) / 2 * -1)";
	let left = "calc(var(--circle-size) / 2 * -1)";

	// let boundingRect = node.getBoundingClientRect();
	// const styles = window.getComputedStyle(node);
	// const borderRadius = styles?.borderRadius ?? "0px";
	// const transform = styles?.transform ?? "none";

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
		const hoveredEl = $cursorCircle?.el;
		let boundingRect = hoveredEl?.getBoundingClientRect?.() ?? null;
		const styles = hoveredEl ? window.getComputedStyle(hoveredEl) : null;

		const newWidth = boundingRect
			? `${boundingRect?.width}px`
			: "var(--circle-size)";
		if (newWidth !== width) width = newWidth;
		const newHeight = boundingRect
			? `${boundingRect?.height}px`
			: "var(--circle-size)";
		if (newHeight !== height) height = newHeight;
		const newBorderRadius = styles?.borderRadius ?? "100%";
		if (newBorderRadius !== borderRadius) borderRadius = newBorderRadius;
		const newTop = hoveredEl ? "0px" : "calc(var(--circle-size) / 2 * -1)";
		if (newTop !== top) top = newTop;
		const newLeft = hoveredEl ? "0px" : "calc(var(--circle-size) / 2 * -1)";
		if (newLeft !== left) left = newLeft;

		// MOVE
		// Calculate circle movement based on mouse position and smoothing
		circle.x += boundingRect
			? (boundingRect?.x - circle.x) * speed
			: (mouse.x - circle.x) * speed;
		circle.y += boundingRect
			? (boundingRect?.y - circle.y) * speed
			: (mouse.y - circle.y) * speed;
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
		const scaleValue = $cursorCircle
			? (mouseVelocity / 150) * 0.15
			: (mouseVelocity / 150) * 0.5;
		// 4. Smoothly update the current scale
		currentScale += (scaleValue - currentScale) * speed;
		// 5. Create a transformation string for scaling
		const scaleTransform = hoveredEl
			? `scale(1,1)`
			: `scale(${1 + currentScale}, ${1 - currentScale})`;

		// ROTATE
		// 1. Calculate the angle using the atan2 function
		const angle = $cursorCircle
			? 0
			: (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI;
		// 2. Check for a threshold to reduce shakiness at low mouse velocity
		if (mouseVelocity > 20) {
			currentAngle = angle;
		}
		// 3. Create a transformation string for rotation
		const rotateTransform = hoveredEl
			? `rotate(0deg)`
			: `rotate(${currentAngle}deg)`;

		transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
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
		const mousedown = () => {
			borderWidth = "2px";
		};
		const mouseup = () => {
			borderWidth = "1px";
		};
		window.addEventListener("mousemove", mousemove);
		window.addEventListener("mousedown", mousedown);
		window.addEventListener("mouseup", mouseup);
		return () => {
			window.removeEventListener("mousemove", mousemove);
			window.removeEventListener("mousedown", mousedown);
			window.removeEventListener("mouseup", mouseup);
		};
	});
</script>

<div
	id="cursor-circle"
	style:top
	style:left
	style:height
	style:width
	style:border-radius={borderRadius}
	style:border="{borderWidth} solid white"
	style:transform
></div>

<style lang="postcss">
	#cursor-circle {
		--circle-size: 40px;
		height: var(--circle-size);
		width: var(--circle-size);
		top: calc(var(--circle-size) / 2 * -1);
		left: calc(var(--circle-size) / 2 * -1);
		border-color: white;
		opacity: 0.8;
		border-style: solid;
		border-width: 1px;
		transition:
			width 0.075s,
			height 0.075s,
			border-radius 0.2s,
			border-width 0.2s;
		@apply z-50 pointer-events-none rounded-full fixed;
	}
</style>
