import { Color3 } from "@babylonjs/core";

export const shaderColorThemes = {
	Candy: {
		colorA: new Color3(1, 0.1, 0.21),
		colorB: new Color3(1, 0.56, 0.1),
		colorC: new Color3(1, 0.2, 0.1),
		colorD: new Color3(0.1, 0.1, 0.1),
	},
	Gore: {
		colorA: new Color3(0.0, 0.0, 0.0),
		colorB: new Color3(1.0, 0.01, 0.01),
		colorC: new Color3(1.0, 0.25, 0.25),
		colorD: new Color3(1.0, 1.0, 1.0),
	},
} as const;

export type ShaderColorTheme =
	(typeof shaderColorThemes)[keyof typeof shaderColorThemes];
