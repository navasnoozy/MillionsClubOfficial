// notification/src/events/consumers/cons.authEvents.ts

import { AuthEvent, TOPICS } from "@millionsclub/shared-libs/server";
import { EachMessagePayload } from "kafkajs";
import { notificationKafkaClient } from "../../config/kafka.client";
import { createAndSendOtp } from "../../services/createAndsendOTP";
import { WebSocketService } from "../../WebSocket/WebSocketService";

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
            const result = await createAndSendOtp(
              event.userId,
              event.data.email,
              event.data.name
            );

            console.log(
              `Verification email sent to ${event.data.email} for user ${event.userId}`
            );

            if (result === "success") {
              const ws = new WebSocketService();
              ws.sendNotification("email sending success");

              await consumer.commitOffsets([
                {
                  topic,
                  partition,
                  offset: (Number(message.offset) + 1).toString(),
                },
              ]);
            }
          }
        } catch (error) {
          console.error("Error processing Auth event:", error);
        }
      },
      { autoCommit: false }
    );
  } catch (error) {
    console.error("Failed to subscribe to auth events:", error);
    throw error;
  }
};
