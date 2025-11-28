//auth/src/events/publishers/pub.userCreated.ts
import { KafkaMessage } from "@millionsclub/shared-libs/server";
import { productKafkaClient } from "../../config/kafka.client";

interface Data {
  productId: string;
  title: string;
  basePrice?: string;
  variantIds?: string[];
  images?: {
    secure_url: string;
    public_id: string;
  }[];
  isActive: boolean;
}

export const publish_product_created = async (data: Data) => {
  try {
    const message: KafkaMessage<'product.created'> = {
      key: data.productId,
      value: {
        productId:data.productId,
        title:data.title,
        basePrice:data.basePrice,
        images:data.images,
        isActive:data.isActive,
        variantIds:data.variantIds,
      },
    };

    await productKafkaClient.publishMessage("product.created", message);
  } catch (error) {
    console.error("Failed to publish product created event", error);
    // Don't throw error - product creation should succeed even if event fails
  }
};
