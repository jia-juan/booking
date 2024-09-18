import '@/app/styles/globals.css'
import LayoutClient from './components/layouts/shared/LayoutClient'

export const metadata = {
  title: '您的網站標題',
  description: '您的網站描述',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="h-full bg-white">
        <LayoutClient>
          {children}
        </LayoutClient>
      </body>
    </html>
  )
}