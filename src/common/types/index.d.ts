import _ from "lodash";
import Koa, { Context } from "koa";
import { RouterContext } from 'koa-router';
// user types
export type UserType = 'member' | 'provider'
export type UserId = number

export const USER_TYPE_MAP: { [id: UserType]: number } = {
    'physician': 0,
    'reviewer': 1,
    'member': 2,
}



export const USER_TYPE_MAP_INVERTED: { [id: string]: UserType } = _.invert(USER_TYPE_MAP)

export function userTypeStringToId(type: UserType) {
    return USER_TYPE_MAP[type]
}

export function userTypeIdToString(type: number) {
    return USER_TYPE_MAP_INVERTED[String(type)]
}


declare type Session = {
    userId: UserId | null,
    usertype: UserType | null,
    roles: Array<string>,
}

declare class KoaBodyParserRequest extends Context {
    body: any;
    method: any;
}


type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export declare class RestKoaContext extends RouterContext {
    session: Session;
    params: any;
    request: KoaBodyParserRequest;
    headers: any;
    query: any;
}
export declare type RouteDefinition = {
    method: string,
    path: string,
    handler: (ctx: RestKoaContext) => Promise<any> | null,
    middleware?: (Function | Array<Function>),
}

declare type CreateAPIFunc = (external: Array<RouteDefinition>, internal: Array<RouteDefinition>) => Array<Koa>

declare var exports: CreateAPIFunc