// src/index.ts
import { app } from "./app";
import { IDatabase } from "./interfaces/IDatabase";
import { MongoDatabase } from "./config/Mongo-database";
import { disconnectKafka, initKafka, startKafkaConsumer } from "./config/kafka-client";
import { registerKafkaEventListeners } from "./events";

const port = process.env.PORT || 3000;

const startServer = async (database: IDatabase) => {
  try {
    await database.connect();

    await initKafka();
    await registerKafkaEventListeners();
    await  startKafkaConsumer()

    app.listen(port, () => {
      console.log(`Oder service running on port ${port}`);
    });

    process.on("SIGTERM", async () => {
      await database.disconnect();
      await disconnectKafka();
    });
    process.on("SIGINT", async () => {
      await database.disconnect();
      await disconnectKafka();
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Dependency injection
const mongoUri = process.env.MONGO_URI!;
const database = new MongoDatabase(mongoUri);
startServer(database);
