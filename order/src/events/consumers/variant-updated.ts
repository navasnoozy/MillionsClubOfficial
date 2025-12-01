import { VariantUpdatedMsg } from "@millionsclub/shared-libs/server";
import { EachBatchPayload } from "kafkajs";
import { ProductVariant } from "../../models/prodVariantModel";

const handle_variant_updated = async ({ batch, resolveOffset, commitOffsetsIfNecessary, heartbeat }: EachBatchPayload) => {
  for (const message of batch.messages) {
    try {
      await heartbeat();

      const { variantId: _id, size, price, quantity, isActive }: VariantUpdatedMsg = JSON.parse(message.value?.toString()!);

      await ProductVariant.findByIdAndUpdate(
        { _id },
        {
          size,
          price,
          quantity,
          isActive,
        }
      );

      resolveOffset(message.offset);

      await commitOffsetsIfNecessary();
    } catch (error) {
      console.log("Error processing KAFKA message:", error);
    }
  }
};

export default handle_variant_updated;
