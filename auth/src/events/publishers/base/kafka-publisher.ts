import { authKafkaClient } from "../../../config/kafka.client";

export abstract class KafkaPublisher<T> {
  abstract topic: string;

  async publish(data: T, key?: string): Promise<void> {
    await authKafkaClient.publishMessage(this.topic, data, key);
    console.log(`[KafkaPublisher] Published to topic: ${this.topic}`);
  }
}
