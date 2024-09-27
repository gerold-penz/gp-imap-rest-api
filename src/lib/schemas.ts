import { zfd } from "zod-form-data"
import { z } from "zod"


export const imapConfigSchema = zfd.formData({
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
