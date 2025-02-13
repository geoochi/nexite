'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant='default'
      size='icon'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className='h-[1.2rem] w-[1.2rem] scale-0 transition-all dark:scale-100' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-100 transition-all dark:scale-0' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
