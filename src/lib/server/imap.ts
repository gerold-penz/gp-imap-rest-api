import { ImapFlow } from "imapflow"
import type { FetchMessageObject, ImapFlowOptions, MessageStructureObject } from "imapflow"
import {simpleParser} from "mailparser"
import type { FetchMessage, MailboxInfo } from "$lib/interfaces"


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


export async function getMessage(options: ImapFlowOptions, mailboxName: string, messageUid: number) {
    console.debug(`getMessage(${mailboxName}, ${messageUid})`)

    const client = new ImapFlow(options)
    await client.connect()

    let lock = await client.getMailboxLock(mailboxName, {readonly: true})
    try {
        // Get body structure
        const fetchBodyStructure = await client.fetchOne(
            String(messageUid),
            {bodyStructure: true},
            {uid: true}
        )

        // Get full message with body parts
        const fetchMessage: FetchMessageObject = await client.fetchOne(
            String(messageUid),
            {
                uid: true,
                flags: true,
                bodyStructure: true,
                envelope: true,
                internalDate: true,
                size: true,
                source: true,
                threadId: true,
                labels: true,
                // headers: true,
                // bodyParts: getBodyParts(fetchBodyStructure.bodyStructure.childNodes)
            },
            {uid: true}
        )
        await client.mailboxClose()

        // const bodyParts: {[key: string]: string} = {}
        // for (const [key, buffer] of fetchMessage.bodyParts.entries()) {
        //     bodyParts[key] = buffer.toString()
        // }


        simpleParser(fetchMessage.source, (err, mail) => {
            console.log("--------------------")
            console.log(mail)
            console.log("--------------------")
        })


        let message: FetchMessage = {
            seq: fetchMessage.seq,
            uid: fetchMessage.uid,
            modseq: Number(fetchMessage.modseq),
            flags: fetchMessage?.flags ? Array.from(fetchMessage.flags) : undefined,
            //@ts-ignore
            emailId: fetchMessage.id,
            bodyStructure: fetchMessage.bodyStructure,
            envelope: fetchMessage.envelope,
            internalDate: fetchMessage.internalDate,
            size: fetchMessage.size,
            threadId: fetchMessage.threadId,
            labels: fetchMessage?.labels ? Array.from(fetchMessage.labels) : undefined,
            // headers: fetchMessage.headers.toString(),
            // source: fetchMessage.source.toString(),
            // bodyParts
        }
        return message
    } finally {
        lock.release()
        await client.logout()
    }
}


function getBodyParts(childNodes: MessageStructureObject[], parentParts: string[] = []) {
    let parts: string[] = [...parentParts]

    for (const childNode of childNodes) {
        parts.push(childNode.part)
        if (childNode.childNodes?.length) {
            parts = parts.concat(getBodyParts(childNode.childNodes, parts))
        }
    }


    return parts
}
