import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "huzanggelo0904@gmail.com",
      pass: "epmt khoe vrpe wnux",
    },
  });

export default transporter;