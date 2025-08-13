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

// products/src/config/kafka.client.ts
// import { Kafka } from "kafkajs";

// export const productKafkaClient = new Kafka({
//   clientId: "product-service",
//   brokers: [
//     "kafka-0.kafka.default.svc.cluster.local:9092",
//     "kafka-1.kafka.default.svc.cluster.local:9092",
//     "kafka-2.kafka.default.svc.cluster.local:9092",
//   ],
//   retry: {
//     retries: 10,
//     initialRetryTime: 3000,
//     maxRetryTime: 30000,
//   },
// });

// const consumer = productKafkaClient.consumer({
//   groupId: "product-service-group", // More descriptive
// });

// export const initKafka = async () => {
//   try {
//     await consumer.connect();
//     console.log("Product service Kafka consumer connected");

//     await consumer.subscribe({
//       topic: "user.created",
//     });

//     // Start consuming in background
//     consumer.run({
//       eachMessage: async ({ topic, partition, message }) => {
//         try {
//           const messageValue = message.value?.toString();
//           console.log(`Received event from topic ${topic}: ${messageValue}`);

//           // TODO: Process the user.created event
//           // const userData = JSON.parse(messageValue);
//           // await handleUserCreated(userData);
//         } catch (error) {
//           console.error(`Error processing message from ${topic}:`, error);
//         }
//       },
//     });

//     console.log("Kafka consumer started for product service");
//   } catch (error) {
//     console.error("Kafka initialization error:", error);
//     throw error;
//   }
// };
