import { get, writable } from "svelte/store";
import { SphereVisualizerApp } from "./App";
import { loadingGL } from "./visualizer-loading.store";
import Meyda from "meyda";

export const visualizerApp = writable<SphereVisualizerApp | null>(null);
export const currentAudioName = writable("Loading...");
export const willRecord = writable(false);
export const isRecording = writable(false);
export const playing = writable(false);

export const audioList = [
	{
		name: "kthx - Includes mario samples.",
		url: "/audio/kthx - Includes mario samples.mp3",
	},
	{
		name: "kthx - 80s induced coma",
		url: "/audio/kthx - 80s induced coma.mp3",
	},
	{
		name: "kthx - Why Am I Up At 5am.",
		url: "/audio/kthx - Why Am I Up At 5am.mp3",
	},
	{
		name: "kthx - Cruising Down The Street In My Nintendo 64",
		url: "/audio/kthx - Cruising Down The Street In My Nintendo 64.mp3",
	},
	{
		name: "kthx - raul labrador",
		url: "/audio/kthx - raul labrador.mp3",
	},
	{ name: "kthx - $ENTINEL", url: "/audio/kthx - $ENTINEL.mp3" },
	{ name: "kthx - 12mg", url: "/audio/kthx - 12mg.mp3" },
	{
		name: "kthx - Talk (ROUGH ASF)",
		url: "/audio/kthx - Talk (ROUGH ASF).mp3",
	},
	{ name: "EOlsen - Hassy", url: "/audio/EOlsen - Hassy.mp3" },
	{ name: "EOlsen - Eat", url: "/audio/EOlsen - Eat.mp3" },
	{
		name: "EOlsen - little guys",
		url: "/audio/EOlsen - little_guys_song.mp3",
	},
	{
		name: "Stepa K - Shadow (Enzuna Remix)",
		url: "/audio/Stepa K - Shadow (Enzuna Remix).mp3",
	},
];
const startIndex = 10;
let audioBuffer: AudioBuffer | null;
let source: AudioBufferSourceNode | null;
let analyzer: Meyda.MeydaAnalyzer | null;
let audioContext: AudioContext | null;

export const setAnalyzer = () => {
	const $visualizerApp = get(visualizerApp);

	if (analyzer) analyzer?.stop();

	analyzer = Meyda.createMeydaAnalyzer({
		audioContext: audioContext,
		source: source,
		bufferSize: 512,
		featureExtractors: [
			"rms",
			"spectralFlatness",
			"chroma",
			"zcr",
			"complexSpectrum",
			"mfcc",
			"amplitudeSpectrum",
			"energy",
			"loudness",
			"perceptualSharpness",
			"perceptualSpread",
			"powerSpectrum",
			"spectralCentroid",
			"spectralKurtosis",
			"spectralRolloff",
			"spectralSkewness",
			"spectralSlope",
			"spectralSpread",
			"buffer",
		] satisfies Meyda.MeydaAudioFeature[],
		inputs: 2,
		callback: (_features: Record<string, any>) => {
			// features.set = _features;
			get(visualizerApp)?.setMeydaFeatures(_features);
		},
	});
	analyzer?.start();
	analyzer && $visualizerApp?.setMeydaAnalyser(analyzer);
};

export const loadAudioBuffer = async (
	buffer: string | ArrayBuffer | null | undefined,
) => {
	const $playing = get(playing);
	if ($playing) stopAudio();

	if (!buffer) return console.error("No buffer provided");
	if (!(buffer instanceof ArrayBuffer)) return console.error("Invalid buffer");

	if (!audioContext) return console.error("No audio context");

	try {
		const newAudioBuffer = await audioContext?.decodeAudioData(buffer);
		if (!newAudioBuffer) throw Error("Error decoding audio data");
		audioBuffer = newAudioBuffer;

		const newSource = audioContext?.createBufferSource();
		newSource.buffer = newAudioBuffer;
		newSource.connect(audioContext?.destination);

		source = newSource;

		// console.log("Audio buffer loaded:", audioBuffer);
	} catch (error) {
		console.error("Error decoding audio data:", error);
	}
};

export const handleRemoteAudio = async (url: string, name: string) => {
	const res = await fetch(url);
	const buffer = await res.arrayBuffer();
	loadAudioBuffer(buffer).then(setAnalyzer);
	currentAudioName.set(name);
};

export const playAudio = () => {
	const $visualizerApp = get(visualizerApp);
	const $willRecord = get(willRecord);
	const $playing = get(playing);

	if ($playing || !audioBuffer) return;

	if ($willRecord) {
		isRecording.set(true);
		$visualizerApp?.startRecording();
	}
	if (!audioContext) throw Error("No audio context");
	if (!analyzer) throw Error("No analyzer");

	source = audioContext.createBufferSource();
	if (!source) throw Error("No source");
	source.buffer = audioBuffer;
	source.connect(audioContext.destination);
	analyzer?.setSource(source);
	source.start();
	source.addEventListener("ended", (e) => {
		stopAudio();
	});
	playing.set(true);
};

export const stopAudio = () => {
	const $playing = get(playing);
	const $visualizerApp = get(visualizerApp);
	if (source && $playing) {
		source.stop();
		playing.set(false);
	}
	if (get(isRecording)) {
		isRecording.set(false);
		$visualizerApp?.stopRecording();
	}
};

export const togglePlay = () => (get(playing) ? stopAudio() : playAudio());

export const createVisualizerApp = (canvas: HTMLCanvasElement) => {
	visualizerApp.set(new SphereVisualizerApp(canvas));
	const $visualizerApp = get(visualizerApp);

	$visualizerApp?.setup().then(() => {
		audioContext = new AudioContext();
		const remoteAudio = audioList?.[startIndex] ?? audioList?.[0];
		handleRemoteAudio(remoteAudio?.url ?? "", remoteAudio?.name ?? "").then(
			() => loadingGL.set(false),
		);
	});

	return {
		dispose: () => {
			const $visualizerApp = get(visualizerApp);
			if ($visualizerApp) {
				$visualizerApp.dispose();
			}
			visualizerApp.set(null);
		},
	};
};
