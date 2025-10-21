//notification/src/events/consumers/cons.userCreated.ts
import { AuthEvent, TOPICS } from "@millionsclub/shared-libs/server";
import { productKafkaClient } from "../../config/kafka.client";
import { EachMessagePayload } from "kafkajs";

export const subscribeToUserCreated = async () => {
  try {
    await productKafkaClient.subscribe(
      TOPICS.AUTH_EVENTS,
      async ({ message }: EachMessagePayload) => {
        try {
          const value = message.value?.toString();
          if (!value) return;

          const event = JSON.parse(value) as AuthEvent;
          
          if (event.type = "user.created"){
            
          }

        } catch (error) {
          console.log("Error processing user.created event", error);
        }
      }
    );
  } catch (error) {
    console.error("Failed to subscribe to user events", error);
    throw error;
  }
};
