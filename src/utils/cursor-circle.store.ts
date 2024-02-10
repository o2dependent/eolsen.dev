import { writable } from "svelte/store";

interface CursorCircle {
	el: HTMLElement;
}

export const cursorCircle = writable<CursorCircle | null>(null);
