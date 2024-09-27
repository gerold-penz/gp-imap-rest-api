import Connection, { type Config } from "node-imap"


async function getImapConnection(imapConfig: Config): Promise<Connection> {
    return new Promise(async (resolve, reject) => {
        const connection = new Connection(imapConfig)

        connection.once("ready", () => {
            console.debug("Imap ready")
            resolve(connection)
        })

        connection.once('error', function (error) {
            console.error(error)
            connection.destroy()
            reject(error)
        })

        connection.once('end', function () {
            console.debug('Imap connection ended')
            connection.destroy()
        })

        connection.connect()
    })
}


export async function getMailboxNames(imapConfig: Config) {
    const imap = await getImapConnection(imapConfig)
    let mailboxNames: string[]
    return new Promise((resolve, reject) => {
        imap.getBoxes((error, mailboxes: Connection.MailBoxes) => {
            if (error) {
                imap.end()
                reject(error)
                return
            }
            mailboxNames = flattenMailboxNames(mailboxes)
            imap.end()
            resolve(mailboxNames)
        })
    })
}


function flattenMailboxNames(mailboxes: Connection.MailBoxes, parentMailboxName: string = ""): string[] {
    let mailboxNames: string[] = []
    for (let [mailboxName, mailbox] of Object.entries(mailboxes)) {
        if (parentMailboxName.length) {
            mailboxName = parentMailboxName + mailbox.delimiter + mailboxName
        }
        mailboxNames.push(mailboxName)
        if (mailbox.children) {
            mailboxNames = mailboxNames.concat(flattenMailboxNames(mailbox.children, mailboxName))
        }
    }
    return mailboxNames.toSorted()
}
