declare const PACKAGE: {
    name: string,
    version: string
}  // Variablen aus package.json (über vite.config.ts eingefügt)
import { json } from '@sveltejs/kit'
import type { RequestHandler } from "../../../.svelte-kit/types/src/routes/api/mailboxes/$types"


export const GET: RequestHandler = async () => {
    return json({
        name: PACKAGE.name,
        version: PACKAGE.version
    })
}
