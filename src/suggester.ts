import {TFile, App, Editor, EditorPosition, EditorSuggest, EditorSuggestContext, EditorSuggestTriggerInfo} from 'obsidian';
import {TicketDefinition} from "./types";
import {AutocompleteEngine} from "./autocomplete-engine";
import {ObsidianTicketHelperSettings} from "./settings/settings";

export default class ObsidianTicketSuggest extends EditorSuggest<TicketDefinition> {

	private autocompleteEngine: AutocompleteEngine;
	private settings: ObsidianTicketHelperSettings;

	constructor(app: App, settings: ObsidianTicketHelperSettings) {

		super(app);
		this.autocompleteEngine = new AutocompleteEngine(this.settings);
	}

	getSuggestions(context: EditorSuggestContext): TicketDefinition[] | Promise<TicketDefinition[]> {
		return this.autocompleteEngine.getSuggestions(context.query) ?? [] ;
	}

	onTrigger(cursor: EditorPosition, editor: Editor, file: TFile | null): EditorSuggestTriggerInfo | null {
		console.log(editor.getValue());

		return null;
	}

	renderSuggestion(value: TicketDefinition, el: HTMLElement): void {
	}

	selectSuggestion(value: TicketDefinition, evt: MouseEvent | KeyboardEvent): void {
	}


}


