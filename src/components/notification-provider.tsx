"use client"

import { useNotification } from "@/hooks/use-notification"
import Notification from "./notification"

interface NotificationProviderProps {
  children: React.ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const { notifications, removeNotification } = useNotification()

  return (
    <>
      {children}
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          duration={notification.duration}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </>
  )
}
