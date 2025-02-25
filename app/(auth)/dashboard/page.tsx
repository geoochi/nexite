import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import LandingPageAi from '@/components/landing-page-ai'

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return redirect('/sign-in')
  }

  const user = session.user
  return (
    // <div className='flex-col space-y-4'>
    //   <h1 className='text-2xl font-bold'>Welcome to Dashboard</h1>
    //   <ul>
    //     <li>Name: {user.name}</li>
    //     <li>Email: {user.email}</li>
    //   </ul>
    // </div>
    <LandingPageAi />
  )
}
