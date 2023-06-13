import {ObsidianTicketHelperSettings} from "./settings/settings";
import * as fs from "fs";
import {TicketDefinition} from "./types";
export class AutocompleteEngine {

	private index: Map<number, TicketDefinition> = new Map<number, TicketDefinition>();
	constructor(private settings: ObsidianTicketHelperSettings) {
		this.updateIndex();
	}

	updateIndex() {
		const index_files = app.vault.getFiles().filter((file) => file.path.startsWith(this.settings.index_folder));
		for(const index_file of index_files) {
			app.vault.cachedRead(index_file).then((content) => {
				const lines = content.split("\n");

			})
			//fs.readFileSync(index_file.basename)
		}
	}

	parseLineToTicketDefinition() {

	}
}
