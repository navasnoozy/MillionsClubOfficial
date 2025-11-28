// notification/src/events/publishers/user_created.ts

import { KafkaMessage } from "@millionsclub/shared-libs/server";
import { notificationKafkaClient } from "../../config/kafka-client";

export const publish_email_verified = async (Data: EmailVerified) => {
  try {
    const message: KafkaMessage<'email.verified'> = {
      key: userData.userId || userData.email,
      value: {
        email: userData.email,
      },
    };

    await notificationKafkaClient.publishMessage("email.verified", message);
  } catch (error) {
    console.error("Failed to publish email created event", error);
  }
};
