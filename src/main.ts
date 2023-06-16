import {EditorSuggest, EditorSuggestContext, Plugin} from 'obsidian';
import {DEFAULT_SETTINGS, ObsidianTicketHelperSettings} from "./settings/settings";
import {ObsidianTicketHelperSettingTab} from "./settings/settings-tab";
import {AutocompleteEngine} from "./autocomplete-engine";
import {TicketDefinition} from "./types";
import ObsidianTicketSuggest from "./ticket-suggest";

export default class ObsidianTicketHelper extends Plugin {
	settings: ObsidianTicketHelperSettings;
	autocompleteEngine: AutocompleteEngine;
	editorSuggester: EditorSuggest<TicketDefinition>;

	getSuggestions(context: EditorSuggestContext): TicketDefinition[] | Promise<TicketDefinition[]> {
		return this.autocompleteEngine.getSuggestions(context.query) ?? [] ;
	}

	async onload() {
		await this.loadSettings();
		this.editorSuggester = new ObsidianTicketSuggest(app, this.settings);
		this.registerEditorSuggest(this.editorSuggester);

		this.addSettingTab(new ObsidianTicketHelperSettingTab(this.app, this));
	}

	onunload() {
	}


	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


