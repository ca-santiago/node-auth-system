import { mongo } from "mongoose";

export function loadMongoConfig() {
  const mongoConfig =
    process.env.NODE_ENV === "DEV"
      ? {
          database: process.env.DEV_MONGO_DBNAME,
          user: process.env.DEV_MONGO_USER,
          password: process.env.DEV_MONGO_PASSWORD,
          host: process.env.DEV_MONGO_HOST,
          port: process.env.DEV_MONGO_PORT,
        }
      : {
          database: process.env.MONGO_DBNAME,
          user: process.env.MONGO_USER,
          password: process.env.MONGO_PASSWORD,
          host: process.env.MONGO_HOST,
          port: process.env.MONGO_PORT,
        };
  return Object.freeze(mongoConfig);
}
