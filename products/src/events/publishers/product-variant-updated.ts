import { KafkaMessage, VariantUpdatedMsg } from "@millionsclub/shared-libs/server";
import { productKafkaClient } from "../../config/kafka.client";

export const publish_product_variant_updated = async (data: VariantUpdatedMsg) => {
  try {
    const message: KafkaMessage<"variant.updated"> = {
      key: data.variantId,
      value: {
        ...data,
      },
    };

    await productKafkaClient.publishMessage("variant.updated", message);
  } catch (error) {
    console.error("Failed to publish Prod Variant updated event", error);
  }
};
