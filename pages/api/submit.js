import axios from "axios";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const { childId, message } = req.body;

  try {
    const userResponse = await axios.get(
      "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json"
    );
    const profileResponse = await axios.get(
      "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json"
    );

    const users = userResponse.data;
    const profiles = profileResponse.data;

    const user = users.find((u) => u.username === childId);

    if (!user) {
      return res.status(400).json("Child is not registered");
    }
    const profile = profiles.find((p) => p.userUid === user.uid);

    if (isChildOlder10(profile.birthdate)) {
      return res.status(400).json("Child more than 10 years old");
    }

    const response = {
      username: user.username,
      address: profile.address,
      message,
    };

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: "do_not_reply@northpole.com",
      to: "santa@northpole.com",
      subject: "New Santa Request",
      text: `Child Username: ${response.username}\nChild Address: ${response.address}\nRequest: ${response.message}`,
    });

    console.log("Email sent:", info.messageId);

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error submitting form:", error);
    return res.status(500).send("Internal Server Error");
  }
}

function isChildOlder10(birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  const ageDiff = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (ageDiff < 10) {
    return false;
  } else if (ageDiff === 10 && monthDiff <= 0) {
    return false;
  } else {
    return true;
  }
}
