// // auth/src/events/consumers/cons.productCreated.ts
import { ProductCreatedEvent, TOPICS } from "@millionsclub/shared-libs/server";
import { authKafkaClient } from "../../config/kafka.client";
import { EachMessagePayload } from "kafkajs";

export const subscribeToProductCreated = async () => {
  try {
    await authKafkaClient.subscribe(
      TOPICS.PRODUCT_EVENTS,
      async ({ message }: EachMessagePayload) => {
          try {
               const value = message.value?.toString();
               if (!value) return;

               const event = JSON.parse(value) as ProductCreatedEvent
               console.log('product created events recieved', event);
               
          } catch (error) {
               console.error('Error recieving product event');
               
          }
      }
    );
  } catch (error) {
    console.error("Failed to subscribe to Product created event ", error);
    throw error
  }
};
