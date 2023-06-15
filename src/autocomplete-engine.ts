import {ObsidianTicketHelperSettings} from "./settings/settings";
import {TicketDefinition} from "./types";
import {constants} from "./constants";
export class AutocompleteEngine {

	private index: Map<number, TicketDefinition> = new Map<number, TicketDefinition>();
	private searchMap: Map<string, Array<number>> = new Map<string, Array<number>>();
	constructor(private settings: ObsidianTicketHelperSettings) {
	}

	async initialize() {
		await this.updateIndex();
		this.buildSearchMap();
	}

	async updateIndex() {
		this.index.clear();
		console.log("Build index")
		// TODO add cached index that only updates index for changed files
		const index_files = app.vault.getFiles().filter((file) => file.path.startsWith(this.settings.index_folder));
		for(const index_file of index_files) {
			app.vault.cachedRead(index_file).then((content) => {
				const lines = content.split("\n");
				lines.forEach((line) => {
					const ticket = this.parseLineToTicketDefinition(line);
					this.index.set(ticket.ticket_number, ticket);
				})
			})
		}
		console.log("Finished building index");
		console.log(this.index);
	}

	parseLineToTicketDefinition(line: string): TicketDefinition {
		// we assume that lines are formatted this way
		// [TICKETNO]: [TITLE]---[TAG]
		// TODO: add dynamic regex
		const [ticket_number, line_rest] = line.split(this.settings.ticket_number_separator);
		const [ticket_name, ticket_tag] = line_rest.split(this.settings.ticket_tag_separator);


		return {
			ticket_title: ticket_name,
			ticket_number: +ticket_number,
			ticket_tag: ticket_tag
		}
	}

	buildSearchMap() {
		console.log("Build search map")
		// requires index to be built first, assumes all keys are longer than default value
		const keys : number[] = [...this.index.keys()];
		keys.forEach((key) => {
			const stringKey = key.toString();
			let endPointer = constants.AUTOCOMPLETION_MINIMUM_CHARACTERS_DEFAULT_VALUE;
			const missingCharacters = stringKey.length - endPointer;

			for(let i = 0; i <= missingCharacters; i++) {
				endPointer += i;
				const substring = stringKey.substring(0, endPointer);
				const mapEntry = this.searchMap.get(substring);
				if(mapEntry) {
					mapEntry.push(key);
				}else {
					const keyList = new Array<number>();
					keyList.push(key);
					this.searchMap.set(substring, keyList);
				}
			}
		})
	}

	/*private showViewIn(
		editor: CodeMirror.Editor,
		completionWord = '',
		{
			autoSelect,
			showEmptyMatch,
		}: { autoSelect: boolean; showEmptyMatch: boolean } = {
			autoSelect: true,
			showEmptyMatch: true,
		}
	) {
		this.suggestions = this.providers.reduce(
			(acc, provider) => acc.concat(provider.matchWith(completionWord || '')),
			[]
		)

		const suggestionsLength = this.suggestions.length
		if (!this.isShown && autoSelect && suggestionsLength === 1) {
			// Suggest automatically
			this.selected.index = 0
			this.selectSuggestion(editor)
		} else if (!showEmptyMatch && suggestionsLength === 0) {
			this.removeViewFrom(editor)
		} else {
			if (this.view) this.removeViewFrom(editor)

			editor.addKeyMap(this.keyMaps)

			this.view = generateView(this.suggestions, this.selected.index)
			this.addClickListener(this.view, editor)
			appendWidget(editor, this.view)
		}
	}*/
}
