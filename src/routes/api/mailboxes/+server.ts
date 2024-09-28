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
            error_message: parseError.message
        })
    }

    // Get mailboxes
    try {
        const mailboxes: MailboxInfo[] = await getMailboxes(imapOptions as ImapFlowOptions)
        return json({
            success: true,
            mailboxes
        })
    } catch (error: any) {
        return json({
            success: false,
            error: true,
            error_code: StatusCodes.INTERNAL_SERVER_ERROR,
            error_message: error.toString()
        })
    }

}
