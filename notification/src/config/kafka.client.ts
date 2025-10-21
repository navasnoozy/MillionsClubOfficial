//products/src/config/kafka.client.ts

import { KafkaClient, KafkaConfig } from "@millionsclub/shared-libs/server";

const config: KafkaConfig = {
  clientId: "notification-service",
  brokers: [
    "kafka-0.kafka.default.svc.cluster.local:9092",
    "kafka-1.kafka.default.svc.cluster.local:9092",
    "kafka-2.kafka.default.svc.cluster.local:9092",
  ],
  groupId: "notification-consumer-group",
};
export const notificationKafkaClient = new KafkaClient(config);

export const initKafka = async () => {
  try {
    await notificationKafkaClient.getConsumer();

    console.log("Kafka initialized in NOTIFICATION service");
  } catch (error) {
    console.error("Kafka initilization error in NOTIFICATION service:", error);
    throw error;
  }
};

export const disconnectKafka = async () => {
  try {
    await notificationKafkaClient.disconnect();
    console.log("Kafka disconnected in NOTIFICATION service");
  } catch (error) {
    console.error("Kafka disconnection error in NOTIFICATION service", error);
  }
};

