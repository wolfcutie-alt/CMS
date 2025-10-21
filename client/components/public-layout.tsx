"use client"

import type React from "react"
import { PublicHeader } from "@/components/public-header"

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <PublicHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
