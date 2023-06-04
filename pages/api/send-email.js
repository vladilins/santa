import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const { username, address, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "odie.herzog@ethereal.email",
        pass: "Ag2ysJMN5Tpp6MjDDk",
      },
    });

    const info = await transporter.sendMail({
      from: "do_not_reply@northpole.com",
      to: "santa@northpole.com",
      subject: "New Santa Request",
      text: `Child Username: ${username}\nChild Address: ${address}\nRequest: ${message}`,
    });

    console.log("Email sent:", info.messageId);

    // Return success response
    return res.status(200).send("Email sent");
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).send("Internal Server Error");
  }
}
