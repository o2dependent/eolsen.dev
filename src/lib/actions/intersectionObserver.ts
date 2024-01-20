const handleIntersection =
	(callback: () => void): IntersectionObserverCallback =>
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				callback();
			}
		});
	};

export const intersectionObserver = (node: HTMLElement, { callback }: { callback: () => void }) => {
	const observer = new IntersectionObserver(handleIntersection(callback), {
		rootMargin: '0px 0px -50% 0px'
	});
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
