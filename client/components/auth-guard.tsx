"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated")
      const isAuthPage = pathname.startsWith("/auth")
      const isLandingPage = pathname === "/landing"
      const isPublicContentPage = pathname.startsWith("/content") && (
        pathname === "/content" || 
        pathname.match(/^\/content\/\d+$/) || // matches /content/123 but not /content/123/edit
        pathname === "/content/public" ||
        pathname.match(/^\/content\/\d+\/public$/) // matches /content/123/public
      )

      if (authStatus === "true") {
        setIsAuthenticated(true)
        // If user is authenticated and on auth page, redirect to dashboard
        if (isAuthPage) {
          router.push("/")
        }
      } else {
        setIsAuthenticated(false)
        // If user is not authenticated and not on auth page, landing page, or public content page, redirect to landing
        if (!isAuthPage && !isLandingPage && !isPublicContentPage) {
          router.push("/landing")
        }
      }
    }

    checkAuth()
  }, [pathname, router, isHydrated])

  // Show loading while hydrating or checking authentication
  if (!isHydrated || isAuthenticated === null) {
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

  // Show landing page without authentication
  if (pathname === "/landing") {
    return <>{children}</>
  }

  // Show public content pages without authentication
  const isPublicContentPage = pathname.startsWith("/content") && (
    pathname === "/content" || 
    pathname.match(/^\/content\/\d+$/) || // matches /content/123 but not /content/123/edit
    pathname === "/content/public" ||
    pathname.match(/^\/content\/\d+\/public$/) // matches /content/123/public
  )
  
  if (isPublicContentPage) {
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
