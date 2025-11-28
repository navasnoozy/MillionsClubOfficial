//auth/src/events/publishers/pub.userCreated.ts
import { KafkaMessage, ProductCreatedMsg } from "@millionsclub/shared-libs/server";
import { productKafkaClient } from "../../config/kafka.client";


export const publish_product_updated = async (data: ProductCreatedMsg) => {
  try {
    const message: KafkaMessage<"product.created"> = {
      key: data.productId,
      value: {
        productId: data.productId,
        title: data.title,
        basePrice: data.basePrice,
        images: data.images,
        isActive: data.isActive,
        variantIds: data.variantIds,
      },
    };

    await productKafkaClient.publishMessage("product.created", message);
  } catch (error) {
    console.error("Failed to publish product updated event", error);
  }
};
