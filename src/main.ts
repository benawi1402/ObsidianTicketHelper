import {Plugin} from 'obsidian';
import {DEFAULT_SETTINGS, ObsidianTicketHelperSettings} from "./settings/settings";
import {ObsidianTicketHelperSettingTab} from "./settings/settings-tab";
import ObsidianTicketSuggest from "./ticket-suggest";

export default class ObsidianTicketHelper extends Plugin {
	settings: ObsidianTicketHelperSettings;
	editorSuggester: ObsidianTicketSuggest;


	async onload() {
		await this.loadSettings();
		this.editorSuggester = new ObsidianTicketSuggest(app, this.settings);
		this.registerEditorSuggest(this.editorSuggester);
		this.addSettingTab(new ObsidianTicketHelperSettingTab(this.app, this));
	}

	async onunload() {
	}


	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	saveSettings() {
		this.saveData(this.settings);
	}
}


