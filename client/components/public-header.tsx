"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, LogIn, UserPlus } from "lucide-react"
import Link from "next/link"

export function PublicHeader() {
  return (
    <header className="bg-gradient-to-r from-white to-slate-50 border-b border-slate-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
            <Input
              placeholder="Search content..."
              className="pl-10 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/auth/login">
            <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
