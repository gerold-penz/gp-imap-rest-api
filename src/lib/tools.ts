import { imapConfigSchema } from "$lib/schemas"


export function parseHeaders(headers: Headers) {
    return imapConfigSchema.safeParse({
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
}
