"use client"

import { useState, useCallback } from "react"

interface Notification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  duration?: number
}

export function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useCallback((
    type: Notification['type'],
    message: string,
    duration = 5000
  ) => {
    const id = Math.random().toString(36).substr(2, 9)
    const notification: Notification = { id, type, message, duration }
    
    setNotifications(prev => [...prev, notification])
    
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])

  const success = useCallback((message: string, duration?: number) => {
    addNotification('success', message, duration)
  }, [addNotification])

  const error = useCallback((message: string, duration?: number) => {
    addNotification('error', message, duration)
  }, [addNotification])

  const info = useCallback((message: string, duration?: number) => {
    addNotification('info', message, duration)
  }, [addNotification])

  const warning = useCallback((message: string, duration?: number) => {
    addNotification('warning', message, duration)
  }, [addNotification])

  return {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    info,
    warning
  }
}
