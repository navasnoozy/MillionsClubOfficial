// src/index.ts
import { app } from "./app";
import { MongoDatabase } from "./config/MongoDatabase";
import { IDatabase } from "./interfaces/IDatabase";
import { initKafka, disconnectKafka, startKafkaConsumer } from "./config/kafka.client";
import { registerKafkaEventListers } from "./events";

const port = process.env.PORT || 3000;

const startServer = async (database: IDatabase) => {
  try {
    await database.connect();
    
    await initKafka();
    registerKafkaEventListers()
    startKafkaConsumer()

    app.listen(port, () => {
      console.log(`Product service running on port ${port}`);
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