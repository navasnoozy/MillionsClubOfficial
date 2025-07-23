import { EachMessagePayload } from "kafkajs";
import { kafkaClient } from "../../config/kafka.client";

export const subscribeToUserCreated = async () => {
  await kafkaClient.subscribe(
    "user-events",
    async ({ message }: EachMessagePayload) => {
      const value = message.value?.toString();
      if (value) {
        const parsed = JSON.parse(value);
        console.log("User created event received in product service", parsed);
      }
    }
  );
};
