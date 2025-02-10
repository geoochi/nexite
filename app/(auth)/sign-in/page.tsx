'use client'

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { signInFormSchema } from '@/lib/auth-schema'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const router = useRouter()
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const { email, password } = values
    const {} = authClient.signIn.email(
      {
        email,
        password,
        callbackURL: '/dashboard',
      },
      {
        onRequest: () => {},
        onSuccess: () => {
          form.reset()
        },
        onError: async ctx => {
          if (ctx.error.status === 403) {
            router.push('/verify')
          } else {
            form.setError('email', { message: ctx.error.message })
          }
        },
      }
    )
  }

  return (
    <Card className='w-full max-w-xs mx-auto'>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Welcome back! Please sign in to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='john@mail.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Enter your password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' type='submit'>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex flex-col justify-center gap-2'>
        <p className='text-sm text-muted-foreground'>
          Don&apos;t have an account yet?{' '}
          <Link href='/sign-up' className='text-primary hover:underline'>
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
