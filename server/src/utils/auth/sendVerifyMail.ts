// utils/sendVerificationEmail.ts
import nodemailer from "nodemailer";

const sendVerificationEmail = async (email: string, link: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Consider using a dedicated ESP in production
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Public Blog" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Verify your email",
      html: `
                <h2>Welcome to Public Blog</h2>
                <p>Click the link below to verify your email:</p>
                <a href="${link}">Verify Email</a>
            `,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    // Handle the error appropriately (e.g., throw an error, log to a file, etc.)
    throw new Error("Failed to send verification email."); // Or handle differently
  }
};

export default sendVerificationEmail;
