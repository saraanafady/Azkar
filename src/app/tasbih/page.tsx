"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { RotateCcw, Save, History, Target } from "lucide-react"

export default function TasbihPage() {
  const { data: session } = useSession()
  const [count, setCount] = useState(0)
  const [target, setTarget] = useState(33)
  const [isAnimating, setIsAnimating] = useState(false)
  const [savedCounts, setSavedCounts] = useState<Array<{id: string, count: number, date: string}>>([])
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    if (session) {
      fetchSavedCounts()
    }
  }, [session])

  const fetchSavedCounts = async () => {
    try {
      const response = await fetch('/api/tasbih/counts')
      if (response.ok) {
        const data = await response.json()
        setSavedCounts(data)
      }
    } catch (error) {
      console.error('Error fetching saved counts:', error)
    }
  }

  const incrementCount = () => {
    setCount(prev => prev + 1)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 200)
  }

  const resetCount = () => {
    setCount(0)
  }

  const saveCount = async () => {
    if (!session || count === 0) return

    try {
      const response = await fetch('/api/tasbih/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count }),
      })

      if (response.ok) {
        await fetchSavedCounts()
        // Show success message or animation
      }
    } catch (error) {
      console.error('Error saving count:', error)
    }
  }

  const getProgressPercentage = () => {
    return Math.min((count / target) * 100, 100)
  }

  const getCompletionMessage = () => {
    if (count === 0) return "Start your dhikr"
    if (count < target) return `${target - count} more to reach your target`
    if (count === target) return "Target reached! Alhamdulillah!"
    return "Target exceeded! MashaAllah!"
  }

  const getMotivationalMessage = () => {
    if (count === 0) return "Begin with Bismillah"
    if (count < 10) return "Keep going, every dhikr counts"
    if (count < target) return "You're doing great!"
    if (count === target) return "Perfect! Alhamdulillah!"
    return "MashaAllah! Keep up the good work"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Digital Tasbih
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Keep track of your dhikr with our modern digital tasbih counter
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center"
          >
            {/* Target Setting */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Count
              </label>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setTarget(Math.max(1, target - 1))}
                  className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-none outline-none"
                />
                <button
                  onClick={() => setTarget(target + 1)}
                  className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Counter Display */}
            <div className="mb-8">
              <motion.div
                key={count}
                initial={{ scale: 1 }}
                animate={{ scale: isAnimating ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
                className="text-8xl md:text-9xl font-bold text-indigo-600 dark:text-indigo-400 mb-4"
              >
                {count}
              </motion.div>
              
              <div className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                {getCompletionMessage()}
              </div>
              
              <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                {getMotivationalMessage()}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgressPercentage()}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {Math.round(getProgressPercentage())}% Complete
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={incrementCount}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-2xl font-bold py-6 rounded-xl shadow-lg transition-all duration-300"
              >
                Tap to Count
              </motion.button>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetCount}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
                </motion.button>

                {session && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={saveCount}
                    disabled={count === 0}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Save
                  </motion.button>
                )}
              </div>
            </div>

            {!session && (
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Sign in to save your counts and track your progress
                </p>
              </div>
            )}
          </motion.div>

          {/* History Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Your Progress
              </h3>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                <History className="w-5 h-5 mr-2" />
                {showHistory ? 'Hide' : 'Show'} History
              </button>
            </div>

            {/* Today's Stats */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Today's Count
                    </h4>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                      {count}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <Target className="w-5 h-5 mr-1" />
                      <span className="text-sm font-medium">
                        {count >= target ? 'Target Reached!' : `${target - count} to go`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* History */}
            {showHistory && session && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Counts
                </h4>
                {savedCounts.length > 0 ? (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {savedCounts.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
                      >
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {item.count} dhikr
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(item.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-indigo-600 dark:text-indigo-400 font-bold">
                          {item.count >= target ? '✓' : '○'}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      No saved counts yet. Start counting and save your progress!
                    </p>
                  </div>
                )}
              </div>
            )}

            {!session && (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Sign in to view your progress history
                </p>
                <a
                  href="/auth/signin"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold"
                >
                  Sign In
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
