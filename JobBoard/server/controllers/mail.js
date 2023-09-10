import nodemailer from 'nodemailer'

// Create a transporter for sending emails
const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "khushidjobanputra77@gmail.com",
        pass: "vljupkaifhaeqfqp"
    }
});

export const sendEmail = async(req, res) =>{
  try {
    const { to, subject, text } = req.body;

    // Setup email data
    const mailOptions = {
      from: 'khushidjobanputra77@gmail.com',
      to,                     // Recipient's email address
      subject,                // Email subject
      text,                   // Email body text
    };

    await mailTransporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
