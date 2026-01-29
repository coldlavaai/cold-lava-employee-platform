"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import EmployeeCard from "@/components/EmployeeCard";
import StatsBar from "@/components/StatsBar";
import ProtectedRoute from "@/components/ProtectedRoute";

// Demo employees - real clients
const employees = [
  {
    id: 1,
    name: "Design Assistant",
    role: "Helps clients visualize interior designs, answers style questions, and manages project inquiries.",
    category: "custom" as const,
    avatar: "🏠",
    status: "online" as const,
    lastActive: "Just now",
    messagestoday: 18,
    company: "Donna",
  },
  {
    id: 2,
    name: "Harry",
    role: "Manages client communications, handles inquiries, and coordinates business operations.",
    category: "ops" as const,
    avatar: "💼",
    status: "online" as const,
    lastActive: "5m ago",
    messagestoday: 34,
    company: "LCB",
  },
  {
    id: 3,
    name: "Support Bot",
    role: "Answers customer questions, provides information, and routes complex issues to the team.",
    category: "support" as const,
    avatar: "💬",
    status: "busy" as const,
    lastActive: "2m ago",
    messagestoday: 52,
    company: "LCB",
  },
];

export default function Dashboard() {
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const selected = employees.find((e) => e.id === selectedEmployee);

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-[#0a0a0a]">
      <Sidebar />
      
      {/* Main content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] text-[#525252] font-mono tracking-wider">DASHBOARD</span>
            <span className="text-[#525252]">/</span>
            <span className="text-[10px] text-[#525252] font-mono tracking-wider">OVERVIEW</span>
          </div>
          <h1 className="text-2xl font-medium text-white mb-1">Your AI Team</h1>
          <p className="text-sm text-[#525252]">
            Manage your employees and track their performance
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <StatsBar />
        </div>

        {/* Employees section */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-[#525252] font-mono tracking-wider mb-1">EMPLOYEES / ACTIVE</p>
            <p className="text-sm text-[#737373]">
              Click to start a conversation
            </p>
          </div>
          <a
            href="/employees/new"
            className="px-4 py-2.5 bg-white text-black rounded-lg text-sm font-medium hover:bg-[#e5e5e5] transition-colors duration-150 inline-block"
          >
            + Create Employee
          </a>
        </div>

        {/* Employee grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              {...employee}
              onClick={() => setSelectedEmployee(employee.id)}
            />
          ))}
        </div>

        {/* Chat modal */}
        {selectedEmployee && selected && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl w-full max-w-2xl h-[600px] flex flex-col">
              {/* Chat header */}
              <div className="p-4 border-b border-[#1a1a1a] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-xl">
                    {selected.avatar}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{selected.name}</h3>
                    <p className="text-[11px] text-[#525252] font-mono tracking-wide">
                      {selected.company} · {selected.category.toUpperCase()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="w-8 h-8 rounded-lg hover:bg-[#1a1a1a] flex items-center justify-center transition-colors text-[#525252] hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Chat messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="flex flex-col gap-4">
                  {/* AI message */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-sm flex-shrink-0">
                      {selected.avatar}
                    </div>
                    <div className="bg-[#141414] border border-[#1a1a1a] rounded-xl rounded-tl-sm px-4 py-3 max-w-md">
                      <p className="text-sm text-[#e5e5e5] leading-relaxed">
                        Hey! 👋 I'm ready to help. What would you like me to work on today?
                      </p>
                    </div>
                  </div>

                  {/* User message */}
                  <div className="flex gap-3 justify-end">
                    <div className="bg-white text-black rounded-xl rounded-tr-sm px-4 py-3 max-w-md">
                      <p className="text-sm leading-relaxed">
                        Can you check on recent customer inquiries?
                      </p>
                    </div>
                  </div>

                  {/* AI response */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-sm flex-shrink-0">
                      {selected.avatar}
                    </div>
                    <div className="bg-[#141414] border border-[#1a1a1a] rounded-xl rounded-tl-sm px-4 py-3 max-w-md">
                      <p className="text-sm text-[#e5e5e5] leading-relaxed">
                        On it. Found 8 new inquiries since yesterday. 3 are high priority — I'll draft responses and send them for your approval. Should I handle the routine ones automatically?
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat input */}
              <div className="p-4 border-t border-[#1a1a1a]">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-[#141414] border border-[#1a1a1a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#525252] focus:outline-none focus:border-[#2a2a2a] transition-colors"
                  />
                  <button className="px-5 py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-[#e5e5e5] transition-colors duration-150">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
    </ProtectedRoute>
  );
}
