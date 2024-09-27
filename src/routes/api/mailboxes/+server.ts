import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getMailboxNames } from "$lib/server/imap"
import type { Config } from "node-imap"


// Get Mailbox-Names
export const GET: RequestHandler = async ({request}) => {

    const {headers} = request

    const imapConfig: Config = {
        user: headers.get("X-Imap-User")!,
        password: headers.get("X-Imap-Password")!,
        host: headers.get("X-Imap-Host")!,
        port: Number(headers.get("X-Imap-Port")!),
        tls: headers.get("X-Imap-Tls") === "true",
    }

    const mailboxNames = await getMailboxNames(imapConfig)




    return json({
        success: true,
        mailboxNames
    })
}
