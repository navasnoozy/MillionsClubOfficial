//src/events/consumers/cons.authEvents.ts

import { TOPICS } from "@millionsclub/shared-libs/server";
import { EachBatchPayload } from "kafkajs";
import { wsConnectionManager } from "../..";
import { notificationKafkaClient } from "../../config/kafka.client";
import { createAndSendInitialOtp } from "../../services/createAndSendOtp";

let trycount = 0;

export const subscribeToAuthEvents = async () => {
  try {
    await notificationKafkaClient.subscribe(
      TOPICS.AUTH_EVENTS,
      async ({ batch, resolveOffset, commitOffsetsIfNecessary, heartbeat }: EachBatchPayload) => {
        for (const message of batch.messages) {
          try {
            await heartbeat();
            console.log("//////// KAFKA TRY ", trycount + 1, "////////////////");

            const {
              userId,
              data: { email, name },
            } = JSON.parse(message.value?.toString()!);

            await createAndSendInitialOtp(userId, email, name);

            await wsConnectionManager.sendNotification(userId, "Verification mail successfully sent");

            resolveOffset(message.offset);

            await commitOffsetsIfNecessary();
          } catch (error) {
            console.log("Error processing KAFKA message:", error);
          }
        }
      },
      { autoCommit: true, useBatch: true }
    );
  } catch (error) {
    console.error("Failed to subscribe to auth events:", error);
    throw error;
  }
};
