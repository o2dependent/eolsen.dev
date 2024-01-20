export function clickOutside(node: HTMLElement, callback: () => void) {
	const handleClick = (event: MouseEvent) => {
		if (event.target && !node.contains(event.target as HTMLElement)) {
			callback();
		}
	};

	document.addEventListener('mousedown', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('mousedown', handleClick, true);
		}
	};
}
