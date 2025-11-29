//notification/src/events/index.ts

import { authKafkaClient } from "../config/kafka.client";
import handle_email_verified from "./consumers/email_verfied";

export const registerKafkaEventListers = async () => {
  await authKafkaClient.subscribe("email.verified", handle_email_verified);
};
