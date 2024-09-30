import { ImapFlow } from "imapflow"
import type { FetchMessageObject, ImapFlowOptions } from "imapflow"
import type { FetchedMessage, MailboxInfo, ParsedEmail } from "$lib/interfaces"
import PostalMime from "postal-mime"


export async function getMailboxes(options: ImapFlowOptions): Promise<MailboxInfo[]> {
    console.debug(`getMailboxes()`)

    const client = new ImapFlow(options)
    await client.connect()
    try {
        const listResponse = await client.list()
        let mailboxes: MailboxInfo[] = listResponse.map(mailbox => {
            return {...mailbox, flags: Array.from(mailbox.flags)}
        })
        mailboxes.sort((a, b) => a.path > b.path ? 1 : -1)
        return mailboxes
    } finally {
        await client.logout()
    }
}


export async function getMessageUids(options: ImapFlowOptions, mailboxName: string): Promise<number[]> {
    console.debug(`getMessageUids(${mailboxName})`)

    const client = new ImapFlow(options)
    await client.connect()
    try {
        await client.mailboxOpen(mailboxName, {readOnly: true})
        const uids = await client.search({deleted: false}, {uid: true})
        await client.mailboxClose()
        return uids
    } finally {
        await client.logout()
    }
}


export async function getMessage(options: ImapFlowOptions, mailboxName: string, messageUid: number, raw?: boolean) {
    console.debug(`getMessage(${mailboxName}, ${messageUid})`)

    const client = new ImapFlow(options)
    await client.connect()

    let lock = await client.getMailboxLock(mailboxName, {readonly: true})
    try {

        // // Get body structure
        // const fetchBodyStructure = await client.fetchOne(
        //     String(messageUid),
        //     {bodyStructure: true},
        //     {uid: true}
        // )

        // Get full message with body parts
        const fetchMessage: FetchMessageObject = await client.fetchOne(
            String(messageUid),
            {
                uid: true,
                flags: true,
                bodyStructure: true,
                envelope: true,
                size: true,
                source: true,
                threadId: true,
                labels: true,
                headers: true,
                // bodyParts: getBodyParts(fetchBodyStructure.bodyStructure.childNodes)
            },
            {uid: true}
        )
        await client.mailboxClose()

        // const bodyParts: {[key: string]: string} = {}
        // for (const [key, buffer] of fetchMessage.bodyParts.entries()) {
        //     bodyParts[key] = buffer.toString()
        // }

        const parsedEmail: ParsedEmail = await PostalMime.parse(fetchMessage.source)
        parsedEmail.attachments.forEach((attachment) => {
            const contentBuffer = Buffer.from(attachment.content as ArrayBuffer)
            attachment.contentBase64 = contentBuffer.toString("base64")
            delete attachment.content
        })

        let message: FetchedMessage = {
            seq: fetchMessage.seq,
            uid: fetchMessage.uid,
            modseq: Number(fetchMessage.modseq),
            flags: fetchMessage?.flags ? Array.from(fetchMessage.flags) : undefined,
            //@ts-ignore
            emailId: fetchMessage.id,
            bodyStructure: fetchMessage.bodyStructure,
            envelope: fetchMessage.envelope,
            size: fetchMessage.size,
            threadId: fetchMessage.threadId,
            labels: fetchMessage?.labels ? Array.from(fetchMessage.labels) : undefined,
            parsed: parsedEmail,
            raw: raw ? fetchMessage.source.toString() : undefined,
            // bodyParts,
        }
        return message
    } finally {
        lock.release()
        await client.logout()
    }
}


// function getBodyParts(childNodes: MessageStructureObject[], parentParts: string[] = []) {
//     let parts: string[] = [...parentParts]
//
//     for (const childNode of childNodes) {
//         parts.push(childNode.part)
//         if (childNode.childNodes?.length) {
//             parts = parts.concat(getBodyParts(childNode.childNodes, parts))
//         }
//     }
//
//     return parts
// }
