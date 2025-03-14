export default function Verify() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex-col space-y-4 text-center'>
        <h1 className='text-3xl font-bold'>Verification email sent</h1>
        <hr />
        <p className='text-sm text-muted-foreground'>
          Please check your email for verification
        </p>
      </div>
    </div>
  )
}
