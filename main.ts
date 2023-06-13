import { Notice, Plugin } from 'obsidian';
import {DEFAULT_SETTINGS, ObsidianTicketHelperSettings} from "./settings/settings";
import {ObsidianTicketHelperSettingTab} from "./settings/settings-tab";
import {AutocompleteEngine} from "./autocomplete-engine";

export default class ObsidianTicketHelper extends Plugin {
	settings: ObsidianTicketHelperSettings;
	autocompleteEngine: AutocompleteEngine;

	private keyDownListener = (
		editor: CodeMirror.Editor,
		event: KeyboardEvent
	) => {
	}

	async onload() {
		await this.loadSettings();
		this.autocompleteEngine = new AutocompleteEngine(this.settings);

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Obsidian Ticket Helper', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('This is a notice!');
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');




		// This adds a settings tab so the user can configure various aspects of the plugin
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


