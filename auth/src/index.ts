// auth/src/index.ts
import { app } from "./app";
import connectDB from "./config/db";
import { disconnectKafka, initKafka } from "./config/kafka.client";

const port = process.env.PORT || 3000;



const startServer = async ()=> {
  try {
    connectDB();
    initKafka ();
    process.on ("SIGTERM", disconnectKafka)
    process.on ("SIGINT", disconnectKafka)
    
    app.listen(port, () => {
      console.log("server running on", port);
    });
  } catch (error) {
    console.error('Failed to start server',error);
    process.exit(1)
    
  }
};

startServer()
