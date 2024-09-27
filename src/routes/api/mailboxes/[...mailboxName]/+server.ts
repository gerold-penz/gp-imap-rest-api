import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'


// Get messageIds
export const GET: RequestHandler = ({request, url, params}) => {
    const mailboxName = params.mailboxName
    const {headers} = request


    return json({
        mailboxName,
        success: true
    })
}
