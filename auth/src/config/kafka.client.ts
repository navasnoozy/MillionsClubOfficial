//auth/src/config/kafka.client.ts
// import { KafkaClient, KafkaConfig } from "@millionsclub/shared-libs";



// const config: KafkaConfig = {
//   clientId: "auth-service",
//   brokers: ["kafka-0.kafka.default.svc.cluster.local:9092"],
//   groupId: "auth-consumer-group",
// };

// export const authKafkaClient = new KafkaClient(config);

// export const initKafka = async () => {
//   try {
//     await authKafkaClient.getProducer();
//     await authKafkaClient.getConsumer();
//     console.log("Kafka initialized in auth service");
//   } catch (error) {
//     console.error("Kafka initilization error:", error);
//     throw error;
//   }
// };

// export const disconnectKafka = async () => {
//   try {
//     await authKafkaClient.disconnect();
//     console.log("Kafka auth service disconnected");
//   } catch (error) {
//     console.error(" Kafka disconnection error:", error);
//   }
// };

import { Kafka } from "kafkajs";

export const authKafka = new Kafka({
  clientId: "auth-service",
  brokers: [
  "kafka-0.kafka.default.svc.cluster.local:9092",
  "kafka-1.kafka.default.svc.cluster.local:9092", 
  "kafka-2.kafka.default.svc.cluster.local:9092"
],
  retry : {
    retries: 10,
    initialRetryTime: 3000,
    maxRetryTime:30000,
  }
});

export const producer = authKafka.producer();

export const initKafka = async () => {
  try {
    await producer.connect();
    console.log("auth kafka producer connected");
  } catch (error) {
     console.log("error in auth kafka init", error);
    throw error; // Re-throw to stop server startup on Kafka failure
  }
}
