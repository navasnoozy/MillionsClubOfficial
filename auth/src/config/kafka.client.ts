//auth/src/config/kafka.client.ts
import { KafkaClient, KafkaConfig } from "@millionsclub/shared-libs/server";

const config: KafkaConfig = {
  clientId: "auth-service",
  brokers: ["kafka-0.kafka.default.svc.cluster.local:9092", "kafka-1.kafka.default.svc.cluster.local:9092", "kafka-2.kafka.default.svc.cluster.local:9092"],
  groupId: "auth-consumer-group",
  useBatch: true,
};

export const authKafkaClient = new KafkaClient(config);

export const initKafka = async () => {
  try {
    await authKafkaClient.getProducer();
    await authKafkaClient.getConsumer();
    console.log("Kafka initialized in AUTH service");
  } catch (error) {
    console.error("Kafka initilization error:", error);
    throw error;
  }
};

export const startKafkaConsumer = async () => {
  try {
    await authKafkaClient.startConsumer();
    console.log("Kafka consumer started in AUTH service");
  } catch (error) {
    console.error("Kafka consumer start error:", error);
    throw error;
  }
};

export const disconnectKafka = async () => {
  try {
    await authKafkaClient.disconnect();
    console.log("Kafka auth service disconnected");
  } catch (error) {
    console.error(" Kafka disconnection error:", error);
  }
};
