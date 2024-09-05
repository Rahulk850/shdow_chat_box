import { resend } from "@/lib/resend";

import VerificationEmails from "../../emails/verificationEmails";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'shadow-chat Verification Code',
        react: VerificationEmails({username,otp:verifyCode})
      });
    return { success: true, message: "Email sent successfully" };
  } catch (emailError) {
    console.error("Error sending verification email,emailError: " + emailError);
    return { success: false, message: "Error sending verification email" };
  }
}
