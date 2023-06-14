export interface TerminalLine {
	text: string;
	isMarkdown?: boolean;
	class?: string;
}

export interface Commands {
	name: string;
	description: string;
	action: (args: string[]) => void;
}
