import { notificationKafkaClient } from "../config/kafka-client";
import handle_user_created from "./consumers/user-created";

export const registerKafkaEventListers = async () => {
  await notificationKafkaClient.subscribe("user.created", { fromBeginning: false }, handle_user_created);
};
