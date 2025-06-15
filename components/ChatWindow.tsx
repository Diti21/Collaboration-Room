'use client'

import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:4000') // backend must be running

export default function ChatWindow({ channel }: { channel: string }) {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState('')
  const messageEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when new message is added
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Listen to incoming messages
  useEffect(() => {
    socket.on('receiveMessage', ({ channel: incomingChannel, message }) => {
      if (incomingChannel === channel) {
        setMessages((prev) => [...prev, message])
      }
    })

    return () => {
      socket.off('receiveMessage')
    }
  }, [channel])

  // Send message handler
  const sendMessage = () => {
    if (!input.trim()) return
    const myMessage = `[You] ${input}`
    const anonMessage = `[Anonymous] ${input}`

    setMessages((prev) => [...prev, myMessage])
    socket.emit('sendMessage', { channel, message: anonMessage })
    setInput('')
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="px-6 py-4 border-b bg-white shadow-sm">
        <h2 className="text-xl font-bold text-gray-800">#{channel}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] px-4 py-2 rounded-lg shadow text-sm ${
              msg.startsWith('[You]')
                ? 'bg-blue-500 text-white self-end ml-auto'
                : 'bg-white text-gray-800'
            }`}
          >
            {msg}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="p-4 border-t bg-white flex items-center gap-2">
        <input
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition"
        >
          Send
        </button>
      </div>
    </div>
  )
}
