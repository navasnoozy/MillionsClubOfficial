//products/src/index.ts

import { subscribeToUserCreated } from "./consumers/userCreated.consumer";
import { app } from "./app";
import connectDB from "./config/db";
import { initKafka } from "./config/kafka.client";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running on ", port);
  connectDB();
  initKafka();
  subscribeToUserCreated();
});
