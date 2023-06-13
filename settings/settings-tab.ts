import {App, PluginSettingTab, Setting} from "obsidian";
import ObsidianTicketHelper from "../main";
import {FolderSuggest} from "./suggester/FolderSuggester";
import {constants} from "../constants";
import {messages} from "../messages";

// TODO add regex checks for entered values
export class ObsidianTicketHelperSettingTab extends PluginSettingTab {
	plugin: ObsidianTicketHelper;

	constructor(app: App, plugin: ObsidianTicketHelper) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Obsidian Ticket Helper Settings'});
		this.add_index_folder_setting();
		this.add_autocompletion_trigger_setting();
		this.add_ticket_number_separator_setting();
		this.add_ticket_tag_separator_setting();
	}

	add_index_folder_setting(): void {
		new Setting(this.containerEl)
			.setName(messages.SETTINGS_INDEX_FOLDER_TITLE)
			.setDesc(messages.SETTINGS_INDEX_FOLDER_DESC)
			.addSearch((cb) => {
				// @ts-ignore
				new FolderSuggest(cb.inputEl, this.containerEl);
				cb.setPlaceholder("Example: folder1/folder2")
					.setValue(this.plugin.settings.index_folder)
					.onChange((new_folder) => {
						this.plugin.settings.index_folder = new_folder;
						this.plugin.saveSettings();
					});
				// @ts-ignore
				cb.containerEl.addClass("templater_search");
			});
	}

	add_autocompletion_trigger_setting(): void {
		new Setting(this.containerEl)
			.setName(messages.SETTINGS_COMPLETION_TRIGGER_TITLE)
			.setDesc(messages.SETTINGS_COMPLETION_TRIGGER_DESC)
			.addSearch((cb) => {
				cb.setPlaceholder("Default: " + constants.COMPLETION_TRIGGER_DEFAULT_VALUE)
					.setValue(this.plugin.settings.completion_trigger)
					.onChange((new_completion_trigger) => {
						this.plugin.settings.completion_trigger = new_completion_trigger;
						this.plugin.saveSettings();
					});
			});
	}

	add_ticket_tag_separator_setting(): void {
		new Setting(this.containerEl)
			.setName(messages.SETTINGS_TICKET_TAG_SEPARATOR_TITLE)
			.setDesc(messages.SETTINGS_TICKET_TAG_SEPARATOR_DESC)
			.addSearch((cb) => {
				cb.setPlaceholder("Default: " + constants.TICKET_TAG_SEPARATOR_DEFAULT_VALUE)
					.setValue(this.plugin.settings.ticket_tag_separator)
					.onChange((new_ticket_tag_separator) => {
						this.plugin.settings.ticket_tag_separator = new_ticket_tag_separator;
						this.plugin.saveSettings();
					});
			});
	}

	add_ticket_number_separator_setting(): void {
		new Setting(this.containerEl)
			.setName(messages.SETTINGS_TICKET_NUMBER_SEPARATOR_TITLE)
			.setDesc(messages.SETTINGS_TICKET_NUMBER_SEPARATOR_DESC)
			.addSearch((cb) => {
				cb.setPlaceholder("Default: " + constants.TICKET_NUMBER_SEPARATOR_DEFAULT_VALUE)
					.setValue(this.plugin.settings.ticket_number_separator)
					.onChange((new_ticket_number_separator) => {
						this.plugin.settings.ticket_number_separator = new_ticket_number_separator;
						this.plugin.saveSettings();
					});
			});
	}
}
