import { writable } from 'svelte/store';

interface HistoryValue {
	index: number;
	history: string[];
	current: string | undefined;
}

export const createHistory = () => {
	const { set, subscribe, update } = writable<HistoryValue>({
		index: 0,
		history: [],
		current: undefined
	});

	const push = (value: string) => {
		update((oldHistory) => {
			return {
				index: oldHistory.index + 1,
				history: [...oldHistory.history.slice(0, oldHistory.index), value],
				current: value
			};
		});
	};

	const back = () => {
		update((oldHistory) => {
			const index = Math.max(oldHistory.index - 1, 0);
			return {
				index,
				history: [...oldHistory.history],
				current: oldHistory.history[index]
			};
		});
	};

	const forward = () => {
		update((oldHistory) => {
			const index = Math.min(oldHistory.index + 1, oldHistory.history.length - 1);
			return {
				index,
				history: [...oldHistory.history],
				current: oldHistory.history[index]
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
