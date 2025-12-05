import { KafkaMessage, ProductCreatedMsg } from "@millionsclub/shared-libs/server";
import { inventoryKafkaClient } from "../../config/kafka.client";

export const publish_product_created = async (data: ProductCreatedMsg) => {
  try {
    const message: KafkaMessage<"product.created"> = {
      key: data.productId,
      value: {
        ...data,
      },
    };

    await inventoryKafkaClient.publishMessage("product.created", message);
  } catch (error) {
    console.error("Failed to publish product created event", error);
  }
};
