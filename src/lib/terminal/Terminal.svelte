<script lang="ts">
	import Window from '$lib/window/Window.svelte';
	import type { AppNames, AppWindow } from '$stores/apps.store';

	export let appKey: AppNames;
	export let appWindow: AppWindow;

	let cliInput = '';

	let curDir: string[] = ['Desktop'];

	interface Commands {
		name: string;
		description: string;
		action: (args: string[]) => void;
	}

	interface DirectoryFile {
		commands: string[];
		data: any;
	}

	interface Directory {
		name: string;
		contents: { [name: string]: Directory | DirectoryFile };
	}

	const directory: { [name: string]: Directory } = {
		Desktop: {
			name: 'Desktop',
			contents: {
				Projects: {
					name: 'Projects',
					contents: {
						'SvelteKit.proj': {
							name: 'SvelteKit.proj',
							commands: ['open'],
							data: {
								id: 'SvelteKit.proj'
							}
						}
					}
				}
			}
		}
	};
	const getDir = (dirArr?: string[]) => {
		if (!dirArr) {
			dirArr = curDir;
		}
		let dir = directory[dirArr[0]];
		for (let i = 1; i < dirArr.length; i++) {
			const newDir = dir.contents[dirArr[i]];
			console.log(newDir);
			if ('contents' in newDir) {
				console.log('dir accepted');
				dir = newDir;
			} else {
				return dir;
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
				print(Object.keys(dirObj.contents).join('\t'));
			}
		},
		cd: {
			name: 'cd',
			description: 'Change directory',
			action: (args) => {
				if (args.length === 0) {
					print('No directory specified');
					return;
				}
				console.log({ args });
				const dir = getDir([...curDir, args[0]]);
				if (dir.name !== curDir[curDir.length - 1]) {
					curDir = [...curDir, args[0]];
				} else {
					print(`cd: no such file or directory: ${args[0]}`);
				}
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
				print('Available commands:');
				for (const command in commands) {
					print(`  ${command} - ${commands[command].description}`);
				}
			}
		}
	};
	let lines: string[] = [];

	const execute = (argStr: string) => {
		print(`${curDir?.join('/')}> ${argStr}`);
		const args = argStr.split(' ');
		console.log(args);
		const command = args[0];
		const commandArgs = args.slice(1);
		if (command in commands) {
			console.log(commands[command]);
			commands[command].action(commandArgs);
		} else {
			print(`Command "${command}" not found`);
			print(`Use "help" to see available commands`);
		}
	};

	const print = (str: string) => {
		lines = [...lines, str];
	};
</script>

<Window {appKey} {appWindow}>
	<form
		on:submit|preventDefault={() => {
			execute(cliInput);
			cliInput = '';
		}}
		class="flex h-full flex-col bg-neutral-800 font-mono text-sm text-white"
	>
		<label
			class="flex-grow overflow-y-scroll py-2 px-4 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-800"
			for="cli-input-{appWindow.id}"
		>
			{#each lines as line}
				<p>{line}</p>
			{/each}
			<div class="flex gap-[1ch]">
				<p>{curDir?.join('/')}></p>
				<input
					name="cli-input-{appWindow.id}"
					id="cli-input-{appWindow.id}"
					autocomplete="off"
					class="flex-grow bg-transparent outline-none"
					type="text"
					bind:value={cliInput}
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
