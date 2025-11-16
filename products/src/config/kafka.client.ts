//products/src/config/kafka.client.ts

import { KafkaClient, KafkaConfig } from "@millionsclub/shared-libs/server";

const config: KafkaConfig = {
  clientId: "product-service",
  brokers: [
    "kafka-0.kafka.default.svc.cluster.local:9092",
    "kafka-1.kafka.default.svc.cluster.local:9092",
    "kafka-2.kafka.default.svc.cluster.local:9092",
  ],
  groupId: "product-consumer-group",
};
export const productKafkaClient = new KafkaClient(config);

export const initKafka = async () => {
  try {
    await productKafkaClient.getProducer();
    await productKafkaClient.getConsumer();

    console.log("Kafka initialized in PRODUCT service");
  } catch (error) {
    console.error("Kafka initilization error:", error);
    throw error;
  }
};

export const disconnectKafka = async () => {
  try {
    await productKafkaClient.disconnect();
    console.log("Kafka product service disconnected");
  } catch (error) {
    console.error("Kafka disconnection error", error);
  }
};
