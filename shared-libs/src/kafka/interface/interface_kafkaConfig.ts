//shared-libs/src/kafka/interface/interface_kafkaConfig.ts

export interface KafkaConfig {
  clientId: string;
  brokers: string[];
  groupId?: string;
  useBatch?: boolean
}

export interface SubscriptionOptions {
  autoCommit?: boolean;
  autoCommitInterval?: number;
  autoCommitThreshold?: number;
  eachBatchAutoResolve?: boolean;
}

