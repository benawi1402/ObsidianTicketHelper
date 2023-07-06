import {ObsidianTicketHelperSettings} from "./settings/settings";

export class TicketDefinition  {
	ticket_number: number;
	ticket_title: string;
	ticket_tag: string;


	public formatTicket(settings: ObsidianTicketHelperSettings): string {
		return `${this.ticket_number}${settings.ticket_export_number_separator}${this.ticket_title}${settings.ticket_export_tag_separator}${this.ticket_tag}`;
	}
}
