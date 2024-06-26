import {
	Scene,
	MeshBuilder,
	Vector3,
	VertexBuffer,
	GlowLayer,
	StandardMaterial,
	Color3,
	Mesh,
	type FloatArray,
	Color4,
	Effect,
	ShaderMaterial,
	ParticleSystem,
	Texture,
	MeshParticleEmitter,
	type Nullable,
} from "@babylonjs/core";
import { lerp } from "../math";
import { getInterpolatedValue } from "../getInterpolatedValue";
import { shaderColorThemes } from "./shaderColorThemes";
import type Meyda from "meyda";

export class SphereVisualizer {
	scene: Scene;
	shaderMaterial: ShaderMaterial;
	ribbon: Mesh;
	paths: Vector3[][];
	vertexPosBuffer: Nullable<FloatArray>;
	particleSystem: ParticleSystem;
	seizureMode: boolean = false;
	shaderColorTheme = "Candy";
	shaderColors = shaderColorThemes["Candy"];

	analyzer: ReturnType<typeof Meyda.createMeydaAnalyzer> | null = null;
	features: Record<string, any> = {};

	constructor(scene: Scene) {
		this.scene = scene;
		this.addShaders();
		this.shaderMaterial = this.makeShaderMaterial();

		// var light = new DirectionalLight("dir01", new Vector3(-1, -2, 1), scene);
		// light.position = new Vector3(20, 40, -20);
		// light.diffuse = new Color3(1, 0, 0);
		// light.specular = new Color3(0, 1, 0);
		// light.groundColor = new Color3(1, 1, 0);

		// Create a glow layer
		const gl = new GlowLayer("glow", scene, {
			mainTextureFixedSize: 1024,
			blurKernelSize: 64,
		});
		gl.intensity = 0.75;

		// Create neon light materials
		const neonMaterial = new StandardMaterial("neonMaterial", scene);
		neonMaterial.emissiveColor = Color3.Teal();
		// neonMaterial.disableLighting = true;

		this.paths = [];
		const colors: Color4[] = [];
		for (let t = 0; t < Math.PI; t += Math.PI / 180) {
			const path: Vector3[] = [];
			for (let a = 0; a < 2 * Math.PI; a += Math.PI / 60) {
				let x = 4 * Math.cos(a) * Math.sin(t);
				let y = 4 * Math.sin(a) * Math.sin(t);
				let z = 4 * Math.cos(t);
				path.push(new Vector3(x, y, z));
			}
			path.push(path[0]); // close circle
			this.paths.push(path);
			var r = 0.5 + Math.random() * 0.2;
			var g = 0.5 + Math.random() * 0.4;
			var b = 0.5;
			colors.push(new Color4(r, g, b, 1));
		}

		const ribbon = MeshBuilder.CreateRibbon("ribbon", {
			pathArray: this.paths,
			closePath: true,
			// sideOrientation: Mesh.DOUBLESIDE,
			sideOrientation: Mesh.FLIP_TILE,
			updatable: true,
		});

		gl.addIncludedOnlyMesh(ribbon);

		// var shadowGenerator = new ShadowGenerator(1024, light);

		// shadowGenerator?.getShadowMap?.()?.renderList?.push(ribbon);
		// shadowGenerator.useBlurCloseExponentialShadowMap = true;
		// shadowGenerator.forceBackFacesOnly = true;
		// shadowGenerator.blurKernel = 32;
		// shadowGenerator.useKernelBlur = true;

		this.vertexPosBuffer = ribbon.getVerticesData(VertexBuffer.PositionKind);
		this.ribbon = ribbon;
		// this.ribbon.material = neonMaterial;
		// this.shaderMaterial.shadowDepthWrapper = new ShadowDepthWrapper(
		// 	this.shaderMaterial,
		// 	scene,
		// );
		this.ribbon.material = this.shaderMaterial;
		// this.ribbon.material.wireframe = true;
		this.ribbon.receiveShadows = true;

		this.particleSystem = this.makeParticleSystem();

		// const hl = new HighlightLayer("hl1", scene);
		// hl.addMesh(this.ribbon, this.shaderColors.colorA);
	}

	setColorTheme(themeName: keyof typeof shaderColorThemes) {
		if (!Object.keys(shaderColorThemes).includes(themeName)) return;
		this.shaderColorTheme = themeName;
		this.shaderColors = shaderColorThemes[themeName];
	}

