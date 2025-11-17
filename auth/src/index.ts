// auth/src/index.ts

import { MongoDatabase } from "./config/db";
import { initKafka, disconnectKafka, startKafkaConsumer } from "./config/kafka.client";
import { createApp } from "./app";
import { addKafkaEventListers } from "./events";
import { IDatabase } from "./interface/IDatabase";

const port = process.env.PORT || 3000;

const startServer = async (database: IDatabase) => {
  try {
    await database.connect();

    await initKafka();
    addKafkaEventListers();
    startKafkaConsumer();

    const app = await createApp();

    app.listen(port, () => {
      console.log("server running on", port);
    });

    process.on("SIGTERM", disconnectKafka);
    process.on("SIGINT", disconnectKafka);
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

// Dependency injection
const mongoUri = process.env.MONGO_URI!;
const database = new MongoDatabase(mongoUri);
startServer(database);
