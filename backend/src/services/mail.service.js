import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAUTH2",
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_PASSWORD,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  // logger: true,
  // debug: true,
});

transporter
  .verify()
  .then(() => {
    console.log("Email transporter is ready to send emails");
  })
  .catch((err) => {
    console.log("Email transporter verification failed", err);
  });

export async function sendEmail({ to, subject, html, text }) {
  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text,
  };

  try {
    const details = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", details);
    return details;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}
