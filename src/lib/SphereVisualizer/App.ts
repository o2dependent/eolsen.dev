import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import {
	Engine,
	Scene,
	ArcRotateCamera,
	Vector3,
	HemisphericLight,
	Mesh,
	FreeCamera,
	PointLight,
	Color4,
	WebGPUEngine,
	VideoRecorder,
} from "@babylonjs/core";
import { SphereVisualizer } from "./SphereVisualizer";
import type Meyda from "meyda";

export class BabylonTestApp {
	nodes: any[] = [];

	engine: WebGPUEngine | null = null;
	scene: Scene | null = null;
	camera: ArcRotateCamera | FreeCamera | null = null;

	recorder: VideoRecorder | null = null;

	analyser: Meyda.MeydaAnalyzer | null = null;
	features: Record<string, any> = {};

	activeNodes: "sphereVisualizer"[] = ["sphereVisualizer"];
	cameraType: "arcRotate" | "free" = "arcRotate";
	cameraLight: boolean = true;
	flashLight: PointLight | null = null;
	canvas: HTMLCanvasElement;
	seizureMode: boolean = false;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
	}

	async setup() {
		// initialize babylon scene and engine
		const engine = new WebGPUEngine(this.canvas);
		await engine.initAsync();
		const scene = new Scene(engine);

		scene.clearColor = new Color4(0, 0, 0, 1);

		if (this.cameraType === "arcRotate") {
			this.camera = new ArcRotateCamera(
				"Camera",
				0,
				Math.PI / 2,
				20,
				Vector3.Zero(),
				scene,
			);
			this.camera.attachControl(this.canvas, true);
		} else if (this.cameraType === "free") {
			this.camera = new FreeCamera("camera1", Vector3.Zero(), scene);
			this.camera.fov = 45;
			this.camera.setTarget(Vector3.Left());
			this.camera.attachControl(this.canvas, true);
		}

		if (this.cameraLight) {
			this.flashLight = new PointLight(
				"flashLight",
				new Vector3(0, 10, 0),
				scene,
			);
			this.flashLight.intensity = 0.25;
		}

		const light1: HemisphericLight = new HemisphericLight(
			"light1",
			new Vector3(1, 1, 0),
			scene,
		);
		light1.intensity = 0.2;

		this.nodes = [];

		if (this.activeNodes.includes("sphereVisualizer")) {
			const sphereVisualizer = new SphereVisualizer(scene);
			this.nodes.push(sphereVisualizer);
		}

		// hide/show the Inspector
		if (import.meta.env.MODE === "development") {
			window.addEventListener("keydown", (ev) => {
				// Shift+Ctrl+Alt+I
				if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.code === "KeyI") {
					if (scene.debugLayer.isVisible()) {
						scene.debugLayer.hide();
					} else {
						scene.debugLayer.show();
					}
				}
			});
		}

		// resize the babylon engine when the window is resized
		window.addEventListener("resize", () => {
			engine.resize();
		});

		// run the main render loop
		let elapsedTime = 0;
		engine.runRenderLoop(() => {
			const engine = scene.getEngine();
			elapsedTime += engine.getDeltaTime();
			this.nodes.forEach((node) => node?.update?.(elapsedTime));

			if (this.cameraLight && this.flashLight && scene?.activeCamera) {
				this.flashLight.position = scene?.activeCamera?.position;
			}

			scene.render();
		});

		this.engine = engine;
		this.scene = scene;
	}

	setMeydaAnalyser(analyser: Meyda.MeydaAnalyzer) {
		this.analyser = analyser;
		this.nodes?.forEach((node) => node?.setMedyaAnalyser?.(analyser));
	}

	setMeydaFeatures(features: Record<string, any>) {
		this.features = features;
		this.nodes?.forEach((node) => node?.setMeydaFeatures?.(features));
	}

	seizureModeToggle() {
		this.seizureMode = !this.seizureMode;
		console.log(this.nodes);
		this.nodes?.forEach((node) => node?.setSeizureMode?.(this.seizureMode));
	}

	toggleWireframe() {
		this.nodes?.forEach((node) => node?.toggleWireframe?.());
	}

	async startRecording() {
		if (!this.engine) throw Error("Engine not initialized");
		this.recorder = new VideoRecorder(this.engine);
		this.recorder.startRecording("output.webm", 0);
	}

	async stopRecording() {
		if (!this.recorder) throw Error("Recorder not initialized");
		this.recorder.stopRecording();
	}

	dispose() {
		this?.engine?.dispose();
		this?.scene?.dispose();

		this.engine = null;
		this.scene = null;
	}
}
