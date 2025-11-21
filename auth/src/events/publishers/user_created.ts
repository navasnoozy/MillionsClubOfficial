//auth/src/events/publishers/pub.userCreated.ts
import { KafkaMessage } from "@millionsclub/shared-libs/server";
import { authKafkaClient } from "../../config/kafka.client";

interface userData {
  userId: string;
  name: string;
  email: string;
  role: "user" | "admin" | "moderator";
}

export const publish_user_created = async (userData: userData) => {
  try {
    const message: KafkaMessage = {
      key: userData.userId,
      value: {
        userId: userData.userId,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
    };

    await authKafkaClient.publishMessage("user.created", message);
  } catch (error) {
    console.error("Failed to publish product created event", error);
    // Don't throw error - product creation should succeed even if event fails
  }
};
