// src/index.ts
import { app } from "./app";
import http from "http";
import { WebSocketServer } from "ws";
import { MongoDatabase } from "./config/MongoDatabase";
import { IDatabase } from "./interfaces/IDatabase";
import { initKafka, disconnectKafka } from "./config/kafka.client";
import { subscribeToAuthEvents } from "./events/consumers/cons.authEvents";
import { WebSocketService } from "./config/WebSocket";

const port = process.env.PORT || 3000;

const server = http.createServer(app);

export const wss = new WebSocketServer({ server });
export const wsService = new WebSocketService(); //Singleton instance, export for consumers

// Optional: Global WS event handling (e.g., for broadcasting), but per-user logic goes in route
wss.on("connection", (ws, req) => {
  console.log("Raw WS connection attempted:", req.url);
  // Auth & per-user logic handled in route upgrade, so this is fallback/error
  ws.close(1008, "Auth required");
});

const startServer = async (database: IDatabase) => {
  try {
    await database.connect();

    await initKafka();
    await subscribeToAuthEvents();

    app.listen(port, () => {
      console.log(`Notification service running on port ${port}`);
    });

    process.on("SIGTERM", async () => {
      wsService.connections.forEach((ws) => ws.close());

      await database.disconnect();

      await disconnectKafka();
    });

    process.on("SIGINT", async () => {
      wsService.connections.forEach((ws) => ws.close());

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
