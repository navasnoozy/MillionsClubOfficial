import { TOPICS, UserCreatedEvent } from "@millionsclub/shared-libs/server";
import { authKafkaClient } from "../../config/kafka.client";


interface userData {
    userId: string,
      name: string,
      email: string,
      role: "user" | "admin" | "moderator";
}

export const publishUserCreated = async (userData: userData) => {
  try {
    const event: UserCreatedEvent = {
      type: "user.created",
      userId: userData.userId,
      data: {
        name: userData.name,
        email: userData.email,
        role: userData.role
      },
      timestamp: Date.now(),
    };

    await authKafkaClient.publishMessage(TOPICS.AUTH_EVENTS, event);
  } catch (error) {
    console.error("Failed to publish product created event", error);
    // Don't throw error - product creation should succeed even if event fails
  }
};
