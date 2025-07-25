//products/src/index.ts

import { subscribeToUserCreated } from "./events/consumers/userCreated.consumer";
import { app } from "./app";
import connectDB from "./config/db";
import { disconnectKafka, initKafka } from "./config/kafka.client";

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Connect to DB first
    await connectDB();

    // Initialize Kafka
    await initKafka();

    // Start consuming events
    await subscribeToUserCreated();

    // Start HTTP server
    app.listen(port, () => {
      console.log(`Product service running on port ${port}`);
    });

    process.on("SIGTERM", disconnectKafka);
    process.on("SIGINT", disconnectKafka);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
