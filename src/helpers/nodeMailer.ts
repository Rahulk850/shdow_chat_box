

import { ApiResponse } from "@/types/ApiResponse";
import nodemailer,{ Transporter } from "nodemailer";

const transporter: Transporter = nodemailer.createTransport({
    service: "gmail", // You can change this based on your email service provider
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
    port: 465, // SMTP over SSL/TLS
    secure: true, 
  });
//   console.log("transporter",transporter)
export async function sendVerificationEmailbyNodemail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const mailOptions = {
        from: process.env.EMAIL_USER, // Your email address
        to: email, // Recipient's email address
        subject: "Otp for Shadow chat",
        text: `Hello ${username} Your OTP is ${verifyCode}. It is valid for 5 minutes.`,
      };
      console.log('mail options --', mailOptions)
      await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending verification email",error);
    return { success: false, message: "Error sending verification email" };
  }
}
