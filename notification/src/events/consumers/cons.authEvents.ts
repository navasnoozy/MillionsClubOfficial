//src/events/consumers/cons.authEvents.ts
import { AuthEvent, TOPICS } from "@millionsclub/shared-libs/server";
import { EachMessagePayload } from "kafkajs";
import { IOtp, Otp } from "../../models/userModel";
import { notificationKafkaClient } from "../../config/kafka.client";
import { sendMail } from "../../controllers/sendMail";

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
            const otpData: Partial<IOtp> = {
              name: event.data.name,
              userId: event.userId,
              email: event.data.email,
              otp: Math.floor(100000 + Math.random() * 900000),
              expiresAt: new Date(Date.now() + 10 * 60 * 1000),
            };

            const newOtp = await Otp.create(otpData);
            sendMail ()
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
