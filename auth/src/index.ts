import connectDB from "./config/db";
import { initKafka, disconnectKafka } from "./config/kafka.client";
import { subscribeToProductCreated } from "./events/consumers/cons.productCreated";
import { createApp } from "./app";

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    await initKafka();

    await subscribeToProductCreated();

    const app = await createApp();

    app.listen(port, () => {
      console.log("Server running on", port);
    });

    process.on("SIGTERM", disconnectKafka);
    process.on("SIGINT", disconnectKafka);
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
