import type { ListResponse, FetchMessageObject, MessageEnvelopeObject, MessageStructureObject } from "imapflow"


export interface MailboxInfo extends Omit<ListResponse, "flags"> {
    flags: string[];
}


export interface FetchMessage {
    seq?: number
    uid?: number
    source?: string
    modseq?: number
    emailId?: string
    threadId?: string
    labels?: string[]
    size?: number
    flags?: string[]
    envelope?: MessageEnvelopeObject
    bodyStructure?: MessageStructureObject
    internalDate?: Date
    bodyParts?: {[key: string]: string}
    headers?: string
    id?: string
}

