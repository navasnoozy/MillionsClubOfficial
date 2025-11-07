//auth/src/events/publishers/pub.userCreated.ts

import { TOPICS, UserCreatedEvent } from "@millionsclub/shared-libs/server";
import { authKafkaClient } from "../../config/kafka.client";

interface userData {
  userId: string;
  name: string;
  email: string;
  data: any;
}

export const publishUserCreated = async (userData: userData) => {
  try {
    const event: UserCreatedEvent = {
      type: "user.created",
      userId: userData.userId,
      name: userData.name,
      email: userData.email,
      data: userData.data,
      timestamp: Date.now(),
    };

    await authKafkaClient.publishMessage(TOPICS.AUTH_EVENTS, event);
  } catch (error) {
    console.error("Failed to publish product created event", error);
    // Don't throw error - product creation should succeed even if event fails
  }
};
