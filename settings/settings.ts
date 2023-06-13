import {constants} from "../constants";

export class ObsidianTicketHelperSettings {
	completion_trigger: string
	index_folder: string
	ticket_tag_separator: string
	ticket_number_separator: string
}

export const DEFAULT_SETTINGS: ObsidianTicketHelperSettings = {
	completion_trigger: constants.COMPLETION_TRIGGER_DEFAULT_VALUE,
	index_folder: 'none',
	ticket_tag_separator: constants.TICKET_TAG_SEPARATOR_DEFAULT_VALUE,
	ticket_number_separator: constants.TICKET_NUMBER_SEPARATOR_DEFAULT_VALUE,
}
