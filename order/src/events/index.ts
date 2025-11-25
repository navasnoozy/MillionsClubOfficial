//notification/src/events/index.ts
import { notificationKafkaClient } from "../config/kafka-client";
import handle_user_created from "./consumers/user-created";

export const addKafkaEventListers = async () => {
  await notificationKafkaClient.subscribe("user.created", handle_user_created);
};
