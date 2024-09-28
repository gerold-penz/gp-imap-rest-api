import type { ListResponse } from "imapflow"


export interface MailboxInfo extends Omit<ListResponse, "flags"> {
    flags: string[];
}
