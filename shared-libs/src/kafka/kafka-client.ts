//shared-libs/src/kafka/kafka-client.ts

import { Consumer, Kafka, Producer, EachBatchHandler, EachMessageHandler } from "kafkajs";
import { KafkaConfig, SubscriptionOptions } from "./interface/interface_kafkaConfig";
import { TopicNames } from "../server";
import { KafkaMessage } from "./interface/interface_topic";

export class KafkaClient {
  private kafka: Kafka;
  private producer: Producer | null = null;
  private consumer: Consumer | null = null;
  private config: KafkaConfig;
  private hasRunStarted = false;

  // storing handler into object
  private batchHandlers: Record<string, EachBatchHandler> = {};
  private messageHandlers: Record<string, EachMessageHandler> = {};

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

  async publishMessage(topic: TopicNames, message: KafkaMessage): Promise<void> {
    const producer = await this.getProducer();
    await producer.send({
      topic,
      messages: [
        {
          key: message.key,
          value: JSON.stringify(message.value),
        },
      ],
    });
  }

  async subscribe(topic: TopicNames, handler: EachMessageHandler | EachBatchHandler, options?: SubscriptionOptions): Promise<void> {
    const consumer = await this.getConsumer();
    await consumer.subscribe({ topic });
    // store handlers only — NOT RUN HERE

    if (this.config.useBatch) {
      this.batchHandlers[topic] = handler as EachBatchHandler;
    } else {
      this.messageHandlers[topic] = handler as EachMessageHandler;
    }
  }

  // only ONE run loop
  async startConsumer(): Promise<void> {

    if (this.hasRunStarted) return;
    this.hasRunStarted = true;

    const consumer = await this.getConsumer();

    if (this.config.useBatch) {
      await consumer.run({
        autoCommit: false,
        eachBatch: async (payload) => {
          const handler = this.batchHandlers[payload.batch.topic];
          if (handler) return handler(payload);
        },
      });
    } else {
      await consumer.run({
        autoCommit: false,
        eachMessage: async (payload) => {
          const handler = this.messageHandlers[payload.topic];
          if (handler) return handler(payload);
        },
      });
    }
  }
  // -------------------------------------

  async disconnect(): Promise<void> {
    if (this.producer) {
      await this.producer.disconnect();
    }
    if (this.consumer) {
      await this.consumer.disconnect();
    }
  }
}
