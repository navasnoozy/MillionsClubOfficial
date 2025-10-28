//shared-libs/src/kafka/interface/interface_kafkaConfig.ts
import { EachBatchPayload, EachMessagePayload } from "kafkajs";

export interface KafkaConfig {
  clientId: string;
  brokers: string[];
  groupId?: string;
}

export interface MessageHandler {
  (payload: EachMessagePayload): Promise<void>;
}

export interface EachBatchHandler {
  (payload: EachBatchPayload): Promise<void>;
}

export interface SubscriptionOptions {
  autoCommit?: boolean;
  autoCommitInterval?: number;
  autoCommitThreshold?: number;
  useBatch?: boolean;
}

export interface BaseEvent {
  timestamp: number;
  eventId?: string;
}
