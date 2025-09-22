"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Clock, Star, X, Bell, BellOff, Settings } from "lucide-react"

interface AzkarCategory {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  _count: {
    azkar: number
  }
}

interface ReminderSettings {
  morning: {
    enabled: boolean
    time: string
  }
  evening: {
    enabled: boolean
    time: string
  }
  notifications: boolean
}

export default function AzkarPage() {
  const [categories, setCategories] = useState<AzkarCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showReminderModal, setShowReminderModal] = useState(false)
  const [reminderSettings, setReminderSettings] = useState<ReminderSettings>({
    morning: {
      enabled: false,
      time: "06:00"
    },
    evening: {
      enabled: false,
      time: "18:00"
    },
    notifications: false
  })

  useEffect(() => {
    fetchCategories()
    loadReminderSettings()
  }, [])

  useEffect(() => {
    if (reminderSettings.notifications) {
      requestNotificationPermission()
    }
  }, [reminderSettings.notifications])

  const fetchCategories = async () => {
    try {
      console.log('Fetching categories...')
      const response = await fetch('/api/azkar/categories')
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Categories data:', data)
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      setCategories(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      setError(`Failed to load categories: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setCategories([])
    } finally {
      setLoading(false)
    }
  }

  const loadReminderSettings = () => {
    try {
      const saved = localStorage.getItem('azkar-reminder-settings')
      if (saved) {
        setReminderSettings(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Error loading reminder settings:', error)
    }
  }

  const saveReminderSettings = (settings: ReminderSettings) => {
    try {
      localStorage.setItem('azkar-reminder-settings', JSON.stringify(settings))
      setReminderSettings(settings)
    } catch (error) {
      console.error('Error saving reminder settings:', error)
    }
  }

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        alert('يرجى السماح بالإشعارات لاستخدام ميزة التذكير')
        setReminderSettings(prev => ({ ...prev, notifications: false }))
      }
    } else {
      alert('المتصفح لا يدعم الإشعارات')
      setReminderSettings(prev => ({ ...prev, notifications: false }))
    }
  }

  const scheduleReminder = (type: 'morning' | 'evening', time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    const now = new Date()
    const reminderTime = new Date()
    reminderTime.setHours(hours, minutes, 0, 0)

    // If the time has passed today, schedule for tomorrow
    if (reminderTime <= now) {
      reminderTime.setDate(reminderTime.getDate() + 1)
    }

    const timeUntilReminder = reminderTime.getTime() - now.getTime()

    setTimeout(() => {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`وقت ${type === 'morning' ? 'أذكار الصباح' : 'أذكار المساء'}`, {
          body: `حان وقت قراءة ${type === 'morning' ? 'أذكار الصباح' : 'أذكار المساء'}. بارك الله في وقتك`,
          icon: '/favicon.ico',
          tag: `azkar-${type}`,
          requireInteraction: true
        })
      }
      
      // Schedule the next day's reminder
      scheduleReminder(type, time)
    }, timeUntilReminder)
  }

  const handleSaveReminders = () => {
    saveReminderSettings(reminderSettings)
    
    if (reminderSettings.morning.enabled) {
      scheduleReminder('morning', reminderSettings.morning.time)
    }
    
    if (reminderSettings.evening.enabled) {
      scheduleReminder('evening', reminderSettings.evening.time)
    }

    setShowReminderModal(false)
  }

  const toggleReminder = (type: 'morning' | 'evening') => {
    setReminderSettings(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        enabled: !prev[type].enabled
      }
    }))
  }

  const updateReminderTime = (type: 'morning' | 'evening', time: string) => {
    setReminderSettings(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        time
      }
    }))
  }

  const toggleNotifications = () => {
    setReminderSettings(prev => ({
      ...prev,
      notifications: !prev.notifications
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            خطأ في تحميل الفئات
          </h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button
            onClick={fetchCategories}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            حاول مرة أخرى
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            مجموعة الأذكار
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            استكشف مجموعتنا الشاملة من الأذكار والدعوات الإسلامية الموثوقة
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/azkar/${category.name.toLowerCase()}`}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="w-4 h-4 mr-1" />
                        {category._count.azkar}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {category.name}
                    </h3>
                    <h4 className="text-lg font-medium text-primary mb-3" dir="rtl">
                      {category.nameAr}
                    </h4>
                    
                    <p className="text-muted-foreground text-sm mb-4">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      {/* <span className="text-sm text-muted-foreground">
                        {category._count.azkar} أذكار
                      </span> */}
                      <div className="flex items-center text-primary text-sm font-medium">
                        استكشف
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                لا توجد فئات متاحة
              </h3>
              <p className="text-muted-foreground">
                ستظهر الفئات هنا بمجرد تحميلها.
              </p>
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-border"
          >
            <div className="flex items-center justify-center mb-4">
              {reminderSettings.morning.enabled || reminderSettings.evening.enabled ? (
                <Bell className="w-12 h-12 text-green-500" />
              ) : (
                <BellOff className="w-12 h-12 text-muted-foreground" />
              )}
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              تذكير يومي
            </h3>
            <p className="text-muted-foreground mb-6">
              قم بإعداد تذكيرات يومية لأذكار الصباح والمساء للحفاظ على الاستمرارية في ممارستك الروحية.
            </p>
            
            {/* Reminder Status */}
            {(reminderSettings.morning.enabled || reminderSettings.evening.enabled) && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-sm text-green-700 dark:text-green-300 mb-2">التذكيرات النشطة:</div>
                <div className="space-y-1">
                  {reminderSettings.morning.enabled && (
                    <div className="text-sm text-green-600 dark:text-green-400">
                      🌅 أذكار الصباح - {reminderSettings.morning.time}
                    </div>
                  )}
                  {reminderSettings.evening.enabled && (
                    <div className="text-sm text-green-600 dark:text-green-400">
                      🌙 أذكار المساء - {reminderSettings.evening.time}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setShowReminderModal(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                {reminderSettings.morning.enabled || reminderSettings.evening.enabled ? 'تعديل التذكيرات' : 'إعداد التذكيرات'}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Reminder Modal */}
        <AnimatePresence>
          {showReminderModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowReminderModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-xl shadow-2xl p-6 w-full max-w-md border border-border"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-foreground">إعداد التذكيرات</h3>
                  <button
                    onClick={() => setShowReminderModal(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Notifications Toggle */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-medium text-foreground">تفعيل الإشعارات</div>
                      <div className="text-sm text-muted-foreground">السماح بإرسال إشعارات التذكير</div>
                    </div>
                    <button
                      onClick={toggleNotifications}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        reminderSettings.notifications ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          reminderSettings.notifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Morning Reminder */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-medium text-foreground flex items-center gap-2">
                        🌅 أذكار الصباح
                      </div>
                    </div>
                    <button
                      onClick={() => toggleReminder('morning')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        reminderSettings.morning.enabled ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          reminderSettings.morning.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  {reminderSettings.morning.enabled && (
                    <div className="ml-4">
                      <input
                        type="time"
                        value={reminderSettings.morning.time}
                        onChange={(e) => updateReminderTime('morning', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  )}
                </div>

                {/* Evening Reminder */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-medium text-foreground flex items-center gap-2">
                        🌙 أذكار المساء
                      </div>
                    </div>
                    <button
                      onClick={() => toggleReminder('evening')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        reminderSettings.evening.enabled ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          reminderSettings.evening.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  {reminderSettings.evening.enabled && (
                    <div className="ml-4">
                      <input
                        type="time"
                        value={reminderSettings.evening.time}
                        onChange={(e) => updateReminderTime('evening', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowReminderModal(false)}
                    className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleSaveReminders}
                    className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors"
                  >
                    حفظ
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
