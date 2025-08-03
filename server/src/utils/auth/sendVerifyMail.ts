// utils/sendVerificationEmail.ts
import nodemailer from "nodemailer";

const sendVerificationEmail = async (email: string, link: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Thorough - A Blog Application" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Verify your email - Thorough",
      html: `
                 <div style="font-family: 'Georgia', serif; background-color: #fdfaf6; color: #2d2d2d; padding: 40px; max-width: 600px; margin: auto; border: 1px solid #e5e0d8; border-radius: 8px;">
    <div style="border-bottom: 2px dashed #bbb; padding-bottom: 16px; margin-bottom: 24px;">
      <h1 style="font-size: 28px; margin: 0; text-align: center;">📰 Thorough Daily</h1>
      <p style="font-size: 14px; text-align: center; font-style: italic; margin: 4px 0 0;">"Words worth reading"</p>
    </div>

    <h2 style="font-size: 22px; margin-bottom: 12px;">Welcome to <strong>Thorough</strong>,</h2>
    <p style="font-size: 16px; line-height: 1.6;">
      Thank you for joining our thoughtful corner of the internet. Before we begin your journey,
      please confirm your email address by clicking the link below.
    </p>

    <div style="margin: 30px 0; text-align: center;">
      <a href="${link}" 
         style="background-color: #2d2d2d; color: #fff; padding: 12px 20px; border-radius: 4px; text-decoration: none; font-size: 16px;">
        ✅ Verify My Email
      </a>
    </div>

    <p style="font-size: 14px; line-height: 1.5; color: #555;">
      If the button doesn't work, you can also paste this link in your browser:<br/>
      <a href="${link}" style="color: #333; text-decoration: underline;">${link}</a>
    </p>

    <div style="border-top: 1px dashed #ccc; margin-top: 40px; padding-top: 16px; font-size: 12px; color: #888;">
      <p style="margin: 0;">Thorough Blog • Estd. 2024</p>
      <p style="margin: 0;">Bringing back the lost charm of meaningful writing.</p>
    </div>
  </div>
            `,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    // Handle the error appropriately (e.g., throw an error, log to a file, etc.)
    throw new Error("Failed to send verification email."); // Or handle differently
  }
};

export default sendVerificationEmail;
