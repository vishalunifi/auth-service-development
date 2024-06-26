// Koa
import Koa from "koa"
import Router from "koa-router"
import bodyParser from "koa-bodyparser"
import AppError from "../errors/AppError"
// Swagger
import swaggerRouter from "../../swagger";
// Other
import _ from "lodash"
import config from "config"
import { RestKoaContext, RouteDefinition } from "../types/index.js";

const appName = config.get(`app.name`)
console.log(`initializing service ${appName}`)

const PORT_INTERNAL = config.get('api.ports.internal'),
    PORT_EXTERNAL = config.get('api.ports.external'),
    DEV = config.get('dev')

export default function startApi(externalRoutes: Array<RouteDefinition>, internalRoutes: Array<RouteDefinition>): Array<Koa> {
    return [
        bindRoutes(externalRoutes, PORT_EXTERNAL),
        bindRoutes(internalRoutes, PORT_INTERNAL)
    ]
}


function bindRoute(route: RouteDefinition, router: any) {
    const handler = route.handler

    const args: Array<any> = [route.path]

    if (route.middleware) {
        if (Array.isArray(route.middleware)) {
            Array.prototype.push.apply(args, route.middleware)
        } else if (typeof route.middleware === 'function') {
            args.push(route.middleware)
        }
    }

    args.push(async (ctx: any) => {
        const data = await handler(ctx)

        // if (typeof data === 'object' && data !== null && data.__override === true) {
        //     ctx.body = _.omit(data, '__override')
        // } else if(typeof data ==='object') {
        //     ctx.body = {
        //         error: false,
        //         data,
        //     }
        // }
    })
    switch (route.method) {
        case 'GET':
            router.get.apply(router, args)
            break
        case 'POST':
            router.post.apply(router, args)
            break
        case 'PUT':
            router.put.apply(router, args)
            break
        case 'DELETE':
            router.delete.apply(router, args)
            break
        case 'PATCH':
            router.patch.apply(router, args)
            break
    }
}

function bindRoutes(routes: RouteDefinition[], port: unknown) {

    const app = new Koa()
    const router = new Router()

    app.use(bodyParser({}))

    // bind all routes
    _.each(routes, route => bindRoute(route, router))

    app.use(async (ctx, next) => {
        try {
            if (DEV) {
                ctx.set('access-control-allow-origin', '*')
                ctx.set('access-control-allow-headers', ['Content-Type', 'Authorization'])
            }

            await next()
        } catch (err: any) {
            console.error('ROUTE ERR', JSON.stringify(err, null, 2), err.stack)

            if (err instanceof AppError) {
                err = err.toJSON()
            }

            if (err && err['__appError']) {
                ctx.status = err['__httpCode'] || 500
                ctx.body = _.omit(err, ['__httpCode', '__appError'])
            } else {
                ctx.status = 500
                ctx.body = {
                    error: true,
                    message: 'Unknown Internal Server Error',
                }
            }
        }
    })

    app.use(router.routes())
    app.use(router.allowedMethods());
    app.use(swaggerRouter.routes());
    app.use(swaggerRouter.allowedMethods());

    app.listen(port, () => {
        console.log(`API server listening on port ${port}`)
    })

    return app

}
