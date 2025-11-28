// shared-libs/src/kafka/interface/interface_topic.ts

import { ProductCreatedMsg, UserCreatedMsg } from "./interface_message";

export const TOPIC_EVENTS = {
  "user.created": "user.created",
  "user.deleted": "user.deleted",
  "email.verified": "email.verified",
  "product.created": "product.created",
} as const;

export type TopicNames = keyof typeof TOPIC_EVENTS;

// Map topic → message type
export interface TopicPayloadMap {
  "user.created": UserCreatedMsg;
  "user.deleted": any;
  "email.verified": any;
  "product.created": ProductCreatedMsg;
}

// Generic Kafka message
export interface KafkaMessage<T extends TopicNames> {
  key: string;
  value: TopicPayloadMap[T];
}

