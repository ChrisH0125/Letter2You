import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendLetterEmail = onCall(async (request) => {
  const { data, auth } = request;
  const { to, subject, text } = data;

  if (!auth) {
    throw new HttpsError("unauthenticated", "You must be signed in.");
  }

  if (!to || !text) {
    throw new HttpsError("invalid-argument", "Missing 'to' or 'text'.");
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: subject || "Your Letter",
      text,
    });

    return { success: true };
  } catch (err: any) {
    console.error("Email error:", err);
    throw new HttpsError("internal", err.message);
  }
});
