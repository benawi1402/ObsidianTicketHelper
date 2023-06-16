import {
	TFile,
	App,
	Editor,
	EditorPosition,
	EditorSuggest,
	EditorSuggestContext,
	EditorSuggestTriggerInfo
} from 'obsidian';
import {TicketDefinition} from "./types";
import {AutocompleteEngine} from "./autocomplete-engine";
import {ObsidianTicketHelperSettings} from "./settings/settings";

export default class ObsidianTicketSuggest extends EditorSuggest<TicketDefinition> {

	private autocompleteEngine: AutocompleteEngine;
	private readonly settings: ObsidianTicketHelperSettings;

	constructor(app: App, settings: ObsidianTicketHelperSettings) {
		super(app);
		this.settings = settings;
		this.autocompleteEngine = new AutocompleteEngine(this.settings);
		this.updateAutocompleteIndex();
	}

	getSuggestions(context: EditorSuggestContext): TicketDefinition[] | Promise<TicketDefinition[]> {
		return this.autocompleteEngine.getSuggestions(context.query) ?? [];
	}

	public updateAutocompleteIndex() {
		this.autocompleteEngine.refreshIndices().finally(() => {
			console.debug("Finished Building Indices")
		});
	}

	onTrigger(cursor: EditorPosition, editor: Editor, file: TFile | null): EditorSuggestTriggerInfo | null {
		// todo refactor
		const regexp = new RegExp("^(.*)" + this.settings.completion_trigger + "([0-9]{1,6})(.*)$");
		const regexResult = regexp.exec(editor.getLine(cursor.line))
		if (regexResult) {
			const positionInLine = regexResult[1].length;
			return {
				start: {line: cursor.line, ch: positionInLine},
				end: {line: cursor.line, ch: positionInLine + this.settings.completion_trigger.length + regexResult[2].length},
				query: regexResult[2]
			}
		}
		return null;
	}

	renderSuggestion(value: TicketDefinition, el: HTMLElement): void {
		const div = el.createDiv();
		div.innerHTML = value?.formatTicket();
		el.append(div);
	}

	selectSuggestion(value: TicketDefinition, evt: KeyboardEvent): void {
		const start = this.context?.start;
		const end = this.context?.end;
		if(start && end && evt.key === "Enter") {
			this.context?.editor?.replaceRange(value.formatTicket(), start, end)
		}

	}



}


