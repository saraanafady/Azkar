"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X, BookOpen, Calculator, BarChart3, Home } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import SearchComponent from "./search"

export default function Navigation() {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Debug theme value
  useEffect(() => {
    console.log('Current theme:', theme)
    console.log('Theme type:', typeof theme)
    console.log('Is dark?', theme === 'dark')
  }, [theme])

  const navigation = [
    { name: "الرئيسية", href: "/", icon: Home },
    { name: "الأذكار", href: "/azkar", icon: BookOpen },
    { name: "السبحة", href: "/tasbih", icon: Calculator },
    { name: "لوحة التحكم", href: "/dashboard", icon: BarChart3 },
  ]

  return (
    <>
      {/* Force mobile menu styles */}
      <style jsx global>{`
        .mobile-menu-container {
          background-color: ${theme === 'dark' ? '#1e293b' : '#ffffff'} !important;
          color: ${theme === 'dark' ? '#f1f5f9' : '#0f172a'} !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
        .mobile-menu-content {
          background-color: ${theme === 'dark' ? '#1e293b' : '#ffffff'} !important;
          position: relative !important;
          z-index: 10 !important;
        }
      `}</style>
      
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
            
            {/* Search Bar - Center */}
            <div className="hidden md:flex md:items-center md:flex-1 md:max-w-md md:mx-8">
              <SearchComponent className="w-full" />
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

        {/* Mobile menu with slide-in animation */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:hidden"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Slide-in menu */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ 
                  type: "spring", 
                  damping: 25, 
                  stiffness: 200,
                  duration: 0.3 
                }}
                className="fixed top-0 right-0 h-full w-80 max-w-[85vw] shadow-2xl z-50 sm:hidden"
                style={{
                  backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                  color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                  borderLeft: `4px solid ${theme === 'dark' ? '#475569' : '#d1d5db'}`,
                  backdropFilter: 'none',
                  WebkitBackdropFilter: 'none'
                }}
              >
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h2 className="text-lg font-semibold text-foreground">القائمة</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Solid background overlay */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                    zIndex: -1
                  }}
                />
                
                {/* Menu Content */}
                <div 
                  className="flex flex-col h-full relative z-10"
                  style={{
                    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff'
                  }}
                >
                  {/* Search Bar */}
                  <div className="p-4 border-b border-border">
                    <SearchComponent className="w-full" />
                  </div>

                  {/* Navigation Links */}
                  <div className="flex-1 py-4">
                    {navigation.map((item, index) => {
                      const Icon = item.icon
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            href={item.href}
                            className={`flex items-center px-4 py-3 text-base font-medium hover:text-primary hover:bg-accent transition-all duration-300 group rounded-lg mx-2 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] ${
                              theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            <Icon className="w-5 h-5 ml-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
                            {item.name}
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* User Section */}
                  <div className="border-t border-border p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-muted-foreground">المظهر</span>
                      <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300 hover:shadow-lg hover:scale-110 active:scale-95"
                      >
                        {mounted && theme === "dark" ? (
                          <Sun className="w-5 h-5" />
                        ) : (
                          <Moon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    
                    {session ? (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">
                              {session.user?.name?.charAt(0)?.toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">
                              {session.user?.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {session.user?.email}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            signOut()
                            setIsOpen(false)
                          }}
                          className="w-full text-right px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                        >
                          تسجيل الخروج
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Link
                          href="/auth/signin"
                          className="block w-full text-right px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                          onClick={() => setIsOpen(false)}
                        >
                          تسجيل الدخول
                        </Link>
                        <Link
                          href="/auth/signup"
                          className="block w-full text-center px-3 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                          onClick={() => setIsOpen(false)}
                        >
                          إنشاء حساب
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
