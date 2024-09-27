import Connection, { type Config } from "node-imap"
import type { MailboxInfo } from "$lib/interfaces"


async function getImapConnection(imapConfig: Config): Promise<Connection> {
    return new Promise(async (resolve, reject) => {
        const connection = new Connection(imapConfig)

        connection.on("ready", () => {
            console.debug("Imap ready")
            resolve(connection)
        })

        connection.on("error", function (error) {
            console.error(error)
            connection.destroy()
            reject(error)
        })

        connection.on("end", function () {
            console.debug('Imap connection ended')
            connection.destroy()
        })

        connection.connect()
    })
}


export async function getMailboxes(imapConfig: Config) {
    const imap = await getImapConnection(imapConfig)
    try {
        let mailboxInfos: MailboxInfo[]
        return new Promise((resolve, reject) => {
            imap.getBoxes((error, mailboxes: Connection.MailBoxes) => {
                if (error) {
                    imap.destroy()
                    reject(error)
                    return
                }
                mailboxInfos = flattenMailboxes(mailboxes)
                resolve(mailboxInfos)
            })
        })
    } finally {
        imap.end()
    }

}


function flattenMailboxes(mailboxes: Connection.MailBoxes, parentMailbox?: MailboxInfo): MailboxInfo[] {
    let mailboxInfos: MailboxInfo[] = []
    for (let [mailboxName, mailbox] of Object.entries(mailboxes)) {
        if (parentMailbox?.name) {
            mailboxName = parentMailbox.name + mailbox.delimiter + mailboxName
        }
        const mailboxInfo = {
            name: mailboxName,
            attribs: mailbox.attribs
        }
        mailboxInfos.push(mailboxInfo)
        if (mailbox.children) {
            mailboxInfos = mailboxInfos.concat(flattenMailboxes(mailbox.children, mailboxInfo))
        }
    }
    return mailboxInfos.toSorted((a, b) => {
        return a.name.localeCompare(b.name)
    })
}
