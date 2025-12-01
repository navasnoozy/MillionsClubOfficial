import { VariantCreatedMsg } from "@millionsclub/shared-libs/server";
import { EachBatchPayload } from "kafkajs";
import { ProductVariant } from "../../models/prodVariantModel";

const handle_variant_created = async ({ batch, resolveOffset, commitOffsetsIfNecessary, heartbeat }: EachBatchPayload) => {
  for (const message of batch.messages) {
    try {
      await heartbeat();

      const { variantId, productId, size, price, quantity, isActive }: VariantCreatedMsg = JSON.parse(message.value?.toString()!);

      await ProductVariant.create({
        _id:variantId,
        productId,
        size,
        price,
        quantity,
        isActive
      })

      resolveOffset(message.offset);

      await commitOffsetsIfNecessary();
    } catch (error) {
      console.log("Error processing KAFKA message on Variant creation", error);
    }
  }
};

export default handle_variant_created;
