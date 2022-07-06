interface CommandInput {
	name: string;
	description: string;
	cli: CLI;
	action: (args: string[], cli: CLI) => void;
}

class Command {
	name: string;
	description: string;
	cli: CLI;
	action: (args: string[], cli: CLI) => void;

	constructor({ name, cli, description, action }: CommandInput) {
		this.name = name;
		this.description = description;
		this.cli = cli;
		this.action = action;
	}

	execute(args: string[], cli: CLI) {
		this.action(args, cli);
	}
}

interface DirectoryFile {
	commands: string[];
	description: string;
}

interface Directory {
	name: string;
	contents: Directory | DirectoryFile;
}

type CommandsRegistry = { [name: string]: Command };

export class CLI {
	public directory: Directory;
	public curDir = '';
	public commands: CommandsRegistry;
	public lines: string[] = [];

	constructor(commands: { [name: string]: Omit<CommandInput, 'cli'> }, directory: Directory) {
		this.directory = directory;
		this.commands = {};
		for (const key in commands) {
			const command = commands[key];
			this.addCommand(command);
		}
	}

	addCommand(commandInputs: Omit<CommandInput, 'cli'>) {
		this.commands[commandInputs.name] = new Command({ ...commandInputs, cli: this });
	}

	execute(argStr: string) {
		const args = argStr.split(' ');
		const command = args[0];
		const commandArgs = args.slice(1);
		if (command in this.commands) {
			this.commands[command].action(commandArgs, this);
		} else {
			console.log(`Command ${command} not found`);
		}
	}

	print(str: string) {
		this.lines.push(str);
	}
}
