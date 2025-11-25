//order/src/config/kafka.client.ts

import { KafkaClient, KafkaConfig } from "@millionsclub/shared-libs/server";

const config: KafkaConfig = {
  clientId: "payment-service",
  brokers: [
    "kafka-0.kafka.default.svc.cluster.local:9092",
    "kafka-1.kafka.default.svc.cluster.local:9092",
    "kafka-2.kafka.default.svc.cluster.local:9092",
  ],
  groupId: "payment-consumer-group",
  useBatch:true
};

export const paymentKafkaClient = new KafkaClient(config);

export const initKafka = async () => {
  try {
    await paymentKafkaClient.getConsumer();
    await paymentKafkaClient.getProducer()
    console.log("Kafka initialized in PAYMENT service");
  } catch (error) {
    console.error("Kafka initialization error:", error);
    throw error;
  }
};

export const startKafkaConsumer = async () => {
  try {
    await paymentKafkaClient.startConsumer();
    console.log("Kafka consumer started in PAYMENT service");
  } catch (error) {
    console.error("Kafka consumer start error:", error);
    throw error;
  }
};

export const disconnectKafka = async () => {
  try {
    await paymentKafkaClient.disconnect();
    console.log("Kafka disconnected in PAYMENT service");
  } catch (error) {
    console.error("Kafka disconnection error", error);
  }
};
