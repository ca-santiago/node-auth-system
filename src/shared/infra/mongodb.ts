import mongoose from "mongoose";

export interface MongoConnectionConf {
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;
}

export async function initMongoConnection(conURL: string) {
  const con = await mongoose.connect(conURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    bufferCommands: false,
  });
  return con;
}
