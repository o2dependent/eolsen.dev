<script lang="ts">
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
					print(`Changed to ${dir.name}`);
				} else {
					print(`Directory ${args[0]} does not exist`);
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

<form
	on:submit|preventDefault={() => {
		execute(cliInput);
		cliInput = '';
	}}
	class="container mx-auto font-mono"
>
	<label for="cli-input">
		{#each lines as line}
			<p>{line}</p>
		{/each}
		<div class="flex gap-[1ch]">
			<p>{curDir?.join('/')}></p>
			<input
				name="cli-input"
				id="cli-input"
				autocomplete="off"
				class="flex-grow outline-none bg-transparent"
				type="text"
				bind:value={cliInput}
			/>
		</div>
	</label>
</form>
