import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getMessageUids } from "$lib/server/imap"
import type { Config } from "node-imap"
import { StatusCodes } from "http-status-codes"
import { parseHeaders } from "$lib/tools"


// Get Messages
export const GET: RequestHandler = async ({request, params}) => {
    const {headers} = request
    const mailboxName = params.mailboxName
    const messageUid: number = Number(params.messageUid)

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

    // Get message
    // try {
    //     const uids: number[] = await getMessage(imapConfig as Config, mailboxName, messageUid)
    //     return json({
    //         success: true,
    //         uids,
    //         total: uids.length
    //     })
    // } catch (error: any) {
    //     return json({
    //         success: false,
    //         error: true,
    //         error_code: StatusCodes.INTERNAL_SERVER_ERROR,
    //         error_message: error.toString()
    //     })
    // }

    return json({success: true})

}
