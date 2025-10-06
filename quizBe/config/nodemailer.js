import dotenv from "dotenv";

import nodemailer from "nodemailer";

dotenv.config({path: "../.env"});

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

console.log(process.env, "????");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
  secure: true,
  port: 465,
});

async function sendEmail(recipients, subject, htmlContent) {
  try {
    await transporter.sendMail({
      from: `"VMS" <${EMAIL_USER}>`,
      to: recipients.join(","),
      subject,
      html: htmlContent,
    });
    console.log(`Email sent to: ${recipients.join(", ")}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export async function sendEmailNotification(emails, subject, html) {
  await sendEmail(emails, subject, html);
}

sendEmailNotification(
  ["rohitjoshi@tractorjunction.com"],
  "Hello I am there",
  `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #333;">Hello from VMS 👋</h1>
          <p style="font-size: 16px; color: #555;">
            Here's a helpful link for you:<br />
            <a href="https://example.com" style="color: #1a73e8; text-decoration: underline;">https://example.com</a>
          </p>

          <p style="font-size: 16px; color: #333;">
            Your OTP is: <strong>928371</strong>
          </p>

          <hr style="margin-top: 30px;"/>
          <p style="font-size: 12px; color: #aaa; text-align: center;">
            &copy; 2025 VMS. All rights reserved.
          </p>
        </div>
      </body>
    </html>
  `
);
