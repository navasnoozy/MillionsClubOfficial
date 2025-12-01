//auth/src/events/publishers/pub.userCreated.ts
import { KafkaMessage, UserCreatedMsg } from "@millionsclub/shared-libs/server";
import { authKafkaClient } from "../../config/kafka.client";

interface userData {
  userId: string;
  name: string;
  email: string;
  role: "user" | "admin" | "moderator";
  otp?: number;
}

export const publish_user_created = async (userData: UserCreatedMsg) => {
  try {
    const message: KafkaMessage<"user.created"> = {
      key: userData.userId,
      value: {
        userId: userData.userId,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        otp: userData.otp,
      },
    };

    await authKafkaClient.publishMessage("user.created", message);
  } catch (error) {
    console.error("Failed to publish user created event", error);
    // Don't throw error - user creation should succeed even if event fails
  }
};
