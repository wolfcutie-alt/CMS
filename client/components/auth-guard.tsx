"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated")
      const isAuthPage = pathname.startsWith("/auth")

      if (authStatus === "true") {
        setIsAuthenticated(true)
        // If user is authenticated and on auth page, redirect to dashboard
        if (isAuthPage) {
          router.push("/")
        }
      } else {
        setIsAuthenticated(false)
        // If user is not authenticated and not on auth page, redirect to login
        if (!isAuthPage) {
          router.push("/auth/login")
        }
      }
    }

    checkAuth()
  }, [pathname, router])

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Show auth pages without guard
  if (pathname.startsWith("/auth")) {
    return <>{children}</>
  }

  // Show protected content only if authenticated
  if (isAuthenticated) {
    return <>{children}</>
  }

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  )
}
