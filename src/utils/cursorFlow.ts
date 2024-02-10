import type { Action } from "svelte/action";
import { cursorCircle } from "./cursor-circle.store";

export const cursorFlow: Action = (node, options) => {
	const mouseenter = () => {
		cursorCircle.set({
			el: node,
		});
	};
	const mouseleave = () => {
		cursorCircle.set(null);
	};

	node.addEventListener("mouseenter", mouseenter);
	node.addEventListener("mouseleave", mouseleave);
	return {
		destroy() {
			node.removeEventListener("mouseenter", mouseenter);
			node.removeEventListener("mouseleave", mouseleave);
		},
	};
};