	toggleWireframe() {
		if (!this.ribbon || !this.ribbon.material) throw new Error("No ribbon");
		this.ribbon.material.wireframe = !this.ribbon.material.wireframe;
	}

	addShaders() {
		Effect.ShadersStore["sphereVisualizerVertexShader"] = `
		precision highp float;
		attribute vec3 position;
		uniform mat4 worldViewProjection;

		varying vec4 vPosition;


		void main() {
				vec4 p = vec4(position, 1.);
				vPosition = p;

				gl_Position = worldViewProjection * p;
		}
`;

		Effect.ShadersStore["sphereVisualizerFragmentShader"] = `
		precision highp float;
		uniform vec3 colorA;
		uniform vec3 colorB;
		uniform vec3 colorC;
		uniform vec3 colorD;
		uniform float iTime;
		uniform float uScaleFactor;
		uniform float uDivisorFactor;

		varying vec4 vPosition;

		vec3 palette( float t ) {

			return colorA + colorB*cos( 6.28318*(colorC*t+colorD) );
	}

		void main() {
			vec3 finalColor = vec3(0.0);
			vec3 uv = vPosition.xyz;
			vec3 uv0 = uv;
			for (float i = 0.0; i < 4.0; i++) {
					uv = abs(uv) / dot(uv, uv);
					float d = length(uv) * exp(-length(uv));

					vec3 col = palette(length(uv) + i*.4 );

					d = sin(d*uScaleFactor)/uDivisorFactor;
					d = abs(d);

					d = pow(0.01 / d, 1.1);

					finalColor += col * d;
			}

			gl_FragColor = vec4(finalColor, 1.0);
		}
`;
	}

	setSeizureMode(seizureMode: boolean) {
		this.seizureMode = seizureMode;
		return this?.seizureMode;
	}

	makeShaderMaterial() {
		const shaderMaterial = new ShaderMaterial(
			"sphereVisualizer",
			this.scene,
			"sphereVisualizer",
			{
				attributes: ["position"],
				uniforms: [
					"worldViewProjection",
					"colorA",
					"colorB",
					"colorC",
					"colorD",
					"iTime",
					"uScaleFactor",
					"uDivisorFactor",
				],
			},
		);
		shaderMaterial.allowShaderHotSwapping = true;

		// shaderMaterial.setColor3("colorA", new Color3(0.5, 0.5, 0.5));
		// shaderMaterial.setColor3("colorB", new Color3(0.5, 0.5, 0.5));
		// shaderMaterial.setColor3("colorC", new Color3(1.0, 1.0, 1.0));
		// shaderMaterial.setColor3("colorD", new Color3(0.0, 0.33, 0.67));

		// shaderMaterial.setColor3("colorA", new Color3(0.5, 0.5, 0.5));
		// shaderMaterial.setColor3("colorB", new Color3(0.5, 0.5, 0.5));
		// shaderMaterial.setColor3("colorC", new Color3(1.0, 1.0, 1.0));
		// shaderMaterial.setColor3("colorD", new Color3(0.0, 0.1, 0.2));

		shaderMaterial.setColor3("colorA", this.shaderColors.colorA);
		shaderMaterial.setColor3("colorB", this.shaderColors.colorB);
		shaderMaterial.setColor3("colorC", this.shaderColors.colorC);
		shaderMaterial.setColor3("colorD", this.shaderColors.colorD);

		shaderMaterial.setFloat("uScaleFactor", 18);
		shaderMaterial.setFloat("uDivisorFactor", 18);

		shaderMaterial.setFloat(
			"iTime",
			this.scene.getEngine().getDeltaTime() / 1000,
		); // Convert to seconds
		return shaderMaterial;
	}

	setPosition(x: number, y: number, z: number) {}

