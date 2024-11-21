declare const PACKAGE: {name: string, version: string}  // Variablen aus package.json (über vite.config.ts eingefügt)
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getMessageUids } from "$lib/server/imap"
import { StatusCodes } from "http-status-codes"
import { parseHeaders } from "$lib/tools"
import type { ImapFlowOptions } from "imapflow"


// Get Message uids
export const GET: RequestHandler = async ({request, params}) => {
    const {headers} = request
    const mailboxName = params.mailboxName

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

    // Get message uids
    try {
        const uids: number[] = await getMessageUids(imapOptions as ImapFlowOptions, mailboxName)
        return json({
            success: true,
            uids,
            total: uids.length,
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
