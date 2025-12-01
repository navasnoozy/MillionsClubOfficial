import { ProductUpdatedMsg } from "@millionsclub/shared-libs/server";
import { EachBatchPayload } from "kafkajs";
import { Product } from "../../models/productModel";

const handle_product_updated = async ({ batch, resolveOffset, commitOffsetsIfNecessary, heartbeat }: EachBatchPayload) => {
  for (const message of batch.messages) {
    try {
      await heartbeat();

      const { productId: _id, title, basePrice, images, isActive }: ProductUpdatedMsg = JSON.parse(message.value?.toString()!);

      await Product.findByIdAndUpdate(
        { _id },
        {
          title,
          basePrice,
          images,
          isActive,
        }
      );

      resolveOffset(message.offset);

      await commitOffsetsIfNecessary();
    } catch (error) {
      console.log("Error processing KAFKA message on product_updated", error);
    }
  }
};

export default handle_product_updated;
