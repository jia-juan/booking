// todo 進行 session 驗證切換用戶，之後使用 componenets/layouts/main-layout.tsx 和 auth-layout.tsx 做不同認證的頁面 layout 
'use client'

import { useState } from 'react'
import Sidebar from './sidebar'
import Header from './header'
import AuthProvider from '@/app/libs/helpers/auth-provider'
import Footer from "@/app/components/layouts/shared/footer"
import AppQueryClientProvider from '@/app/libs/providers/QueryClientProvider'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AppQueryClientProvider>
      <div className="flex h-full">
        <AuthProvider>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="flex flex-col flex-1 lg:pl-72">
            <Header setSidebarOpen={setSidebarOpen} />
            <main className="py-10">
              <div className="px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </div>
    </AppQueryClientProvider>
  )
}
