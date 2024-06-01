<script lang="ts">
	import { directory, type Directory } from "$stores/directory.store";
	import type { Commands, TerminalLine } from "./terminal";

	export let id: string;
	export let lines: TerminalLine[];
	export let className = "";
	export let style = "";
	export let preExecute: (keyof typeof commands)[] = [];

	let cliInput: HTMLInputElement;
	let cliLabel: HTMLLabelElement;

	let curDir: string[] = ["Desktop"];

	const getDir = (dirArr?: string[]) => {
		if (!dirArr) {
			dirArr = curDir;
		}
		let dir = $directory.contents[dirArr[0]] as Directory;
		for (let i = 1; i < dirArr.length; i++) {
			const newDir = dir.contents[dirArr[i]];
			if ("contents" in newDir) {
				dir = newDir;
			} else {
				return;
			}
		}
		return dir;
	};
	const commands: { [name: string]: Commands } = {
		ls: {
			name: "ls",
			description: "List files in a directory",
			action: (args) => {
				const dirObj = getDir();
				if (!dirObj) {
					print({ text: "No directory specified", class: "text-red-500" });
					return;
				}
				print({ text: Object.keys(dirObj.contents).join("\t") });
			},
		},
		cd: {
			name: "cd",
			description: "Change directory",
			action: (args) => {
				const path = args[0]?.split("/")?.filter(Boolean);
				if (path.length === 0) {
					print({ text: "No directory specified", class: "text-red-500" });
					return;
				}
				let newCurDir = [...curDir];
				for (const arg of path) {
					if (arg === "..") {
						if (newCurDir.length === 1) {
							print({
								text: "Cannot go above root directory",
								class: "text-red-500",
							});
							return;
						}
						newCurDir.pop();
					} else {
						const dir = getDir(newCurDir);
						if (!getDir([...newCurDir, arg])) {
							print({ text: `Not a directory: ${arg}`, class: "text-red-500" });
							return;
						}
						if (!dir || !(arg in dir.contents)) {
							print({ text: "Directory not found", class: "text-red-500" });
							return;
						}
						newCurDir.push(arg);
					}
				}
				curDir = newCurDir;
			},
		},
		clear: {
			name: "clear",
			description: "Clear the screen",
			action: () => {
				lines = [];
			},
		},
		help: {
			name: "help",
			description: "Show help",
			action: (args) => {
				print({ text: "Available commands:", class: "text-green-500" });
				for (const command in commands) {
					print({ text: `  ${command} - ${commands[command].description}` });
				}
			},
		},
	};

	export const execute = (argStr: string) => {
		print({ text: `${curDir?.join("/")}> ${argStr}` });
		if (!argStr) return;
		const args = argStr.split(" ");
		console.log(args);
		const command = args[0];
		const commandArgs = args.slice(1);
		if (command in commands) {
			commands[command].action(commandArgs);
		} else {
			print({ text: `Command "${command}" not found`, class: "text-red-500" });
			print({
				text: `Use "help" to see available commands`,
				class: "text-red-500",
			});
		}
	};

	const print = (str: TerminalLine) => {
		lines = [...lines, str];
	};

	if (preExecute.length > 0) {
		for (const command of preExecute) {
			print({ text: `${curDir?.join("/")}> ${command}` });
			commands[command].action([]);
		}
	}
</script>

<form
	on:submit={(e) => {
		e.preventDefault();
		execute(cliInput.value);
		cliInput.value = "";
		setTimeout(() => {
			cliLabel.scrollTop = cliLabel.scrollHeight;
		}, 0);
	}}
	{style}
	class="{className} flex h-full flex-col bg-neutral-900 bg-opacity-90 !font-mono text-sm text-white backdrop-blur-lg"
>
	<label
		bind:this={cliLabel}
		class="flex-grow overflow-y-scroll px-4 py-2 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-800"
		for="cli-input-{id}"
	>
		{#each lines as line}
			<pre
				class={line?.class ??
					""}>{#if line?.isMarkdown}{@html line.text}{:else}{line.text}{/if}</pre>
		{/each}
		<div class="flex gap-[1ch]">
			<p>{curDir?.join("/")}></p>
			<input
				name="cli-input-{id}"
				id="cli-input-{id}"
				autocomplete="off"
				class="flex-grow bg-transparent !outline-none focus-visible:!ring-opacity-0 focus-visible:!shadow-none focus-visible:!ring-offset-transparent"
				type="text"
				bind:this={cliInput}
			/>
		</div>
	</label>
</form>
