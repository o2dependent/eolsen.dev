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
	VideoRecorder,
	SceneLoader,
} from "@babylonjs/core";
import * as _ from "@babylonjs/loaders/glTF/2.0";
import type Meyda from "meyda";

export class VHSApp {
	nodes: any[] = [];

	engine: Engine | null = null;
	scene: Scene | null = null;
	camera: ArcRotateCamera | FreeCamera | null = null;

	recorder: VideoRecorder | null = null;

	analyzer: ReturnType<typeof Meyda.createMeydaAnalyzer> | null = null;
	features: Record<string, any> = {};

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
		const engine = new Engine(this.canvas);
		// const engine = new Engine(this.canvas);
		// await engine.initAsync();
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

		// const model = await SceneLoader.LoadAssetContainerAsync(
		// 	"http://localhost:4321/",
		// 	"models/vhs_ps1.glb",
		// );
		// this.nodes.push(model);

		const vhs = await SceneLoader.LoadAsync(
			"http://localhost:4321/models/vhs_ps1/",
			"scene.gltf",
		);
		this.nodes.push(vhs);
		const nodes = vhs.getNodes();
		console.log(nodes);

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

	dispose() {
		this?.engine?.dispose();
		this?.scene?.dispose();

		this.engine = null;
		this.scene = null;
	}
}
