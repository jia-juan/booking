'use client'

import { useState } from 'react'
import Sidebar from '@/app/components/layouts/shared/sidebar';
import Header from '@/app/components/layouts/shared/header';
import Footer from '@/app/components/layouts/shared/footer';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-full">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* 主內容區域，桌面裝置有左側內邊距以避免被側邊欄遮蓋 */}
      <div className="flex flex-col flex-1 lg:pl-72">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <Footer /> {/* 添加 Footer 元件 */}
      </div>
    </div>
  )
}
