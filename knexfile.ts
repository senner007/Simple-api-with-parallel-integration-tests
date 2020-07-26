import Knex, { PgConnectionConfig } from 'knex';

const path = require('path');
require('dotenv').config({ path: '.env' });

export interface IPgConfig extends Knex.Config {
  connection: PgConnectionConfig;
}

export interface IConfig {
  [t: string]: IPgConfig;
}

const config: IConfig = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_SERVER || 'localhost',
      database: 'initdb',
      port: 5432,
      user: 'postgres',
      password: 'mysecretpassword',
    },
    pool: { min: 0, max: 10 },
    seeds: {
      directory: path.join(__dirname, '/src/seeds/development'),
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/migrations',
    },
  },
  test: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'testdb',
      port: 5433,
      user: 'postgres',
      password: 'mysecretpassword',
    },
    pool: { min: 0, max: 5 },
    seeds: {
      directory: path.join(__dirname, '/src/seeds/production'),
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/migrations',
    },
  },
  production: {
    client: 'pg',
    connection: {
      port: Number(process.env.DB_PORT),
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: { min: 0, max: 10 },
    seeds: {
      directory: path.join(__dirname, '/src/seeds/production'),
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/migrations',
    },
  },
};

module.exports = config;
