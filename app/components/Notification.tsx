"use client"

import { useNotification } from "./NotificationContext"

const Notification = () => {
  const { message, type } = useNotification()

  if (!message) return null

  const bgColor = type === "success" ? "bg-green-400" : "bg-red-400"
  return (
  <div className={`px-2 py-4 m-2 border rounded text-white ${bgColor}`}>
    {message}
  </div>
  )
}

export default Notification