"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, Calculator, BarChart3, Heart, Star, Moon, Sun } from "lucide-react"

export default function Home() {
  const { data: session } = useSession()

  const features = [
    {
      icon: BookOpen,
      title: "Azkar Collection",
      description: "Comprehensive collection of morning, evening, and prayer azkar with Arabic text, translations, and references.",
      href: "/azkar"
    },
    {
      icon: Calculator,
      title: "Digital Tasbih",
      description: "Modern digital tasbih counter with smooth animations and automatic saving to track your dhikr progress.",
      href: "/tasbih"
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Monitor your daily, weekly, and monthly progress with detailed statistics and completion percentages.",
      href: "/dashboard"
    }
  ]

  const benefits = [
    "Track your daily dhikr progress",
    "Access authentic azkar with references",
    "Modern, mobile-friendly interface",
    "Dark and light mode support",
    "Secure user authentication",
    "Bookmark your favorite azkar"
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Welcome to{" "}
              <span className="text-indigo-600 dark:text-indigo-400">Azkar</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Your digital companion for Islamic remembrance, featuring authentic azkar, 
              digital tasbih counter, and progress tracking.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {session ? (
                <Link
                  href="/dashboard"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/signup"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/auth/signin"
                    className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 dark:text-indigo-400 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need for your spiritual journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A comprehensive platform designed to help you maintain consistent dhikr and track your spiritual progress.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg">
                      <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white ml-4">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {feature.description}
                  </p>
                  <Link
                    href={feature.href}
                    className="text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    Explore →
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why choose Azkar?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Built with modern technology and Islamic principles in mind, 
                Azkar provides a seamless experience for your spiritual practice.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-4">
                      <Heart className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Start Your Journey Today
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Join thousands of Muslims who are already using Azkar to enhance their spiritual practice.
                  </p>
                  {!session && (
                    <Link
                      href="/auth/signup"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
                    >
                      Create Free Account
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Azkar</h3>
            <p className="text-gray-400 mb-6">
              Your digital companion for Islamic remembrance and spiritual growth.
            </p>
            <div className="flex justify-center space-x-6">
              <div className="flex items-center text-gray-400">
                <Moon className="w-4 h-4 mr-2" />
                <span>Dark Mode</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Sun className="w-4 h-4 mr-2" />
                <span>Light Mode</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}