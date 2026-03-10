'use client'

import { ThemeProvider } from '../context/ThemeContext'
import { DemoProvider } from '../context/DemoContext'

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <DemoProvider>{children}</DemoProvider>
    </ThemeProvider>
  )
}
