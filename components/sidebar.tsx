'use client'
import { useState } from "react"

const channels = ['General', 'Development', 'Design', 'Random']

export default function Sidebar({
  onChannelClick,
}: {
  onChannelClick: (channel: string) => void
}) {
  const [active, setActive] = useState('General')

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6 shadow-lg">
      <h2 className="font-bold text-2xl mb-6 tracking-wide"> Channels</h2>

      <div className="space-y-2">
        {channels.map((channel) => (
          <div
            key={channel}
            onClick={() => {
              onChannelClick(channel)
              setActive(channel)
            }}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out font-medium
              ${
                active === channel
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'hover:bg-blue-500 hover:text-white text-gray-300'
              }`}
          >
            #{channel}
          </div>
        ))}
      </div>
    </div>
  )
}
