declare const PACKAGE: {name: string, version: string}  // Variablen aus package.json (über vite.config.ts eingefügt)
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { StatusCodes } from "http-status-codes"
import { parseHeaders } from "$lib/tools"
import type { ImapFlowOptions } from "imapflow"
import { getMailboxes } from "$lib/server/imap"
import type { MailboxInfo } from "$lib/interfaces"


// Get Mailbox-Names
export const GET: RequestHandler = async ({request}) => {
    const {headers} = request

    // Parse headers
    const {
        data: imapOptions,
        error: parseError
    } = parseHeaders(headers)
    if (parseError) {
        console.log(parseError.message)
        return json({
            success: false,
            error: true,
            error_code: StatusCodes.BAD_REQUEST,
            error_message: parseError.message,
            api_name: PACKAGE.name,
            api_version: PACKAGE.version
        })
    }

    // Get mailboxes
    try {
        const mailboxes: MailboxInfo[] = await getMailboxes(imapOptions as ImapFlowOptions)
        return json({
            success: true,
            mailboxes,
            api_name: PACKAGE.name,
            api_version: PACKAGE.version
        })
    } catch (error: any) {
        return json({
            success: false,
            error: true,
            error_code: StatusCodes.INTERNAL_SERVER_ERROR,
            error_message: error.toString(),
            api_name: PACKAGE.name,
            api_version: PACKAGE.version
        })
    }

}
