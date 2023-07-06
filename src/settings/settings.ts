import {constants} from "../constants";

export class ObsidianTicketHelperSettings {
	completion_trigger: string
	index_folder: string
	ticket_import_tag_separator: string
	ticket_import_number_separator: string
	ticket_export_tag_separator: string
	ticket_export_number_separator: string
}

export const DEFAULT_SETTINGS: ObsidianTicketHelperSettings = {
	completion_trigger: constants.COMPLETION_TRIGGER_DEFAULT_VALUE,
	index_folder: 'none',
	ticket_import_tag_separator: constants.TICKET_TAG_SEPARATOR_DEFAULT_VALUE,
	ticket_import_number_separator: constants.TICKET_NUMBER_SEPARATOR_DEFAULT_VALUE,
	ticket_export_tag_separator: constants.TICKET_TAG_SEPARATOR_DEFAULT_VALUE,
	ticket_export_number_separator: constants.TICKET_NUMBER_SEPARATOR_DEFAULT_VALUE,
}
