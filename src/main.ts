import {Plugin} from 'obsidian';
import {DEFAULT_SETTINGS, ObsidianTicketHelperSettings} from "./settings/settings";
import {ObsidianTicketHelperSettingTab} from "./settings/settings-tab";
import ObsidianTicketSuggest from "./ticket-suggest";

export default class ObsidianTicketHelper extends Plugin {
	settings: ObsidianTicketHelperSettings;
	editorSuggester: ObsidianTicketSuggest;


	async onload() {
		await this.loadSettings();

		this.addSettingTab(new ObsidianTicketHelperSettingTab(this.app, this));
		app.workspace.onLayoutReady(() => {
			this.editorSuggester = new ObsidianTicketSuggest(app, this.settings);
			this.registerEditorSuggest(this.editorSuggester);
		});

		this.registerInterval(
			window.setInterval(() => this.editorSuggester?.updateAutocompleteIndex(), 10000)
		);
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


