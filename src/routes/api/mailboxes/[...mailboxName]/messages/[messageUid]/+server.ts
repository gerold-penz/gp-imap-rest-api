import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { StatusCodes } from "http-status-codes"
import { parseHeaders } from "$lib/tools"
import type { ImapFlowOptions } from "imapflow"
import { getMessage } from "$lib/server/imap"


// Get Message uids
export const GET: RequestHandler = async ({request, params}) => {
    const {headers} = request
    const mailboxName = params.mailboxName
    const messageUid: number = Number(params.messageUid)

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

    // Get message
    try {
        const message = await getMessage(imapOptions as ImapFlowOptions, mailboxName, messageUid)
        return json({
            success: true,
            message,
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
