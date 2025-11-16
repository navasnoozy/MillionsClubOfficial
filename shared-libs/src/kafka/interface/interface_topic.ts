//shared-libs/src/kafka/interface/interface_topic.ts
// Topic definitions

import { AllMessages } from "./interface_message";

const AUTH_EVENTS = { user_created: "user_created", user_deleted: "user_deleted" } as const;
const NOTIFICATION_EVENTS = { user_verified: "email_verified" } as const;
const PRODUCT_EVENTS = { product_created: "product_created" } as const;

const ALL_EVENTS = { ...AUTH_EVENTS, ...NOTIFICATION_EVENTS, ...PRODUCT_EVENTS } as const;
export type TopicNames = (typeof ALL_EVENTS)[keyof typeof ALL_EVENTS];

export interface KafkaMessage {
  key: string;
  value: AllMessages;
  timestamp: string | number;
  partition?: number;
}
