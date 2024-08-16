import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";

interface EmailOption {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}

const sendMail = async (options: EmailOption): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: process.env.NODE_ENV === "production",
    auth: {
      user: "smsaikat000@gmail.com",
      pass: "zkph aedc bdsi ghdq",
    },
  });

  const { data, email, subject, template } = options;
  const templatePath = path.join(__dirname, "../mails", template);
  const html = await ejs.renderFile(templatePath, data);
  await transporter.sendMail({
      from: "smsaikat000@gmail.com",
      to: email,
      subject,
      html,
  });
};

export default sendMail
