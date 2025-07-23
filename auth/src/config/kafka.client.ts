//auth/src/config/kafka.client.ts
import { KafkaClient, KafkaConfig } from "@millionsclub/shared-libs";

const config: KafkaConfig = {
  clientId: "auth-service",
  brokers: ["localhost:9092"],
  groupId: "auth-consumer-grop",
};

export const authKafkaClient = new KafkaClient(config);

export const initKafka = async () => {
  try {
    await authKafkaClient.getProducer();
    await authKafkaClient.getConsumer();
  } catch (error) {
    console.error("Kafka initilization error:", error);
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
