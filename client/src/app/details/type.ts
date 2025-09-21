import { Ticket } from "@acme/shared-models";

export interface TicketImp extends Ticket {
    assignee: string
}