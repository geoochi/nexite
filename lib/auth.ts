import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from './prisma'
import { sendEmail } from '@/lib/email'

export const auth = betterAuth({
  trustedOrigins: [process.env.BETTER_AUTH_URL!],
  database: prismaAdapter(prisma, { provider: 'sqlite' }),
  emailAndPassword: { enabled: true, requireEmailVerification: true },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        text: url,
      })
    },
  },
})
