'use client'

import { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:4000')

const channels = ['general', 'development', 'design']

export default function Home() {
  const [selectedChannel, setSelectedChannel] = useState('general')
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    socket.on('receiveMessage', ({ channel, message }) => {
      if (channel === selectedChannel) {
        setMessages(prev => [...prev, message])
      }
    })

    return () => {
      socket.off('receiveMessage')
    }
  }, [selectedChannel])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (input.trim() === '') return
    const msg = `[You] ${input}`
    setMessages(prev => [...prev, msg])
    socket.emit('sendMessage', { channel: selectedChannel, message: `[Anonymous] ${input}` })
    setInput('')
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-4 border-r border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-indigo-700">Channels</h2>
        <ul className="space-y-2">
          {channels.map(channel => (
            <li
              key={channel}
              className={`cursor-pointer px-3 py-2 rounded-lg font-medium transition-all ${
                selectedChannel === channel
                  ? 'bg-indigo-600 text-white shadow'
                  : 'hover:bg-gray-100 text-gray-800'
              }`}
              onClick={() => {
                setSelectedChannel(channel)
                setMessages([]) // clear messages on channel switch
              }}
            >
              #{channel}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">#{selectedChannel}</h2>

        <div className="flex-1 overflow-y-auto bg-white rounded-lg p-4 shadow-inner space-y-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[70%] px-4 py-2 rounded-xl text-sm shadow-sm break-words ${
                msg.startsWith('[You]')
                  ? 'bg-indigo-500 text-white self-end ml-auto border border-indigo-300'
                  : 'bg-gray-100 text-gray-900 border border-gray-300'
              }`}
            >
              {msg}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input Section */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
