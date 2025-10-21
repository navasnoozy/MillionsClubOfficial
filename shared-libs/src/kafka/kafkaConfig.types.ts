//shared-libs/src/kafka/kafkaConfig.types.ts
import { EachMessagePayload } from "kafkajs";

export interface KafkaConfig {
  clientId: string;
  brokers: string[];
  groupId?: string;
}

export interface MessageHandler {
  (payload: EachMessagePayload): Promise<void>;
}

export interface BaseEvent {
  timestamp: number;
  eventId?: string;
}