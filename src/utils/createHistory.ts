import { writable } from 'svelte/store';

interface HistoryValue {
	index: number;
	history: string[];
	current: string | undefined;
	canGoBack: boolean;
	canGoForward: boolean;
}

export const createHistory = (baseHistory: string) => {
	const { set, subscribe, update } = writable<HistoryValue>({
		index: 0,
		history: [baseHistory],
		current: undefined,
		canGoBack: false,
		canGoForward: false
	});

	const push = (value: string) => {
		update((oldHistory) => {
			return {
				index: oldHistory.index + 1,
				history: [...oldHistory.history.slice(0, oldHistory.index + 1), value],
				current: value,
				canGoBack: true,
				canGoForward: false
			};
		});
	};

	const back = () => {
		update((oldHistory) => {
			const index = Math.max(oldHistory.index - 1, 0);
			return {
				index,
				history: [...oldHistory.history],
				current: oldHistory.history[index],
				canGoBack: index > 0,
				canGoForward: true
			};
		});
	};

	const forward = () => {
		update((oldHistory) => {
			const index = Math.min(oldHistory.index + 1, oldHistory.history.length - 1);
			return {
				index,
				history: [...oldHistory.history],
				current: oldHistory.history[index],
				canGoBack: true,
				canGoForward: index < oldHistory.history.length - 1
			};
		});
	};

	return {
		subscribe,
		push,
		back,
		forward
	};
};
