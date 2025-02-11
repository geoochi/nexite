import Link from 'next/link'
import { PanelsTopLeft } from 'lucide-react'
import { Button } from './ui/button'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <div className='border-b px-4'>
      <div className='flex items-center justify-between mx-auto max-w-4xl h-16'>
        <Link href='/' className='flex items-center gap-2'>
        <PanelsTopLeft />
          <span className='font-bold'>Next Site</span>
        </Link>
        {session ? (
          <form
            action={async () => {
              'use server'
              await auth.api.signOut({
                headers: await headers(),
              })
              redirect('/')
            }}
          >
            <Button type='submit'>Sign Out</Button>
          </form>
        ) : (
          <Link href='/sign-in'>
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
