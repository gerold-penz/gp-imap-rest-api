import { imapOptionsSchema } from "$lib/schemas"


export function parseHeaders(headers: Headers) {
    return imapOptionsSchema.safeParse({
        host: headers.get("X-Imap-Host"),
        port: headers.get("X-Imap-Port"),
        secure: (headers.get("X-Imap-Secure") || "false").toLowerCase() === "true" || null,
        servername: headers.get("X-Imap-Servername"),
        disableCompression: (headers.get("X-Imap-Disable-Compression") || "false").toLowerCase() === "true" || null,
        auth: {
            user: headers.get("X-Imap-User"),
            pass: headers.get("X-Imap-Pass"),
            accessToken: headers.get("X-Imap-Access-Token"),
        },
        disableAutoIdle: (headers.get("X-Imap-Disable-Auto-Idle") || "false").toLowerCase() === "true" || null,
        tls: {
            rejectUnauthorized: (headers.get("X-Imap-Tls-Reject-Unauthorized") || "true").toLowerCase() === "false" || null,
        }
    })
}
