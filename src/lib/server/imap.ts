import { ImapFlow, type ImapFlowOptions } from "imapflow"


export async function getMailboxes(options: ImapFlowOptions) {
    console.debug(`getMailboxes()`)

    const client = new ImapFlow(options)
    await client.connect()
    const mailboxes = await client.list()
    await client.logout()
    return mailboxes.map(mailbox => mailbox.path).toSorted()
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
