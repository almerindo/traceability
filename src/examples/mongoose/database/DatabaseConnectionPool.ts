import mongoose from 'mongoose';
import databaseConfig from './databaseConfig';

class DatabaseConnectionPool {
  private static instance: DatabaseConnectionPool;

  private connections: Map<string, mongoose.Connection> = new Map();

  public static getInstance(): DatabaseConnectionPool {
    if (!DatabaseConnectionPool.instance) {
      DatabaseConnectionPool.instance = new DatabaseConnectionPool();
    }

    return DatabaseConnectionPool.instance;
  }

  private constructor() {
    mongoose.Promise = global.Promise;
    mongoose.set('useCreateIndex', true);
  }

  public getConnection(dbName: string): mongoose.Connection {
    if (this.connections.has(dbName)) {
      return this.connections.get(dbName) as mongoose.Connection;
    }

    const connection: mongoose.Connection = mongoose.createConnection(
      databaseConfig.mongoURI,

      { ...databaseConfig.ConnectionOptions, dbName },
    );

    this.connections.set(dbName, connection);

    this.bindConnectionLog(connection);

    return connection;
  }

  public async closeConnections(): Promise<void> {
    this.connections.forEach(async connection => {
      await connection.close();
    });
  }

  private bindConnectionLog = (connection: mongoose.Connection): void => {
    connection.on(
      'error',
      console.log.bind(
        console,
        ` Erro ao conectar - Mongo ${JSON.stringify(
          databaseConfig.ConnectionOptions,
        )}`,
      ),
    );

    connection.once(
      'open',
      console.log.bind(
        console,
        `Conexão estabelecida -Mongo ${JSON.stringify(
          databaseConfig.ConnectionOptions,
        )}`,
      ),
    );
  };
}

export default DatabaseConnectionPool;
