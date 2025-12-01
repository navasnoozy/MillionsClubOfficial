//notification/src/events/index.ts

import { orderKafkaClient } from "../config/kafka-client";
import handle_product_created from "./consumers/product-created";
import handle_product_updated from "./consumers/product-updated";
import handle_variant_created from "./consumers/variant-created";
import handle_variant_updated from "./consumers/variant-updated";

export const registerKafkaEventListers = async () => {
  await orderKafkaClient.subscribe("product.created", { fromBeginning: true }, handle_product_created);
  await orderKafkaClient.subscribe("product.updated", { fromBeginning: true }, handle_product_updated);
  await orderKafkaClient.subscribe("variant.created", { fromBeginning: true }, handle_variant_created);
  await orderKafkaClient.subscribe("variant.updated", { fromBeginning: true }, handle_variant_updated);
};
