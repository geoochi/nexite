import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  text: string
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_MY_EMAIL_ADDRESS,
    pass: process.env.EMAIL_MY_EMAIL_PASSWORD,
  },
})

export async function sendEmail({ to, subject, text }: EmailOptions) {
  await transporter.sendMail({
    from: `${process.env.EMAIL_MY_EMAIL_NAME} <${process.env.EMAIL_MY_EMAIL_ADDRESS}>`,
    to,
    subject,
    text,
  })
}
