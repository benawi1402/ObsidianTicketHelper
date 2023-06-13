import {ObsidianTicketHelperSettings} from "./settings/settings";
import {TicketDefinition} from "./types";
export class AutocompleteEngine {

	private index: Map<number, TicketDefinition> = new Map<number, TicketDefinition>();
	constructor(private settings: ObsidianTicketHelperSettings) {
		this.updateIndex();
	}

	updateIndex() {
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
			//fs.readFileSync(index_file.basename)
		}

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
}
