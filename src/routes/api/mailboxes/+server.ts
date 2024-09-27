import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getMailboxes } from "$lib/server/imap"
import type { Config } from "node-imap"
import { StatusCodes } from "http-status-codes"
import { parseHeaders } from "$lib/tools"


// Get Mailbox-Names
export const GET: RequestHandler = async ({request}) => {
    const {headers} = request

    // Parse headers
    const {
        data: imapConfig,
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
        const mailboxes = await getMailboxes(imapConfig as Config)
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
