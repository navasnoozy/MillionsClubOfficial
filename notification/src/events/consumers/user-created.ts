import { EachBatchPayload } from "kafkajs";
import { wsConnectionManager } from "../..";
import { UserCreatedMsg } from "@millionsclub/shared-libs/server";
import { sendGridMail } from "../../services/send-grid-mail";
import { verifyOtpTemplate } from "../../templates/verifyOtpTemplate";
import { OTP_CONFIG } from "../../config/constants";

const handle_user_created = async ({ batch, resolveOffset, commitOffsetsIfNecessary, heartbeat }: EachBatchPayload) => {
  for (const message of batch.messages) {
    try {
      await heartbeat();

      const {  email, name, otp }: UserCreatedMsg = JSON.parse(message.value?.toString()!);

      if (otp) {
        await sendGridMail({
          to: email,
          subject: "Millionsclub email verification",
          html: verifyOtpTemplate({
            name,
            otp,
            expiryMinutes: OTP_CONFIG.EXPIRY_MINUTES,
          }),
        });

      }

      resolveOffset(message.offset);

      await commitOffsetsIfNecessary();
    } catch (error) {
      console.log("Error processing KAFKA message:", error);
      setTimeout(async () => {
        resolveOffset(message.offset);
        await commitOffsetsIfNecessary();
      }, 5000);
    }
  }
};

export default handle_user_created;

