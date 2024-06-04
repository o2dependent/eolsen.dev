import gsap from "gsap";
import type { Action } from "svelte/action";

export interface MagneticHoverOptions {
	strength?: { x: number | undefined; y: number | undefined };
	duration?: number | undefined;
	hoverParent?: HTMLElement;
	initTranslate?: { x: number; y: number };
	opacity?: { init: number; hover: number; duration: number };
	scale?: { init: number; hover: number; duration: number };
}

export const magneticHover: Action<HTMLElement, MagneticHoverOptions> = (
	node,
	{ strength, duration, initTranslate, hoverParent, opacity, scale } = {
		strength: { x: 0.3, y: 0.3 },
		duration: 0.8,
		initTranslate: { x: 0, y: 0 },
	},
) => {
	if (!duration) duration = 0.8;
	if (!strength) strength = { x: 0.3, y: 0.3 };
	if (!strength?.x) strength.x = 0.3;
	if (!strength?.y) strength.y = 0.3;
	if (!hoverParent) hoverParent = node;
	if (!initTranslate) initTranslate = { x: 0, y: 0 };

	let boundingRect = node.getBoundingClientRect();
	let top = boundingRect.top + window.scrollY;
	let left = boundingRect.left + window.scrollX;
	const resizeWindow = () => {
		boundingRect = node.getBoundingClientRect();
		top = boundingRect.top + window.scrollY;
		left = boundingRect.left + window.scrollX;
	};
	const mouseleave = () => {
		// Animate the node back to its original position
		gsap.to(node, {
			x: initTranslate?.x!, // Reset horizontal position
			y: initTranslate?.y!, // Reset vertical position
			duration,
			ease: "elastic.out(1,0.3)", // Easing function for a 'springy' return
		});
		if (opacity)
			gsap.to(node, {
				opacity: opacity?.init,
				duration: opacity?.duration,
				ease: "power3.out",
			});
	};
	const mousemove = (e: MouseEvent) => {
		// Calculate mouse position relative to the node
		const mousePosX = e.pageX - left;
		const mousePosY = e.pageY - top;

		// This creates a 'magnetic' effect where the node moves towards the mouse
		gsap.to(node, {
			x: (mousePosX - boundingRect.width / 2) * strength!.x!, // Move horizontally towards mouse
			y: (mousePosY - boundingRect.height / 2) * strength!.y!, // Move vertically towards mouse
			duration, // Duration of the animation
			ease: "power3.out", // Easing function for smooth animation
		});
	};

	const mouseenter = () => {
		if (opacity)
			gsap.to(node, {
				opacity: opacity?.hover,
				duration: opacity?.duration,
				ease: "power3.out",
			});
	};

	hoverParent.addEventListener("mouseleave", mouseleave);
	hoverParent.addEventListener("mouseenter", mouseenter);
	window.addEventListener("resize", resizeWindow);
	hoverParent.addEventListener("mousemove", mousemove);
	return {
		update(updatedOptions) {
			hoverParent!.removeEventListener("mouseleave", mouseleave);
			hoverParent!.removeEventListener("mouseenter", mouseenter);
			hoverParent!.removeEventListener("mousemove", mousemove);

			strength = updatedOptions?.strength
				? updatedOptions?.strength
				: { x: 0.3, y: 0.3 };
			duration = updatedOptions?.duration ? updatedOptions?.duration : 0.8;
			initTranslate = updatedOptions?.initTranslate
				? updatedOptions?.initTranslate
				: { x: 0, y: 0 };
			hoverParent = updatedOptions?.hoverParent
				? updatedOptions?.hoverParent
				: node;

			hoverParent.addEventListener("mouseleave", mouseleave);
			hoverParent.addEventListener("mouseenter", mouseenter);
			window.addEventListener("resize", resizeWindow);
			hoverParent.addEventListener("mousemove", mousemove);
		},
		destroy() {
			hoverParent!.removeEventListener("mouseleave", mouseleave);
			hoverParent!.removeEventListener("mouseenter", mouseenter);
			window.removeEventListener("resize", resizeWindow);
			hoverParent!.removeEventListener("mousemove", mousemove);
		},
	};
};
