//shared-libs/src/kafka/interface/interface_kafkaConfig.ts
import { EachMessagePayload } from "kafkajs";

export interface KafkaConfig {
  clientId: string;
  brokers: string[];
  groupId?: string;
}

export interface MessageHandler {
  (payload: EachMessagePayload): Promise<void>;
}

// Add this new interface
export interface SubscriptionOptions {
  autoCommit?: boolean;
  autoCommitInterval?: number;
  autoCommitThreshold?: number;
}

export interface BaseEvent {
  timestamp: number;
  eventId?: string;
}
