import type { Knex } from "knex";

// Update with your config settings.
const username = encodeURIComponent('auth-user');
const host = '34.44.93.120';
const database = 'auth-db';
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    // connection: "postgresql://postgres:postgres@localhost:5432/test_db?schema=public",
    connection: `postgresql://${username}:12345678@${host}:5432/${database}?schema=public`,

    pool: {
      min: 2,
      max: 10
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;