import { ImapFlow, type ImapFlowOptions } from "imapflow"
import type { MailboxInfo } from "$lib/interfaces"


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
