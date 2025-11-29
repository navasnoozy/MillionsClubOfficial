//notification/src/events/index.ts

import { orderKafkaClient } from "../config/kafka-client";

export const registerKafkaEventListers = async () => {
  // await orderKafkaClient.subscribe("user.created", { fromBeginning: true }, handle_email_verified);
};