	createParticleSystem(color: Color4, type: number, name: string) {
		const particleSystem1 = new ParticleSystem(name, 2000, this.scene);

		//Texture of each particle
		particleSystem1.particleTexture = new Texture(
			"/textures/flare.png",
			this.scene,
		);
		if (type === 0) {
			particleSystem1.createConeEmitter(2);
		} else if (type === 1) {
			particleSystem1.createSphereEmitter(2);
		}

		// Colors of all particles
		particleSystem1.color1 = color;
		particleSystem1.color2 = color;
		particleSystem1.colorDead = new Color4(0, 0, 0.2, 0.0);

		particleSystem1.subEmitters = [];
		particleSystem1.minSize = 0.1;
		particleSystem1.maxSize = 0.5;
		particleSystem1.minLifeTime = 0.3;
		particleSystem1.maxLifeTime = 0.5;
		particleSystem1.manualEmitCount = 50;
		particleSystem1.disposeOnStop = true;
		particleSystem1.blendMode = ParticleSystem.BLENDMODE_ONEONE;
		particleSystem1.minAngularSpeed = 0;
		particleSystem1.maxAngularSpeed = Math.PI;
		particleSystem1.minEmitPower = 5;
		particleSystem1.maxEmitPower = 6;
		particleSystem1.updateSpeed = 0.005;
		return particleSystem1;
	}

	makeParticleSystem() {
		// Create a particle system
		const particleSystem = new ParticleSystem("particles", 10000, this.scene);
		particleSystem.particleTexture = new Texture(
			"/textures/flare.png",
			this.scene,
		);

		// Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
		particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;

		particleSystem.customShader = this.shaderMaterial;

		particleSystem.minSize = 0.125;
		particleSystem.maxSize = 0.25;

		// Where the particles come from
		var meshEmitter = new MeshParticleEmitter(this.ribbon);
		meshEmitter.useMeshNormalsForDirection = true;
		particleSystem.particleEmitterType = meshEmitter;

		particleSystem.emitter = this.ribbon;

		// Life time of each particle (random between...
		particleSystem.minLifeTime = 0.25;
		particleSystem.maxLifeTime = 1.5;

		// Emission rate
		particleSystem.emitRate = 500;

		// Set the gravity of all particles
		particleSystem.gravity = new Vector3(0, -100, 0);

		// Speed
		particleSystem.minEmitPower = 10;
		particleSystem.maxEmitPower = 100;
		// particleSystem.updateSpeed = 1 / 120;

		// Start the particle system
		particleSystem.start();

		return particleSystem;
	}

