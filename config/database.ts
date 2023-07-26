import path from 'path';
import {parse} from 'pg-connection-string';


export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');
  const { host, port, database, user, password } = parse(env("DATABASE_URL"));

  const connections = {
    postgres: {
      /* connection: {
         connectionString: env('DATABASE_URL'),
         host: env('DATABASE_HOST', 'localhost'),
         port: env.int('DATABASE_PORT', 5432),
         database: env('DATABASE_NAME', 'fasraf'),
         user: env('DATABASE_USERNAME', 'fasraf'),
         password: env('DATABASE_PASSWORD', 'fasraf'),
         ssl: env.bool('DATABASE_SSL', false) && {
           key: env('DATABASE_SSL_KEY', undefined),
           cert: env('DATABASE_SSL_CERT', undefined),
           ca: env('DATABASE_SSL_CA', undefined),
           capath: env('DATABASE_SSL_CAPATH', undefined),
           cipher: env('DATABASE_SSL_CIPHER', undefined),
           rejectUnauthorized: env.bool(
             'DATABASE_SSL_REJECT_UNAUTHORIZED',
             true
           ),
         },
         schema: env('DATABASE_SCHEMA', 'public'),
       },*/
      connection: {
        host,
        port,
        database,
        user,
        password
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          '..',
          '..',
          env('DATABASE_FILENAME', '.tmp/data.db')
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
