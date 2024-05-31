import { lerp } from "./math";

export const getInterpolatedValue = (
	arr: number[],
	index: number,
	length: number,
) => {
	const iPercent = index / length;
	const arrIndex = Math.floor(iPercent * (arr?.length || 0));
	const remainder = iPercent * (arr?.length || 0) - arrIndex;
	const val = arr?.[arrIndex] || 0;
	const nextVal = arr?.[arrIndex + 1] || 0;
	const interpolatedVal = lerp(val, nextVal, remainder);

	return interpolatedVal;
};
