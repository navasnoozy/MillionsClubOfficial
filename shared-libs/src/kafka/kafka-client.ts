//shared-libs/src/kafka/kafka-client.ts

import { Consumer, Kafka, Producer } from "kafkajs";
import {
  KafkaConfig,
  MessageHandler,
  SubscriptionOptions,
} from "./interface/interface_kafkaConfig";
import { TopicName } from "./interface/interface_topic";

export class KafkaClient {
  private kafka: Kafka;
  private producer: Producer | null = null;
  private consumer: Consumer | null = null;
  private config: KafkaConfig;

  constructor(config: KafkaConfig) {
    this.config = config;
    this.kafka = new Kafka({
      clientId: config.clientId,
      brokers: config.brokers,
      retry: {
        retries: 10,
        initialRetryTime: 3000,
        maxRetryTime: 30000,
      },
    });
  }

  async getProducer(): Promise<Producer> {
    if (!this.producer) {
      this.producer = this.kafka.producer();
      await this.producer.connect();
    }
    return this.producer;
  }

  async getConsumer(): Promise<Consumer> {
    if (!this.consumer && this.config.groupId) {
      this.consumer = this.kafka.consumer({ groupId: this.config.groupId });
      await this.consumer.connect();
    }
    if (!this.consumer) {
      throw new Error("Consumer requires group Id in config");
    }
    return this.consumer;
  }

  async publishMessage<T>(
    topic: TopicName,
    message: T,
    key?: string
  ): Promise<void> {
    const producer = await this.getProducer();

    await producer.send({
      topic,
      messages: [
        {
          key,
          value: JSON.stringify(message),
        },
      ],
    });
  }

  async subscribe(
    topic: TopicName,
    handler: MessageHandler,
    options?: SubscriptionOptions
  ): Promise<void> {
    const consumer = await this.getConsumer();
    await consumer.subscribe({ topic });

    await consumer.run({
      autoCommit: options?.autoCommit ?? true,
      autoCommitInterval: options?.autoCommitInterval,
      autoCommitThreshold: options?.autoCommitThreshold,
      eachMessage: handler,
    });
  }

  async disconnect(): Promise<void> {
    if (this.producer) {
      await this.producer.disconnect();
    }
    if (this.consumer) {
      await this.consumer.disconnect();
    }
  }
}
