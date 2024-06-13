/**
 * @author Test Author

 */

import { RestKoaContext } from "../types/index.js"

export default function bodyRequired(fields: Array<string>) {
    return async (ctx: RestKoaContext, next: Function) => {
        fields.forEach((f) => {
            if (!ctx.request.body[f]) {
                throw new Error(f + 'Required field missing')
            }
        })

        return await next()
    }
}
