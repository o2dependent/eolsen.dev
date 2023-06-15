<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	export let width: number;
	export let height: number;
	onMount(() => {
		let gl: WebGLRenderingContext | null = null;

		let mouse = { x: 0, y: 0 };

		interface MetaBall {
			x: number;
			y: number;
			vx: number;
			vy: number;
			r: number;
		}
		let numMetaballs = 30;
		let metaballs: MetaBall[] = [];
		gl = canvas.getContext('webgl');
		for (let i = 0; i < numMetaballs; i++) {
			let radius = Math.random() * 60 + 10;
			metaballs.push({
				x: Math.random() * (width - 2 * radius) + radius,
				y: Math.random() * (height - 2 * radius) + radius,
				vx: (Math.random() - 0.5) * 3,
				vy: (Math.random() - 0.5) * 3,
				r: radius * 0.75
			});
		}

		let vertexShaderSrc = `
            attribute vec2 position;

            void main() {
                // position specifies only x and y.
                // We set z to be 0.0, and w to be 1.0
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

		let fragmentShaderSrc = `
            precision highp float;

            const float WIDTH = ${width >> 0}.0;
            const float HEIGHT = ${height >> 0}.0;

            uniform vec3 metaballs[${numMetaballs}];

            void main(){
                    float x = gl_FragCoord.x;
                    float y = gl_FragCoord.y;

                    float sum = 0.0;
                    for (int i = 0; i < ${numMetaballs}; i++) {
                    vec3 metaball = metaballs[i];
                    float dx = metaball.x - x;
                    float dy = metaball.y - y;
                    float radius = metaball.z;

                    sum += (radius * radius) / (dx * dx + dy * dy);
                }

                if (sum >= 0.99) {
                    // gl_FragColor = vec4(mix(vec3(x / WIDTH, y / HEIGHT, 1.0), vec3(0, 0, 0), max(0.0, 1.0 - (sum - 0.99) * 100.0)), 1.0);
                    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);

                    return;
                }

                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
            }
        `;

		let vertexShader = compileShader(vertexShaderSrc, gl?.VERTEX_SHADER ?? 0);
		let fragmentShader = compileShader(fragmentShaderSrc, gl?.FRAGMENT_SHADER ?? 0);

		let program = gl?.createProgram();
		if (!program) throw new Error('Failed to create program');
		if (!vertexShader) throw new Error('Failed to create vertex shader');
		if (!fragmentShader) throw new Error('Failed to create fragment shader');
		gl?.attachShader(program, vertexShader);
		gl?.attachShader(program, fragmentShader);
		gl?.linkProgram(program);
		gl?.useProgram(program);

		let vertexData = new Float32Array([
			-1.0,
			1.0, // top left
			-1.0,
			-1.0, // bottom left
			1.0,
			1.0, // top right
			1.0,
			-1.0 // bottom right
		]);
		let vertexDataBuffer = gl?.createBuffer();
		if (!vertexDataBuffer) throw new Error('Failed to create vertex data buffer');
		gl?.bindBuffer(gl?.ARRAY_BUFFER, vertexDataBuffer);
		gl?.bufferData(gl?.ARRAY_BUFFER, vertexData, gl?.STATIC_DRAW);

		let positionHandle = getAttribLocation(program, 'position');
		if (typeof positionHandle === 'undefined') positionHandle = 0;
		gl?.enableVertexAttribArray(positionHandle);
		gl?.vertexAttribPointer(
			positionHandle,
			2, // position is a vec2
			gl?.FLOAT, // each component is a float
			false, // don't normalize values
			2 * 4, // two 4 byte float components per vertex
			0 // offset into each span of vertex data
		);

		let metaballsHandle = getUniformLocation(program, 'metaballs');

		loop();
		function loop() {
			if (!metaballsHandle) throw new Error('Failed to get metaballs handle');
			for (let i = 0; i < numMetaballs; i++) {
				let metaball = metaballs[i];
				metaball.x += metaball.vx;
				metaball.y += metaball.vy;

				if (metaball.x < metaball.r || metaball.x > width - metaball.r) metaball.vx *= -1;
				if (metaball.y < metaball.r || metaball.y > height - metaball.r) metaball.vy *= -1;
			}

			let dataToSendToGPU = new Float32Array(3 * numMetaballs);
			for (let i = 0; i < numMetaballs; i++) {
				let baseIndex = 3 * i;
				let mb = metaballs[i];
				dataToSendToGPU[baseIndex + 0] = mb.x;
				dataToSendToGPU[baseIndex + 1] = mb.y;
				dataToSendToGPU[baseIndex + 2] = mb.r;
			}
			gl?.uniform3fv(metaballsHandle, dataToSendToGPU);

			//Draw
			gl?.drawArrays(gl?.TRIANGLE_STRIP, 0, 4);

			requestAnimationFrame(loop);
		}

		function compileShader(shaderSource: string, shaderType: number) {
			let shader = gl?.createShader(shaderType);
			if (!shader) throw new Error('Failed to create shader');
			gl?.shaderSource(shader, shaderSource);
			gl?.compileShader(shader);

			if (!gl?.getShaderParameter(shader, gl?.COMPILE_STATUS)) {
				throw 'Shader compile failed with: ' + gl?.getShaderInfoLog(shader);
			}

			return shader;
		}

		function getUniformLocation(program: WebGLProgram, name: string) {
			let uniformLocation = gl?.getUniformLocation(program, name);
			if (uniformLocation === -1) {
				throw 'Can not find uniform ' + name + '.';
			}
			return uniformLocation;
		}

		function getAttribLocation(program: WebGLProgram, name: string) {
			let attributeLocation = gl?.getAttribLocation(program, name);
			if (attributeLocation === -1) {
				throw 'Can not find attribute ' + name + '.';
			}
			return attributeLocation;
		}
		canvas.onmousemove = function (e) {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		};
	});
</script>

<canvas {height} {width} bind:this={canvas} />
