// src/index.ts
import { app } from "./app";
import http from "http";
import { WebSocketServer } from "ws";
import { MongoDatabase } from "./config/MongoDatabase";
import { IDatabase } from "./interfaces/IDatabase";
import { initKafka, disconnectKafka, startKafkaConsumer } from "./config/kafka.client";
import { WebSocketService } from "./WebSocket/WebSocketService";
import { upgradeHandler } from "./WebSocket/upgradeHandler";
import { addKafkaEventListers } from "./events";

const port = process.env.PORT || 3000;

const server = http.createServer(app);

export const webSocketServer = new WebSocketServer({ noServer: true });
export const wsConnectionManager = new WebSocketService();

server.on("upgrade", (req, socket, head) => {
  upgradeHandler(req, socket, head, webSocketServer, wsConnectionManager);
});

const startServer = async (database: IDatabase) => {
  try {
    await database.connect();

    await initKafka();
    await addKafkaEventListers();
     await startKafkaConsumer();   // <-- required final step

    server.listen(port, () => {
      console.log(`Notification service running on port ${port}`);
    });

    process.on("SIGTERM", async () => {
      wsConnectionManager.connections.forEach((ws) => ws.close());

      await database.disconnect();

      await disconnectKafka();
    });

    process.on("SIGINT", async () => {
      wsConnectionManager.connections.forEach((ws) => ws.close());

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
