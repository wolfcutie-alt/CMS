"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { PublicLayout } from "@/components/public-layout"

export default function LandingPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/content/public")
  }, [router])

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    </PublicLayout>
  )
}
