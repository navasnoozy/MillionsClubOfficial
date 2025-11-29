// notification/src/events/publishers/user_created.ts
import { EmailVerified, KafkaMessage } from "@millionsclub/shared-libs/server";
import { orderKafkaClient } from "../../config/kafka-client";
export const publish_order_placed = async (userData: EmailVerified) => {
  try {
    const message: KafkaMessage = {
      key: userData.userId || userData.email,
      value: {
        email: userData.email,
      },
    };

    await orderKafkaClient.publishMessage("email.verified", message);
  } catch (error) {
    console.error("Failed to publish product created event", error);
    // Don't throw error - product creation should succeed even if event fails
  }
};
