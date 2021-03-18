// import { StartAuthSubscriptions } from "../modules/auth/subscriptions";
// import { GetMQInstance } from "../shared/services/MQ";
import { initMongoConnection } from "../shared/infra/mongodb";

export async function StartServices() {
  try {
    // await LoadMogoService();
    // await GetMQInstance();
    // await StartAuthSubscriptions();
  } catch (err) {
    process.exit();
  }
}

async function LoadMogoService() {
  try {
    console.log("[DB] Starting database conection");
    const conUrl = process.env.MONGO_URL || "mongo://localhost:27017";
    await initMongoConnection(conUrl);
    console.log("[DB] MongoDB connection started");
  } catch (err) {
    console.log("[DB] Could not connect to database");
    console.error(`[DB] ${err.message}`);
  }
}
