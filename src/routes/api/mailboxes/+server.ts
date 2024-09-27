import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getMailboxes } from "$lib/server/imap"
import type { Config } from "node-imap"
import { z } from "zod"
import { zfd } from "zod-form-data"
import { StatusCodes } from "http-status-codes"


const imapConfigSchema = zfd.formData({
    /** Username for plain-text authentication. */
    user: zfd.text(),
    /** Password for plain-text authentication. */
    password: zfd.text(),
    /** Base64-encoded OAuth token for OAuth authentication for servers that support it (See Andris Reinman's xoauth.js module to help generate this string). */
    xoauth: zfd.text().nullable(),
    /** Base64-encoded OAuth2 token for The SASL XOAUTH2 Mechanism for servers that support it (See Andris Reinman's xoauth2 module to help generate this string). */
    xoauth2: zfd.text().nullable(),
    /** Hostname or IP address of the IMAP server. Default: "localhost" */
    host: zfd.text().nullable(),
    /** Port number of the IMAP server. Default: 143 */
    port: zfd.numeric().nullable(),
    /** Perform implicit TLS connection? Default: false */
    tls: z.boolean().nullable(),
    /** Set to 'always' to always attempt connection upgrades via STARTTLS, 'required' only if upgrading is required, or 'never' to never attempt upgrading. Default: 'never' */
    autotls: zfd.text(z.enum(["always", "required", "never"])).nullable(),
    /** Number of milliseconds to wait for a connection to be established. Default: 10000 */
    connTimeout: zfd.numeric().nullable(),
    /** Number of milliseconds to wait to be authenticated after a connection has been established. Default: 5000 */
    authTimeout: zfd.numeric().nullable(),
})


// Get Mailbox-Names
export const GET: RequestHandler = async ({request}) => {
    const {headers} = request

    // Parse header
    const {data: imapConfig, error: parseError} = imapConfigSchema.safeParse({
        user: headers.get("X-Imap-User"),
        password: headers.get("X-Imap-Password"),
        xoauth: headers.get("X-Imap-Xoauth"),
        xoauth2: headers.get("X-Imap-Xoauth2"),
        host: headers.get("X-Imap-Host"),
        port: headers.get("X-Imap-Port"),
        tls: (headers.get("X-Imap-Tls") || "false").toLowerCase() === "true",
        autotls: headers.get("X-Imap-Autotls"),
        connTimeout: headers.get("X-Imap-Conn-Timeout"),
        authTimeout: headers.get("X-Imap-Auth-Timeout"),
    })
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
