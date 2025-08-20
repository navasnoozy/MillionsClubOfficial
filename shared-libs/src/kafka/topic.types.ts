//shared-libs/src/kafka/topic.types.ts
// Topic definitions
export const TOPICS = {
  AUTH_EVENTS: 'auth-events',
  NOTIFICATION_EVENTS: 'notification-events',
  PRODUCT_EVENTS: 'product-events', 
} as const;

export type TopicName = typeof TOPICS[keyof typeof TOPICS];

// Message wrapper
export interface KafkaMessage<T = any> {
  topic: TopicName;
  key?: string;
  value: T;
  partition?: number;
  timestamp?: string;
  headers?: Record<string, string>;
}