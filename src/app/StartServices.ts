
import { initMongoConnection, MongoConnectionConf } from "../shared/infra/mongodb";
import { loadMongoConfig } from "./loadMongoConfig";

export async function StartServices() {
    await LoadMogoService();
}


async function LoadMogoService() {
    try {
        console.log('[DB] Starting database conection');
        const mongoConfig: MongoConnectionConf = loadMongoConfig();
        await initMongoConnection(mongoConfig);
        console.log('[DB] MongoDB connection started');
    } catch (err) {
        console.log('[DB] Could not connect to database');
        console.error(`[DB] ${err.message}`)
    }
}
