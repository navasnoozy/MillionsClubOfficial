import { KafkaMessage, VariantCreatedMsg } from "@millionsclub/shared-libs/server";
import { productKafkaClient } from "../../config/kafka.client";

export const publish_product_variant_created = async (data: VariantCreatedMsg) => {
  try {
    const message: KafkaMessage<"variant.created"> = {
      key: data.productId,
      value: {
        ...data,
      },
    };

    await productKafkaClient.publishMessage("variant.created", message);
  } catch (error) {
    console.error("Failed to publish Prod variant created event", error);
  }
};
