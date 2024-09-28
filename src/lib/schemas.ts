import { zfd } from "zod-form-data"
import { z } from "zod"


export const imapOptionsSchema = zfd.formData({
    host: zfd.text(),
    port: zfd.numeric(),
    secure: z.boolean().nullable(),
    servername: zfd.text().nullable(),
    auth: z.object({
        user: zfd.text(),
        pass: zfd.text().nullable(),
        accessToken: zfd.text().nullable(),
    }),
})
