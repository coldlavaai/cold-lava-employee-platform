"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import EmployeeCard from "@/components/EmployeeCard";
import Link from "next/link";

// Mock employees
const employees = [
  {
    id: "1",
    name: "Alex",
    role: "Chases leads, generates quotes, and follows up with prospects automatically.",
    category: "sales" as const,
    avatar: "🎯",
    status: "online" as const,
    lastActive: "Just now",
    messagestoday: 34,
  },
  {
    id: "2",
    name: "Jordan",
    role: "Schedules appointments, coordinates teams, and manages your calendar.",
    category: "ops" as const,
    avatar: "📋",
    status: "online" as const,
    lastActive: "2m ago",
    messagestoday: 28,
  },
  {
    id: "3",
    name: "Sam",
    role: "Handles customer questions, resolves issues, and maintains satisfaction.",
    category: "support" as const,
    avatar: "💬",
    status: "busy" as const,
    lastActive: "5m ago",
    messagestoday: 52,
  },
  {
    id: "4",
    name: "Casey",
    role: "Manages website content, writes blogs, and keeps your online presence fresh.",
    category: "content" as const,
    avatar: "✍️",
    status: "offline" as const,
    lastActive: "1h ago",
    messagestoday: 12,
  },
];

// Mock links
const employeeLinks = [
  { from: "1", to: "2", type: "notify" },
  { from: "2", to: "3", type: "delegate" },
  { from: "3", to: "1", type: "collaborate" },
];

export default function EmployeesPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Sidebar />
      
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] text-[#525252] font-mono tracking-wider">EMPLOYEES</span>
            <span className="text-[#525252]">/</span>
            <span className="text-[10px] text-[#525252] font-mono tracking-wider">ALL</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium text-white mb-1">Employees</h1>
              <p className="text-sm text-[#525252]">
                Manage your AI team members
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowLinks(!showLinks)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  showLinks
                    ? "bg-white text-black"
                    : "bg-[#141414] text-[#737373] hover:text-white border border-[#1a1a1a]"
                }`}
              >
                🔗 Show Links
              </button>
              <Link
                href="/employees/new"
                className="px-4 py-2.5 bg-white text-black rounded-lg text-sm font-medium hover:bg-[#e5e5e5] transition-colors"
              >
                + Create Employee
              </Link>
            </div>
          </div>
        </div>

        {/* Employee links visualization */}
        {showLinks && (
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-6 mb-8">
            <h2 className="text-lg font-medium text-white mb-4">Team Connections</h2>
            <div className="flex items-center justify-center gap-8">
              {employees.map((emp) => {
                const outgoingLinks = employeeLinks.filter((l) => l.from === emp.id);
                return (
                  <div key={emp.id} className="text-center">
                    <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center text-3xl mx-auto mb-2">
                      {emp.avatar}
                    </div>
                    <p className="text-sm text-white">{emp.name}</p>
                    <p className="text-xs text-[#525252]">{outgoingLinks.length} connections</p>
                    <Link
                      href={`/employees/${emp.id}/link`}
                      className="text-xs text-white hover:underline mt-1 inline-block"
                    >
                      + Add link
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-[#1a1a1a]">
              <p className="text-xs text-[#525252] text-center">
                {employeeLinks.length} total connections • Click an employee to manage their links
              </p>
            </div>
          </div>
        )}

        {/* Employee grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {employees.map((employee) => (
            <div key={employee.id} className="relative group">
              <EmployeeCard {...employee} />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  href={`/employees/${employee.id}/link`}
                  className="px-2 py-1 bg-white text-black rounded text-xs font-medium"
                >
                  🔗 Link
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state for when there are no employees */}
        {employees.length === 0 && (
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-12 text-center">
            <p className="text-6xl mb-4">👥</p>
            <h2 className="text-xl font-medium text-white mb-2">No employees yet</h2>
            <p className="text-sm text-[#525252] mb-6">Create your first AI employee to get started</p>
            <Link
              href="/employees/new"
              className="px-6 py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-[#e5e5e5] transition-colors inline-block"
            >
              + Create Employee
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
