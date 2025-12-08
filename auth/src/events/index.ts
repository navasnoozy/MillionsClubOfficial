//auth/src/events/index.ts

import { authKafkaClient } from "../config/kafka.client";

export const registerKafkaEventListeners = async () => {
  // No consumers needed - Auth service now handles all OTP logic directly
};