	update(elapsedTime: number) {
		const vertexPosBuffer = [...(this?.vertexPosBuffer ?? [])];
		const curVertPosBuf = this.ribbon.getVerticesData(
			VertexBuffer.PositionKind,
		);

		if (this.seizureMode) {
			// SET COLORS
			const chroma = this.features?.chroma ?? [];
			//SECTION -  SEIZURE MODE
			this.shaderMaterial.setColor3(
				"colorA",
				this.shaderColors.colorA.multiply(
					new Color3(
						Math.sin(chroma?.[9] ?? 1 + this.shaderColors.colorA.r),
						Math.sin(chroma?.[10] ?? 1 + this.shaderColors.colorA.g),
						Math.sin(chroma?.[11] ?? 1 + this.shaderColors.colorA.b),
					),
				),
			);
			this.shaderMaterial.setColor3(
				"colorB",
				this.shaderColors.colorB.add(
					new Color3(chroma?.[6] ?? 1, chroma?.[7] ?? 1, chroma?.[8] ?? 1),
				),
			);
			this.shaderMaterial.setColor3(
				"colorC",
				this.shaderColors.colorC.subtract(
					new Color3(chroma?.[3] ?? 1, chroma?.[4] ?? 1, chroma?.[5] ?? 1),
				),
			);
			this.shaderMaterial.setColor3(
				"colorD",
				this.shaderColors.colorD.subtract(
					new Color3(chroma?.[0] ?? 1, chroma?.[1] ?? 1, chroma?.[2] ?? 1),
				),
			);
			//!SECTION
		} else {
			//SECTION - SMOOTH MODE
			this.shaderMaterial.setColor3(
				"colorA",
				this.shaderColors.colorA.subtract(
					new Color3(0, 0, Math.sin(this.features?.spectralFlatness || 0)),
				),
			);
			this.shaderMaterial.setColor3(
				"colorB",
				this.shaderColors.colorB.subtract(
					new Color3(Math.sin(this.features?.spectralFlatness || 0)),
				),
			);
			this.shaderMaterial.setColor3(
				"colorC",
				this.shaderColors.colorC.add(
					new Color3(Math.sin(this.features?.spectralFlatness || 0)),
				),
			);
			this.shaderMaterial.setColor3(
				"colorD",
				this.shaderColors.colorD.add(
					new Color3(Math.sin(this.features?.spectralFlatness || 0)),
				),
			);
			//!SECTION
		}

		for (let i = 0; i < vertexPosBuffer.length; i += 3) {
			const x = vertexPosBuffer[i];
			const y = vertexPosBuffer[i + 1];
			const z = vertexPosBuffer[i + 2];

			const iPercent = i / vertexPosBuffer.length;
			const bufferIndex = Math.floor(
				iPercent * (this.features?.buffer?.length || 0),
				// iPercent * (this.features?.complexSpectrum?.real?.length || 0),
			);
			const bufferVal =
				getInterpolatedValue(
					this.features?.buffer,
					i,
					vertexPosBuffer.length,
				) || 1;
			const chromaVal =
				getInterpolatedValue(
					this.features?.chroma,
					i,
					vertexPosBuffer.length,
				) || 0;
			const loudnessVal = getInterpolatedValue(
				this.features?.loudness?.specific,
				i,
				vertexPosBuffer.length,
			);
			const epsilon = 0.0001; // small constant

			const radius = Math.sqrt(
				(x + epsilon) * (x + epsilon) +
					(y + epsilon) * (y + epsilon) +
					(z + epsilon) * (z + epsilon),
			);
			const theta = Math.atan2(y + epsilon, x + epsilon);
			const phi = Math.acos((z + epsilon) / radius);
			const amp = lerp(0.5, 4, (this.features?.energy || 0) / 100);

			const newRadius =
				radius +
				(Math.sin(
					(x + epsilon) *
						Math.sin(bufferVal) *
						((y + epsilon) * Math.sin(loudnessVal)) *
						((z + epsilon) * Math.sin(chromaVal)),
					// + elapsedTime / lerp(100, 1000, this.features?.spectralFlatness || 0),
				) +
					1) *
					amp;

			const newX = newRadius * Math.cos(theta) * Math.sin(phi);

			const newY = newRadius * Math.sin(theta) * Math.sin(phi);

			const newZ = newRadius * Math.cos(phi);

			if (
				typeof curVertPosBuf?.[i] === "undefined" &&
				typeof curVertPosBuf?.[i + 1] === "undefined" &&
				typeof curVertPosBuf?.[i + 2] === "undefined"
			) {
				continue;
			}
			vertexPosBuffer[i] = lerp(curVertPosBuf[i], newX, 0.2);
			vertexPosBuffer[i + 1] = lerp(curVertPosBuf[i + 1], newY, 0.2);
			vertexPosBuffer[i + 2] = lerp(curVertPosBuf[i + 2], newZ, 0.2);
		}

		const energy = (this.features?.energy || 0) / 100;
		const rms = this.features?.rms || 0;
		const spectralCentroidPercent =
			(this.features?.spectralCentroid || 0) / 100;

		this.ribbon.updateVerticesData(VertexBuffer.PositionKind, vertexPosBuffer);

		this.ribbon.rotate(
			new Vector3(spectralCentroidPercent, (this.features?.zcr ?? 0) / 100, 1),
			0.05,
		);

		this.shaderMaterial.setFloat("iTime", elapsedTime / 1000); // Convert to seconds

		this.particleSystem.emitRate = rms > 0.25 ? 1000 * energy : 0;
		this.particleSystem.minEmitPower = 10 * energy;
		this.particleSystem.maxEmitPower = 100 * energy;

		this.shaderMaterial.setFloat("uScaleFactor", 2 + 8 * energy);
		this.shaderMaterial.setFloat("uDivisorFactor", 18);

		// this.ribbon.material.wireframe = rms > 0.5;
	}

	setMeydaAnalyzer(analyzer: ReturnType<typeof Meyda.createMeydaAnalyzer>) {
		this.analyzer = analyzer;
	}

	setMeydaFeatures(features: Record<string, any>) {
		// multiply all highend buffer values by 5 and replace them to the buffer
		this.features = features;
		console.log(features);
		const lSpec = this.features?.loudness?.specific;
		// hardcoding, but not actually using the variable because it makes it easier to see what bands you are targeting
		// const lSpecLength = 24
		// this.features.loudness.specific = lSpec?.map((val: number, i: number) => {
		// 	if (i >= 20) return val * 3;
		// 	if (i >= 15) return val * 5;
		// 	else return val;
		// });

		// console.log(this.features);
	}
}
