import type { ListResponse, MessageEnvelopeObject, MessageStructureObject } from "imapflow"
import type { Attachment, Email } from "postal-mime"


export interface MailboxInfo extends Omit<ListResponse, "flags"> {
    flags: string[];
}


export interface FetchedMessage {
    seq?: number
    uid?: number
    modseq?: number
    emailId?: string
    threadId?: string
    labels?: string[]
    size?: number
    flags?: string[]
    envelope?: MessageEnvelopeObject
    bodyStructure?: MessageStructureObject
    bodyParts?: {[key: string]: string}
    headers?: string
    id?: string
    parsed?: any
    raw?: string
}

export interface ParsedAttachment extends Omit<Attachment, "content"> {
    content?: ArrayBuffer;
    contentBase64?: string
}


export interface ParsedEmail extends Omit<Email, "attachments"> {
    attachments: ParsedAttachment[]
}
