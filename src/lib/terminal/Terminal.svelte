<script lang="ts">
	import Window from '$lib/window/Window.svelte';
	import type { AppNames, AppWindow } from '$stores/apps.store';
	import { directory, type Directory } from '$stores/directory.store';

	export let appWindow: AppWindow;

	let cliInput: HTMLInputElement;
	let cliLabel: HTMLLabelElement;

	let curDir: string[] = ['Desktop'];

	interface TerminalLine {
		text: string;
		class?: string;
	}

	let lines: TerminalLine[] = [
		{
			text: `
 __          __  _
 \\ \\        / / | |
  \\ \\  /\\  / /__| | ___ ___  _ __ ___   ___
   \\ \\/  \\/ / _ \\ |/ __/ _ \\| '_ \` _ \\ / _ \\
    \\  /\\  /  __/ | (_| (_) | | | | | |  __/
     \\/  \\/ \\___|_|\\___\\___/|_| |_| |_|\\___|
`,
			class:
				'w-fit font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-600 to-purple-600'
		},
		{
			text: `
         __  ___    __        ______               __      __  ___
|\\/| /\\ |  \\|__    |__)\\ /   |__  ||__| /\\ |\\ |   /  \\|   /__\`|__ |\\ |
|  |/~~\\|__/|___   |__) |    |___ ||  |/~~\\| \\|   \\__/|___.__/|___| \\|


`,
			class:
				'w-fit pl-10 !font-black text-[0.5rem] leading-[0.6rem] text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-600 to-purple-600'
		}
	];

	interface Commands {
		name: string;
		description: string;
		action: (args: string[]) => void;
	}

	const getDir = (dirArr?: string[]) => {
		if (!dirArr) {
			dirArr = curDir;
		}
		let dir = $directory.contents[dirArr[0]] as Directory;
		for (let i = 1; i < dirArr.length; i++) {
			const newDir = dir.contents[dirArr[i]];
			if ('contents' in newDir) {
				dir = newDir;
			} else {
				return;
			}
		}
		return dir;
	};
	const commands: { [name: string]: Commands } = {
		ls: {
			name: 'ls',
			description: 'List files in a directory',
			action: (args) => {
				const dirObj = getDir();
				if (!dirObj) {
					print({ text: 'No directory specified', class: 'text-red-500' });
					return;
				}
				print({ text: Object.keys(dirObj.contents).join('\t') });
			}
		},
		cd: {
			name: 'cd',
			description: 'Change directory',
			action: (args) => {
				const path = args[0]?.split('/')?.filter(Boolean);
				if (path.length === 0) {
					print({ text: 'No directory specified', class: 'text-red-500' });
					return;
				}
				let newCurDir = [...curDir];
				for (const arg of path) {
					if (arg === '..') {
						if (newCurDir.length === 1) {
							print({ text: 'Cannot go above root directory', class: 'text-red-500' });
							return;
						}
						newCurDir.pop();
					} else {
						const dir = getDir(newCurDir);
						if (!getDir([...newCurDir, arg])) {
							print({ text: `Not a directory: ${arg}`, class: 'text-red-500' });
							return;
						}
						if (!dir || !(arg in dir.contents)) {
							print({ text: 'Directory not found', class: 'text-red-500' });
							return;
						}
						newCurDir.push(arg);
					}
				}
				curDir = newCurDir;
			}
		},
		clear: {
			name: 'clear',
			description: 'Clear the screen',
			action: () => {
				lines = [];
			}
		},
		help: {
			name: 'help',
			description: 'Show help',
			action: (args) => {
				print({ text: 'Available commands:', class: 'text-green-500' });
				for (const command in commands) {
					print({ text: `  ${command} - ${commands[command].description}` });
				}
			}
		}
	};

	const execute = (argStr: string) => {
		print({ text: `${curDir?.join('/')}> ${argStr}` });
		if (!argStr) return;
		const args = argStr.split(' ');
		console.log(args);
		const command = args[0];
		const commandArgs = args.slice(1);
		if (command in commands) {
			commands[command].action(commandArgs);
		} else {
			print({ text: `Command "${command}" not found`, class: 'text-red-500' });
			print({ text: `Use "help" to see available commands`, class: 'text-red-500' });
		}
	};

	const print = (str: TerminalLine) => {
		lines = [...lines, str];
	};
</script>

<Window {appWindow}>
	<form
		on:submit|preventDefault={() => {
			execute(cliInput.value);
			cliInput.value = '';
			setTimeout(() => {
				cliLabel.scrollTop = cliLabel.scrollHeight;
			}, 0);
		}}
		class="!font-mono font-mono flex h-full flex-col bg-neutral-900 bg-opacity-90 text-sm text-white backdrop-blur-lg"
	>
		<label
			bind:this={cliLabel}
			class="flex-grow overflow-y-scroll px-4 py-2 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-800"
			for="cli-input-{appWindow.id}"
		>
			{#each lines as line}
				<pre class={line?.class ?? ''}>{line.text}</pre>
			{/each}
			<div class="flex gap-[1ch]">
				<p>{curDir?.join('/')}></p>
				<input
					name="cli-input-{appWindow.id}"
					id="cli-input-{appWindow.id}"
					autocomplete="off"
					class="flex-grow bg-transparent outline-none"
					type="text"
					bind:this={cliInput}
				/>
			</div>
		</label>
	</form>
</Window>

<style>
	label::-webkit-scrollbar-thumb {
		border-radius: 10px !important;
	}
	.stage::before {
		animation: animateBg 10s linear infinite;
		background-image: linear-gradient(
			90deg,
			#897ed3,
			#5b73df,
			#498ada,
			#208ea2,
			#64b3d9,
			#42eca6,
			#64b3d9,
			#208ea2,
			#498ada,
			#5b73df,
			#897ed3
		);
		background-size: 1100% 100%;
	}
	@keyframes animateBg {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 100% 0%;
		}
	}
</style>
