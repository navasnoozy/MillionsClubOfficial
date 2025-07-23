//auth/src/config/kafka.client.ts
import { KafkaClient, KafkaConfig } from "@millionsclub/shared-libs";

const config: KafkaConfig = {
  clientId: "auth-service",
  brokers: ["localhost:9092"],
  groupId: "auth-consumer-grop",
};

export const kafkaClient = new KafkaClient(config);

export const initKafka = async () => {
  try {
    await kafkaClient.getProducer();
    await kafkaClient.getConsumer();
  } catch (error) {
    console.error("Kafka initilization error:", error);
    throw error;
  }
};

export const disconnectKafka = async () => {
  try {
     await kafkaClient.disconnect();
      console.log("Kafka disconnected");
  } catch (error) {
    console.error(" Kafka disconnect error:", error);
  }
};
