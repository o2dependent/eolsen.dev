export interface TerminalLine {
	text: string;
	class?: string;
}

export interface Commands {
	name: string;
	description: string;
	action: (args: string[]) => void;
}
