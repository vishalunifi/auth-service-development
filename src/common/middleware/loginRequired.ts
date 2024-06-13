/**
 * @author Test Author

 */
import NotAuthenticatedError from "../errors/NotAuthenticated";
import { RestKoaContext } from "../types";

// import { callService } from "../microservice.js"

export default function loginRequired() {
    return async function loginRequiredMiddleware(ctx: RestKoaContext,
         next: Function) {
        if (ctx.session) {
            return await next()
        }

        const insighter_header_str: string | null |
         undefined = ctx.headers['x-insighter-credentials']

        if (insighter_header_str) {
            ctx.session = JSON.parse(insighter_header_str)
            console.debug('internal auth: ' + insighter_header_str)
            return await next()
        }

        const authorizationHeader: string | null | undefined =
         ctx.headers['authorization']

        if (!authorizationHeader) {
            throw new NotAuthenticatedError({})
        }

        const token = authorizationHeader.replace('Bearer ', '')

        let authHeader: any

        try {

            // authHeader = await callService({ method: 'GET', svc: 'auth',
            // uri: '/session/' + token })
            authHeader = token
        }
        catch (ex) {
            //TODO: proper exception parsing
            throw new NotAuthenticatedError({})
        }

        if (!authHeader) {
            throw new NotAuthenticatedError({})
        }

        ctx.session = authHeader

        await next()
    }
}
