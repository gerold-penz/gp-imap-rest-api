import { ImapFlow, type ImapFlowOptions } from "imapflow"
import type { MailboxInfo } from "$lib/interfaces"


export async function getMailboxes(options: ImapFlowOptions): Promise<MailboxInfo[]> {
    console.debug(`getMailboxes()`)

    const client = new ImapFlow(options)
    await client.connect()
    const listResponse = await client.list()
    await client.logout()
    let mailboxes: MailboxInfo[] = listResponse.map(mailbox => {
        return {...mailbox, flags: Array.from(mailbox.flags)}
    })
    mailboxes.sort((a, b) => a.path > b.path ? 1 : -1)
    return mailboxes
}


export async function getMessageUids(options: ImapFlowOptions, mailboxName: string): Promise<number[]> {
    console.debug(`getMessageUids(${mailboxName})`)

    const client = new ImapFlow(options)
    await client.connect()
    await client.mailboxOpen(mailboxName, {readOnly: true})
    const uids = await client.search({deleted: false}, {uid: true})
    await client.mailboxClose()
    await client.logout()
    return uids
}
