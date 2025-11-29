//notification/src/events/index.ts
import { paymentKafkaClient } from "../config/kafka-client";
import handle_user_created from "./consumers/user-created";

export const registerKafkaEventListers = async () => {
  await paymentKafkaClient.subscribe("user.created", handle_user_created);
};
