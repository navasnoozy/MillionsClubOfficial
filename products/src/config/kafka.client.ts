//products/src/config/kafka.client.ts

import { KafkaClient, KafkaConfig } from "@millionsclub/shared-libs";

const config: KafkaConfig = {
  clientId: "product-service",
  brokers: ["localhost:9092"],
  groupId: "product-consumer-group",
};
export const productKafkaClient = new KafkaClient(config);

export const initKafka = async () => {
  try {
    await productKafkaClient.getProducer();
    await productKafkaClient.getConsumer();

    console.log("Kafka initialized in product service");
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
