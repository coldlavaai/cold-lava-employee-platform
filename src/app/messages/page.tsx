"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

// Mock conversations
const conversations = [
  {
    id: "1",
    employee: { name: "Alex", avatar: "🎯", category: "SALES" },
    lastMessage: "I've drafted follow-up emails for 8 leads. Ready for your review.",
    time: "2m ago",
    unread: 3,
  },
  {
    id: "2",
    employee: { name: "Jordan", avatar: "📋", category: "OPERATIONS" },
    lastMessage: "Calendar synced. You have 3 meetings tomorrow.",
    time: "15m ago",
    unread: 0,
  },
  {
    id: "3",
    employee: { name: "Sam", avatar: "💬", category: "SUPPORT" },
    lastMessage: "Resolved 12 tickets today. 2 escalated for review.",
    time: "1h ago",
    unread: 2,
  },
  {
    id: "4",
    employee: { name: "Casey", avatar: "✍️", category: "CONTENT" },
    lastMessage: "Blog post draft is ready: '5 Ways AI is Changing Business'",
    time: "3h ago",
    unread: 0,
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const selected = conversations.find((c) => c.id === selectedConversation);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Sidebar />
      
      <main className="ml-64 h-screen flex">
        {/* Conversations list */}
        <div className="w-80 border-r border-[#1a1a1a] flex flex-col">
          <div className="p-4 border-b border-[#1a1a1a]">
            <h1 className="text-lg font-medium text-white">Messages</h1>
            <p className="text-xs text-[#525252]">Conversations with your AI team</p>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`w-full p-4 text-left border-b border-[#1a1a1a] transition-colors ${
                  selectedConversation === conv.id
                    ? "bg-[#141414]"
                    : "hover:bg-[#0f0f0f]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-xl flex-shrink-0">
                    {conv.employee.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-white text-sm">{conv.employee.name}</p>
                      <span className="text-xs text-[#525252]">{conv.time}</span>
                    </div>
                    <p className="text-xs text-[#525252] font-mono">{conv.employee.category}</p>
                    <p className="text-sm text-[#737373] truncate mt-1">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="w-5 h-5 bg-white text-black text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {selected ? (
            <>
              {/* Chat header */}
              <div className="p-4 border-b border-[#1a1a1a] flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-xl">
                  {selected.employee.avatar}
                </div>
                <div>
                  <p className="font-medium text-white">{selected.employee.name}</p>
                  <p className="text-xs text-[#525252] font-mono">{selected.employee.category}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="flex flex-col gap-4">
                  {/* Sample messages */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-sm flex-shrink-0">
                      {selected.employee.avatar}
                    </div>
                    <div className="bg-[#141414] border border-[#1a1a1a] rounded-xl rounded-tl-sm px-4 py-3 max-w-md">
                      <p className="text-sm text-[#e5e5e5]">Hey! 👋 I'm here to help. What would you like me to work on?</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 justify-end">
                    <div className="bg-white text-black rounded-xl rounded-tr-sm px-4 py-3 max-w-md">
                      <p className="text-sm">Check on the latest leads</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-sm flex-shrink-0">
                      {selected.employee.avatar}
                    </div>
                    <div className="bg-[#141414] border border-[#1a1a1a] rounded-xl rounded-tl-sm px-4 py-3 max-w-md">
                      <p className="text-sm text-[#e5e5e5]">{selected.lastMessage}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-[#1a1a1a]">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-[#141414] border border-[#1a1a1a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#525252] focus:outline-none focus:border-[#2a2a2a] transition-colors"
                  />
                  <button className="px-5 py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-[#e5e5e5] transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-6xl mb-4">💬</p>
                <p className="text-lg text-white mb-1">Select a conversation</p>
                <p className="text-sm text-[#525252]">Choose an employee to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
