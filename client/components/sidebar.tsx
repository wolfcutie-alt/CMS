"use client"

import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Users, Settings, BarChart3, Tags, ImageIcon, MessageSquare } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
      color: "text-blue-400",
    },
    {
      title: "Content",
      icon: FileText,
      href: "/content",
      color: "text-green-400",
    },
    {
      title: "Media",
      icon: ImageIcon,
      href: "/media",
      color: "text-purple-400",
    },
    {
      title: "Categories",
      icon: Tags,
      href: "/categories",
      color: "text-yellow-400",
    },
    {
      title: "Comments",
      icon: MessageSquare,
      href: "/comments",
      color: "text-pink-400",
    },
    {
      title: "Users",
      icon: Users,
      href: "/users",
      color: "text-indigo-400",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      color: "text-orange-400",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
      color: "text-red-400",
    },
  ]

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 flex flex-col shadow-xl">
      <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-blue-600 to-purple-600">
        <h1 className="text-xl font-bold text-white">CMS Admin</h1>
        <p className="text-sm text-blue-100">Content Management</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "text-slate-300 hover:text-white hover:bg-slate-700"
                    }`}
                  >
                    <item.icon className={`w-4 h-4 mr-3 ${isActive ? "text-white" : item.color}`} />
                    {item.title}
                  </Button>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700 bg-slate-800">
        <div className="text-xs text-slate-400">
          <p className="text-slate-300">Version 1.0.0</p>
          <p>© 2024 CMS Admin</p>
        </div>
      </div>
    </div>
  )
}
