import { KafkaMessage, ProductUpdatedMsg } from "@millionsclub/shared-libs/server";
import { productKafkaClient } from "../../config/kafka.client";

export const publish_product_updated = async (data: ProductUpdatedMsg) => {
  try {
    const message: KafkaMessage<"product.updated"> = {
      key: data.productId,
      value: {
        ...data,
      },
    };

    await productKafkaClient.publishMessage("product.updated", message);
  } catch (error) {
    console.error("Failed to publish product updated event", error);
  }
};
