import { ImapFlow, type ImapFlowOptions } from "imapflow"
import type { MailboxInfo } from "$lib/interfaces"


// Options: https://imapflow.com/module-imapflow-ImapFlow.html
function getImapClient(options: ImapFlowOptions) {
    return new ImapFlow(options)
}


// async function getImapConnection(imapConfig: Config): Promise<Connection> {
//     return new Promise(async (resolve, reject) => {
//         const connection = new Connection(imapConfig)
//
//         connection.on("ready", () => {
//             console.debug("Imap ready")
//             resolve(connection)
//         })
//
//         connection.on("error", function (error) {
//             console.error(error)
//             connection.destroy()
//             reject(error)
//         })
//
//         connection.on("end", function () {
//             console.debug('Imap connection ended')
//             connection.destroy()
//         })
//
//         connection.connect()
//     })
// }


export async function getMailboxes(options: ImapFlowOptions) {
    console.debug(`getMailboxes()`)
    const client = getImapClient(options)
    await client.connect()
    const mailboxes = await client.list()
    await client.logout()
    client.close()
    return mailboxes.map(mailbox => mailbox.path).toSorted()
}


export async function getMessageUids(options: ImapFlowOptions, mailboxName: string): Promise<number[]> {
    console.debug(`getMessageUids(${mailboxName})`)
    const client = getImapClient(options)
    await client.connect()

    const lock = await client.getMailboxLock(mailboxName)
    let uids: number[]
    try {
        uids = await client.search({all: true}, {uid: true})
    } finally {
        lock.release()
    }
    await client.logout()
    client.close()
    return uids
}


// function flattenMailboxes(mailboxes: Connection.MailBoxes, parentMailbox?: MailboxInfo): MailboxInfo[] {
//     let mailboxInfos: MailboxInfo[] = []
//     for (let [mailboxName, mailbox] of Object.entries(mailboxes)) {
//         if (parentMailbox?.name) {
//             mailboxName = parentMailbox.name + mailbox.delimiter + mailboxName
//         }
//         const mailboxInfo = {
//             name: mailboxName,
//             attribs: mailbox.attribs
//         }
//         mailboxInfos.push(mailboxInfo)
//         if (mailbox.children) {
//             mailboxInfos = mailboxInfos.concat(flattenMailboxes(mailbox.children, mailboxInfo))
//         }
//     }
//     return mailboxInfos.toSorted((a, b) => {
//         return a.name.localeCompare(b.name)
//     })
// }
