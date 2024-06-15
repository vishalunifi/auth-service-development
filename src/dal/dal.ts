/**
 * @author Test Author
 */
import _ from "lodash"
import config from "config"
import Knex from "knex"
import { BaseModel } from "../common/models";
import User from "../models/User";

const DB_CONFIG: Object = config.get('database');

const knex = Knex(DB_CONFIG);
BaseModel.knex(knex)

export const list = async () => {
    return await User
        .query()
}
export const GetAll = async () =>{
    return await User.query();
}

export const get = async (id: string) => {
    const sqlRes = await User
        .query()
        .where({ id })

    if ((sqlRes) && (sqlRes.length > 0)) {
        return sqlRes[0]
    }
    else {
        return null
    }
}

export const create = async (details: Object) => {
    return await User
        .query()
        .insert(details)
}

export const update = async (id: string, fields: Object) => {
    return await User
        .query()
        .updateAndFetchById(id, fields)
}

export const del = async (id: string) => {
    return await User
        .query()
        .where({ id })
        .del()
}