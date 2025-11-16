//src/events/consumers/cons.authEvents.ts

import { TOPICS } from "@millionsclub/shared-libs/server";
import { EachBatchPayload } from "kafkajs";
import { notificationKafkaClient } from "../config/kafka.client";
import createAndSendInitialOtp from "../services/createAndSendOtp";
import { wsConnectionManager } from "..";
import user_created from "./consumers/user.created";

export const addKafkaEventListers = async () => {
  await notificationKafkaClient.subscribe(TOPICS.AUTH_EVENTS, user_created);
};
