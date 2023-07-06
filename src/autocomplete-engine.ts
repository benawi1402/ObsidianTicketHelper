import {ObsidianTicketHelperSettings} from "./settings/settings";
import {TicketDefinition} from "./types";
import {constants} from "./constants";

export type Direction = {
	index: number
	direction: 'forward' | 'backward' | 'still'
}

export interface Completion {
	category: string
	value: string
}

export class AutocompleteEngine {

	private index: Map<number, TicketDefinition> = new Map<number, TicketDefinition>();
	private searchMap: Map<string, Array<number>> = new Map<string, Array<number>>();
	private suggestions?: TicketDefinition[];


	constructor(private settings: ObsidianTicketHelperSettings) {
	}

	async refreshIndices() {
		await this.updateIndex();
		this.buildSearchMap();
	}

	async updateIndex() {
		this.index.clear();
		// TODO add cached index that only updates index for changed files
		const index_files = app.vault.getFiles().filter((file) => file.path.startsWith(this.settings.index_folder));
		for(const index_file of index_files) {
			await app.vault.cachedRead(index_file).then((content) => {
				content.split("\n").forEach((line) => {
					const ticket = this.parseLineToTicketDefinition(line);
					if(ticket) this.index.set(ticket.ticket_number, ticket);
				})
			})
		}
	}

	parseLineToTicketDefinition(line: string): TicketDefinition | null {
		// we assume that lines are formatted this way
		// [TICKETNO]: [TITLE]---[TAG]
		// TODO: add dynamic regex
		const regexp = new RegExp(`^[0-9]{1,6}${this.settings.ticket_import_number_separator}.*${this.settings.ticket_import_tag_separator}.*$`);
		if(regexp.test(line)) {
			const [ticket_number, line_rest] = line.split(this.settings.ticket_import_number_separator);
			const [ticket_name, ticket_tag] = line_rest.split(this.settings.ticket_import_tag_separator);

			const ticket = new TicketDefinition();
			ticket.ticket_title = ticket_name;
			ticket.ticket_number = +ticket_number;
			ticket.ticket_tag = ticket_tag;
			return ticket;
		}
		return null;
	}

	buildSearchMap() {
		// requires index to be built first, assumes all keys are longer than default value
		this.searchMap.clear();
		const keys : number[] = [...this.index.keys()];
		keys.forEach((key) => {
			const stringKey = key.toString();
			const endPointer = constants.AUTOCOMPLETION_MINIMUM_CHARACTERS_DEFAULT_VALUE;
			const missingCharacters = stringKey.length - endPointer;

			for(let i = 0; i <= missingCharacters; i++) {
				const substring = stringKey.substring(0, endPointer + i);
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

	public getSuggestions(entry: string) {
		// add caching
		const searchMapEntry = this.searchMap.get(entry);
		this.suggestions = searchMapEntry?.filter(ticketNumber => this.index.get(ticketNumber) != undefined).map((ticketNumber) => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			return this.index.get(ticketNumber)!;
		});
		return this.suggestions;
	}
}
