//src/events/consumers/cons.authEvents.ts

import { TOPICS } from "@millionsclub/shared-libs/server";
import { EachBatchPayload } from "kafkajs";
import { notificationKafkaClient } from "../../config/kafka.client";
import notifyUser from "../../WebSocket/helper/notifyUser";
import { createAndSendInitialOtp } from "../../services/createAndSendOtp";

export const subscribeToAuthEvents = async () => {
  try {
    await notificationKafkaClient.subscribe(
      TOPICS.AUTH_EVENTS,
      async ({
        batch,
        resolveOffset,
        commitOffsetsIfNecessary,
        heartbeat,
      }: EachBatchPayload) => {
        for (const message of batch.messages) {
          try {
            const {
              userId,
              data: { email, name },
            } = JSON.parse(message.value?.toString()!);

            await createAndSendInitialOtp(userId, email, name);

            await notifyUser(userId, "Verification mail successfully sent");

            resolveOffset(message.offset);
          } catch (error) {
            console.log("Error processing message:", error);
          }
        }
        await heartbeat();
        await commitOffsetsIfNecessary();
      },
      { autoCommit: false, useBatch: true }
    );
  } catch (error) {
    console.error("Failed to subscribe to auth events:", error);
    throw error;
  }
};
