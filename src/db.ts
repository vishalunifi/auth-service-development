// db.ts
import Knex from 'knex';
import { Model } from 'objection';
const username = encodeURIComponent('auth-user');
const host = '34.44.93.120';
const database = 'auth-db';
    // connection: "postgresql://postgres:postgres@localhost:5432/test_db?schema=public",

const knex = Knex({
  client: 'pg',
  connection:`postgresql://${username}:12345678@${host}/${database}?schema=public`,
  migrations: {
    tableName: 'knex_migrations'
  }
});

Model.knex(knex);

export default knex;
