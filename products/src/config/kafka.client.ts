//products/src/config/kafka.client.ts

import { KafkaClient, KafkaConfig } from "@millionsclub/shared-libs";

const config: KafkaConfig = {
  clientId: "product-service",
  brokers: ["localhost:9092"],
  groupId: "product-consumer-group",
};
export const kafkaClient = new KafkaClient(config);

export const initKafka = async () => {
  try {
    await kafkaClient.getProducer();
    await kafkaClient.getConsumer();

    console.log("Kafka initialized in product service");
  } catch (error) {
    console.error("Kafka initilization error:", error);
    throw error;
  }
};
