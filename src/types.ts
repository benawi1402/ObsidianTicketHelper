export class TicketDefinition  {
	ticket_number: number;
	ticket_title: string;
	ticket_tag: string;

	formatTicket(): string {
		return `${this.ticket_number}: ${this.ticket_title} --- ${this.ticket_tag}`;
	}
}
