"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X, BookOpen, Calculator, BarChart3, Home } from "lucide-react"

export default function Navigation() {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    { name: "الرئيسية", href: "/", icon: Home },
    { name: "الأذكار", href: "/azkar", icon: BookOpen },
    { name: "السبحة", href: "/tasbih", icon: Calculator },
    { name: "لوحة التحكم", href: "/dashboard", icon: BarChart3 },
  ]

  return (
    <nav className="bg-card/95 backdrop-blur-sm shadow-lg border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary">
                Azkar
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-foreground hover:text-primary hover:border-primary transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-foreground">
                  مرحباً، {session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                >
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/signin"
                  className="text-foreground hover:text-primary transition-colors duration-200"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                >
                  إنشاء حساب
                </Link>
              </div>
            )}
          </div>
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden bg-card">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-foreground hover:text-primary hover:bg-accent hover:border-primary"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.name}
                </Link>
              )
            })}
            <div className="pt-4 pb-3 border-t border-border">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
                  >
                    {mounted && theme === "dark" ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="ml-3">
                  {session ? (
                    <div className="flex flex-col space-y-2">
                      <div className="text-base font-medium text-foreground">
                        {session.user?.name}
                      </div>
                      <button
                        onClick={() => signOut()}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        تسجيل الخروج
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <Link
                        href="/auth/signin"
                        className="text-base font-medium text-foreground hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        تسجيل الدخول
                      </Link>
                      <Link
                        href="/auth/signup"
                        className="text-base font-medium text-primary hover:text-primary/80"
                        onClick={() => setIsOpen(false)}
                      >
                        إنشاء حساب
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
