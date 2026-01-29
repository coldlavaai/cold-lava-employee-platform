"use client";

import Sidebar from "@/components/Sidebar";

// Mock analytics data
const weeklyData = [
  { day: "Mon", messages: 45, tasks: 8 },
  { day: "Tue", messages: 52, tasks: 12 },
  { day: "Wed", messages: 38, tasks: 6 },
  { day: "Thu", messages: 67, tasks: 15 },
  { day: "Fri", messages: 54, tasks: 11 },
  { day: "Sat", messages: 23, tasks: 4 },
  { day: "Sun", messages: 18, tasks: 2 },
];

const employeeStats = [
  { name: "Alex", avatar: "🎯", category: "Sales", messages: 89, tasks: 23, efficiency: 94 },
  { name: "Jordan", avatar: "📋", category: "Operations", messages: 67, tasks: 18, efficiency: 88 },
  { name: "Sam", avatar: "💬", category: "Support", messages: 156, tasks: 45, efficiency: 96 },
  { name: "Casey", avatar: "✍️", category: "Content", messages: 34, tasks: 12, efficiency: 91 },
];

const maxMessages = Math.max(...weeklyData.map((d) => d.messages));

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Sidebar />
      
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] text-[#525252] font-mono tracking-wider">ANALYTICS</span>
            <span className="text-[#525252]">/</span>
            <span className="text-[10px] text-[#525252] font-mono tracking-wider">OVERVIEW</span>
          </div>
          <h1 className="text-2xl font-medium text-white mb-1">Analytics</h1>
          <p className="text-sm text-[#525252]">
            Track your AI team's performance and productivity
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-5">
            <p className="text-[10px] text-[#525252] font-mono tracking-wider mb-2">TOTAL MESSAGES</p>
            <p className="text-3xl font-mono font-medium text-white">346</p>
            <p className="text-xs text-emerald-400 mt-1">↑ 12% from last week</p>
          </div>
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-5">
            <p className="text-[10px] text-[#525252] font-mono tracking-wider mb-2">TASKS COMPLETED</p>
            <p className="text-3xl font-mono font-medium text-white">98</p>
            <p className="text-xs text-emerald-400 mt-1">↑ 8% from last week</p>
          </div>
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-5">
            <p className="text-[10px] text-[#525252] font-mono tracking-wider mb-2">AVG RESPONSE TIME</p>
            <p className="text-3xl font-mono font-medium text-white">1.2s</p>
            <p className="text-xs text-[#525252] mt-1">Within target</p>
          </div>
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-5">
            <p className="text-[10px] text-[#525252] font-mono tracking-wider mb-2">TIME SAVED</p>
            <p className="text-3xl font-mono font-medium text-white">32h</p>
            <p className="text-xs text-[#525252] mt-1">This week</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly activity chart */}
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-6">
            <h2 className="text-lg font-medium text-white mb-1">Weekly Activity</h2>
            <p className="text-sm text-[#525252] mb-6">Messages processed per day</p>
            
            <div className="flex items-end gap-2 h-48">
              {weeklyData.map((day) => (
                <div key={day.day} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-white rounded-t transition-all"
                    style={{ height: `${(day.messages / maxMessages) * 100}%` }}
                  />
                  <p className="text-xs text-[#525252] mt-2">{day.day}</p>
                  <p className="text-xs text-white font-mono">{day.messages}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Employee performance */}
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-6">
            <h2 className="text-lg font-medium text-white mb-1">Employee Performance</h2>
            <p className="text-sm text-[#525252] mb-6">Individual team member stats</p>
            
            <div className="space-y-4">
              {employeeStats.map((emp) => (
                <div key={emp.name} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-xl">
                    {emp.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-white">{emp.name}</p>
                      <p className="text-xs text-[#525252] font-mono">{emp.efficiency}% efficiency</p>
                    </div>
                    <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full transition-all"
                        style={{ width: `${emp.efficiency}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-xs text-[#525252]">{emp.messages} messages</p>
                      <p className="text-xs text-[#525252]">{emp.tasks} tasks</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="mt-6 bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-6">
          <h2 className="text-lg font-medium text-white mb-1">Recent Activity</h2>
          <p className="text-sm text-[#525252] mb-6">Latest actions from your AI team</p>
          
          <div className="space-y-3">
            {[
              { avatar: "🎯", name: "Alex", action: "Sent follow-up email to 5 leads", time: "2 minutes ago" },
              { avatar: "📋", name: "Jordan", action: "Scheduled 3 client meetings", time: "15 minutes ago" },
              { avatar: "💬", name: "Sam", action: "Resolved support ticket #1234", time: "32 minutes ago" },
              { avatar: "✍️", name: "Casey", action: "Published blog post draft", time: "1 hour ago" },
              { avatar: "🎯", name: "Alex", action: "Generated quote for Acme Inc", time: "2 hours ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[#141414] rounded-lg">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-lg">
                  {activity.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">
                    <span className="font-medium">{activity.name}</span>{" "}
                    <span className="text-[#737373]">{activity.action}</span>
                  </p>
                </div>
                <p className="text-xs text-[#525252]">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
