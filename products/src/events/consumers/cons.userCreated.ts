//products/src/events/consumers/userCreated.consumer.ts

// import { TOPICS, UserCreatedEvent } from "@millionsclub/shared-libs";
// import { productKafkaClient } from "../../config/kafka.client";
// import { EachMessagePayload } from "kafkajs";

// export const subscribeToUserCreated = async () => {
//   try {
//     await productKafkaClient.subscribe(
//       TOPICS.USER_EVENTS,
//       async ({ message }: EachMessagePayload) => {
//         try {
//           const value = message.value?.toString();
//           if (!value) return;

//           const event = JSON.parse(value) as UserCreatedEvent;
//           console.log("User created event received ", event);
//         } catch (error) {
//           console.log("Error processing user.created event", error);
//         }
//       }
//     );
//   } catch (error) {
//     console.error("Failed to subscribe to user events", error);
//     throw error;
//   }
// };
