//products/src/events/consumers/userCreated.consumer.ts

import { TOPICS, UserCreatedEvent } from "@millionsclub/shared-libs";
import { kafkaClient } from "../../config/kafka.client";
import { EachMessagePayload } from "kafkajs";

export const subscribeToUserCreated = async () => {
  try {
    await kafkaClient.subscribe(
      TOPICS.USER_EVENTS,
      async ({ message }: EachMessagePayload) => {
        try {
          const value = message.value?.toString();
          if (!value) return;

          const event = JSON.parse(value) as UserCreatedEvent;
          console.log("User created event received ", event);
        } catch (error) {
          console.log('Error processing user.created event', error);
          
        }
      }
    );
  } catch (error) {
    console.error("Failed to subscribe to user events", error);
    throw error;
  }
};

// import { EachMessagePayload } from "kafkajs";
// import { kafkaClient } from "../../config/kafka.client";

// export const subscribeToUserCreated = async () => {
//   await kafkaClient.subscribe(
//     "user-events",
//     async ({ message }: EachMessagePayload) => {
//       const value = message.value?.toString();
//       if (value) {
//         const parsed = JSON.parse(value);
//         console.log("User created event received in product service", parsed);
//       }
//     }
//   );
// };
