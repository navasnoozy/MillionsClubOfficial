import { ProductCreatedMsg } from "@millionsclub/shared-libs/server";
import { EachBatchPayload } from "kafkajs";
import { Product } from "../../models/productModel";

const handle_product_created = async ({ batch, resolveOffset, commitOffsetsIfNecessary, heartbeat }: EachBatchPayload) => {
  for (const message of batch.messages) {
    try {
      await heartbeat();

      const { productId, title, basePrice, images, isActive }: ProductCreatedMsg = JSON.parse(message.value?.toString()!);

      await Product.create({
        _id: productId,
        title,
        basePrice,
        images,
        isActive,
      });

      resolveOffset(message.offset);

      await commitOffsetsIfNecessary();
    } catch (error) {
      console.log("Error processing KAFKA message on product_created:", error);
    }
  }
};

export default handle_product_created;
