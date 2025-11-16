//src/events/consumers/cons.authEvents.ts

import { notificationKafkaClient } from "../config/kafka.client";
import user_created from "./consumers/user.created";

export const addKafkaEventListers = async () => {
  await notificationKafkaClient.subscribe("user_created", user_created);
};
