//src/events/consumers/cons.authEvents.ts

import { TOPICS } from "@millionsclub/shared-libs/server";
import { EachBatchPayload } from "kafkajs";
import { notificationKafkaClient } from "../../config/kafka.client";
import { sendGridMail } from "../../services/sendGridMail";
import { verifyUrlTemplate } from "../../templates/verifyUrlTemplate";

export const subscribeToAuthEvents = async () => {
  try {
    await notificationKafkaClient.subscribe(
      TOPICS.AUTH_EVENTS,
      async ({ batch, resolveOffset, commitOffsetsIfNecessary, heartbeat }: EachBatchPayload) => {
        for (const message of batch.messages) {
          try {
            await heartbeat();

            const {
              userId,
              name,
              email,
              data: { url },
            } = JSON.parse(message.value?.toString()!);

            await sendGridMail({ to: email, subject: "MillionsClub verification", html: verifyUrlTemplate({ name: name, verifyUrl: url }) });

            // await wsConnectionManager.sendNotification(userId, "Verification mail successfully sent");

            resolveOffset(message.offset);

            await commitOffsetsIfNecessary();
          } catch (error) {
            console.log("Error processing KAFKA message:", error);
          }
        }
      },
      { useBatch: true, eachBatchAutoResolve: false }
    );
  } catch (error) {
    console.error("Failed to subscribe to auth events:", error);
    throw error;
  }
};
