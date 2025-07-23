// auth/src/index.ts
import { app } from "./app";
import connectDB from "./config/db";
import { disconnectKafka, initKafka } from "./config/kafka.client";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server running on", port);
  connectDB();
  initKafka ();
  process.on ("SIGTERM", disconnectKafka)
  process.on ("SIGINT", disconnectKafka)
});
