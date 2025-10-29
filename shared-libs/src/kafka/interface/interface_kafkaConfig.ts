//shared-libs/src/kafka/interface/interface_kafkaConfig.ts

export interface KafkaConfig {
  clientId: string;
  brokers: string[];
  groupId?: string;
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
