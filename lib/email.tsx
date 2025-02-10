import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailOptions {
  to: string
  subject: string
  text: string
}

interface EmailTemplateProps {
  text: string
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ text: url }) => (
  <>
    <p>Click the link below to verify your email:</p>
    <button className='bg-[#70b1f5] text-white px-6 py-2 rounded w-[120px] h-[50px]'>
      <a className='no-underline text-white text-2xl' href={url}>
        Verify
      </a>
    </button>
  </>
)

export async function sendEmail({ to, subject, text: url }: EmailOptions) {
  console.log(`to: ${to}\nsubject: ${subject}\ntext: ${url}`)
  try {
    const { data, error } = await resend.emails.send({
      from: `${process.env.EMAIL_MY_EMAIL_NAME} <${process.env.EMAIL_MY_EMAIL_ADDRESS}>`,
      to: [to],
      subject: subject,
      react: <EmailTemplate text={url} />,
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (err) {
    return Response.json({ error: err }, { status: 500 })
  }
}
