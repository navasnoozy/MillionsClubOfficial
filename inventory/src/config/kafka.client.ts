//products/src/config/kafka.client.ts

import { KafkaClient, KafkaConfig } from "@millionsclub/shared-libs/server";

const config: KafkaConfig = {
  clientId: "inventory-service",
  brokers: ["kafka-0.kafka.default.svc.cluster.local:9092", "kafka-1.kafka.default.svc.cluster.local:9092", "kafka-2.kafka.default.svc.cluster.local:9092"],
  groupId: "inventory-consumer-group",
  useBatch: true,
};
export const inventoryKafkaClient = new KafkaClient(config);

export const initKafka = async () => {
  try {
    await inventoryKafkaClient.getProducer();
    await inventoryKafkaClient.getConsumer();

    console.log("Kafka initialized in INVENTORY service");
  } catch (error) {
    console.error("Kafka initilization error:", error);
    throw error;
  }
};

export const startKafkaConsumer = async () => {
  try {
    await inventoryKafkaClient.startConsumer();
    console.log("Kafka consumer started in PRODUCT service");
  } catch (error) {
    console.error("Kafka consumer start error:", error);
    throw error;
  }
};

export const disconnectKafka = async () => {
  try {
    await inventoryKafkaClient.disconnect();
    console.log("Kafka product service disconnected");
  } catch (error) {
    console.error("Kafka disconnection error", error);
  }
};
