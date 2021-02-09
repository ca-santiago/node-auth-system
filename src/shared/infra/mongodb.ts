
import mongoose from 'mongoose'

export interface MongoConnectionConf {
  host: string,
  port: string,
  user: string,
  password: string,
  database: string,
}

export async function initMongoConnection({ host, port, user, password, database }: MongoConnectionConf) {
  const uriBuilt = `mongodb://${host}:${port}/${database}`
  const con = await mongoose.connect(uriBuilt, {
    useUnifiedTopology: true, useNewUrlParser: true,
    useCreateIndex: true, useFindAndModify: false,
    bufferCommands: false
  });
  return con;
}
