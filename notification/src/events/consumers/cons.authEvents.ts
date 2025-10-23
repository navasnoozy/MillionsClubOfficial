
// notification/src/events/consumers/cons.authEvents.ts


import { AuthEvent, TOPICS } from "@millionsclub/shared-libs/server";
import { EachMessagePayload } from "kafkajs";
import { notificationKafkaClient } from "../../config/kafka.client";
import { createAndSendOtp } from "../../services/createAndsendOTP";


export const subscribeToAuthEvents = async () => {
  try {
    await notificationKafkaClient.subscribe(
      TOPICS.AUTH_EVENTS,
      async ({ message }: EachMessagePayload) => {
        try {
          const value = message.value?.toString();
          if (!value) return;

          const event = JSON.parse(value) as AuthEvent;

          if (event.type === "user.created") {
            await createAndSendOtp(
              event.userId,
              event.data.email,
              event.data.name
            );

            console.log(
              `Verification email sent to ${event.data.email} for user ${event.userId}`
            );
          }
        } catch (error) {
          console.error("Error processing Auth event:", error);
        }
      }
    );
  } catch (error) {
    console.error("Failed to subscribe to auth events:", error);
    throw error;
  }
};