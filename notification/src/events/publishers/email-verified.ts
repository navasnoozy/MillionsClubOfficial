// notification/src/events/publishers/user_created.ts

import { EmailVerified, KafkaMessage } from "@millionsclub/shared-libs/server";
import { notificationKafkaClient } from "../../config/kafka-client";

export const publish_email_verified = async (data: EmailVerified) => {
  try {
    const message: KafkaMessage<"email.verified"> = {
      key: data.userId || data.email,
      value: {
        email: data.email,
      },
    };

    await notificationKafkaClient.publishMessage("email.verified", message);
  } catch (error) {
    console.error("Failed to publish email created event", error);
  }
};
