import { Notice, Plugin } from 'obsidian';
import {DEFAULT_SETTINGS, ObsidianTicketHelperSettings} from "./settings/settings";
import {ObsidianTicketHelperSettingTab} from "./settings/settings-tab";
import {AutocompleteEngine} from "./autocomplete-engine";

export default class ObsidianTicketHelper extends Plugin {
	settings: ObsidianTicketHelperSettings;
	autocompleteEngine: AutocompleteEngine;
	characterBuffer: string[];
	characterPointer = 0;

	private keyDownListener = (
		editor: CodeMirror.Editor,
		event: KeyboardEvent
	) => {
		if(event.key === this.settings.completion_trigger[this.characterPointer]) {
			if(this.characterPointer + 1 === this.settings.completion_trigger.length) {

			}
			this.characterPointer++;
		}
	}

	async onload() {
		await this.loadSettings();
		this.characterBuffer = new Array<string>(this.settings.completion_trigger.length);
		this.autocompleteEngine = new AutocompleteEngine(this.settings);
		await this.autocompleteEngine.initialize();

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


