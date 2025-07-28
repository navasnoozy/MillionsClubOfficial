// auth/src/index.ts
import { app } from "./app";
import connectDB from "./config/db";
import { initKafka } from "./config/kafka.client";
// import { disconnectKafka, initKafka } from "./config/kafka.client";

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
  await  connectDB();
  await  initKafka();

    app.listen(port, () => {
      console.log("server running on", port);
    });

    // process.on("SIGTERM", disconnectKafka);
    // process.on("SIGINT", disconnectKafka);
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
