"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock data - will come from API
const employees = [
  { id: "1", name: "Alex", category: "sales", avatar: "🎯", role: "Lead Chaser" },
  { id: "2", name: "Jordan", category: "ops", avatar: "📋", role: "Scheduler" },
  { id: "3", name: "Sam", category: "support", avatar: "💬", role: "Customer Support" },
  { id: "4", name: "Casey", category: "content", avatar: "✍️", role: "Content Manager" },
];

const linkTypes = [
  { id: "notify", name: "Notify", description: "Send updates when tasks complete or need attention", icon: "🔔" },
  { id: "delegate", name: "Delegate", description: "Hand off tasks that fall outside their role", icon: "➡️" },
  { id: "collaborate", name: "Collaborate", description: "Work together on shared tasks", icon: "🤝" },
];

export default function LinkEmployeePage() {
  const params = useParams();
  const currentEmployee = employees.find((e) => e.id === params.id);
  const otherEmployees = employees.filter((e) => e.id !== params.id);
  
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [selectedLinkType, setSelectedLinkType] = useState<string>("notify");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee) return;

    setLoading(true);
    
    // TODO: Create link via API
    console.log("Creating link:", {
      from: params.id,
      to: selectedEmployee,
      type: selectedLinkType,
    });
    
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/";
    }, 1000);
  };

  if (!currentEmployee) {
    return <div className="min-h-screen bg-[#0a0a0a] p-8 text-white">Employee not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-sm text-[#525252] hover:text-white transition-colors mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-medium text-white mb-1">Link Employees</h1>
          <p className="text-sm text-[#525252]">
            Connect {currentEmployee.name} to other team members
          </p>
        </div>

        {/* Current employee */}
        <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-4 mb-6">
          <p className="text-[10px] text-[#525252] font-mono tracking-wider mb-3">FROM</p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl">
              {currentEmployee.avatar}
            </div>
            <div>
              <p className="font-medium text-white">{currentEmployee.name}</p>
              <p className="text-xs text-[#525252]">{currentEmployee.role}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Select employee to link */}
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-6 mb-6">
            <h2 className="text-lg font-medium text-white mb-1">Select team member</h2>
            <p className="text-sm text-[#525252] mb-4">Who should {currentEmployee.name} connect with?</p>
            
            <div className="space-y-2">
              {otherEmployees.map((emp) => (
                <button
                  key={emp.id}
                  type="button"
                  onClick={() => setSelectedEmployee(emp.id)}
                  className={`w-full p-4 rounded-lg border text-left transition-all duration-150 ${
                    selectedEmployee === emp.id
                      ? "bg-white text-black border-white"
                      : "bg-[#141414] border-[#1a1a1a] hover:border-[#2a2a2a]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{emp.avatar}</span>
                    <div>
                      <p className="font-medium">{emp.name}</p>
                      <p className={`text-sm ${selectedEmployee === emp.id ? "text-black/60" : "text-[#525252]"}`}>
                        {emp.role}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Link type */}
          {selectedEmployee && (
            <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-6 mb-6">
              <h2 className="text-lg font-medium text-white mb-1">Connection type</h2>
              <p className="text-sm text-[#525252] mb-4">How should they work together?</p>
              
              <div className="space-y-2">
                {linkTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedLinkType(type.id)}
                    className={`w-full p-4 rounded-lg border text-left transition-all duration-150 ${
                      selectedLinkType === type.id
                        ? "bg-white text-black border-white"
                        : "bg-[#141414] border-[#1a1a1a] hover:border-[#2a2a2a]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{type.icon}</span>
                      <div>
                        <p className="font-medium">{type.name}</p>
                        <p className={`text-sm ${selectedLinkType === type.id ? "text-black/60" : "text-[#525252]"}`}>
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Preview */}
          {selectedEmployee && (
            <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-6 mb-6">
              <p className="text-[10px] text-[#525252] font-mono tracking-wider mb-4">PREVIEW</p>
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center text-2xl mx-auto mb-2">
                    {currentEmployee.avatar}
                  </div>
                  <p className="text-sm text-white">{currentEmployee.name}</p>
                </div>
                <div className="text-2xl text-[#525252]">
                  {linkTypes.find((t) => t.id === selectedLinkType)?.icon}
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center text-2xl mx-auto mb-2">
                    {employees.find((e) => e.id === selectedEmployee)?.avatar}
                  </div>
                  <p className="text-sm text-white">
                    {employees.find((e) => e.id === selectedEmployee)?.name}
                  </p>
                </div>
              </div>
              <p className="text-center text-sm text-[#525252] mt-4">
                {currentEmployee.name} will {selectedLinkType === "notify" ? "notify" : selectedLinkType === "delegate" ? "delegate tasks to" : "collaborate with"} {employees.find((e) => e.id === selectedEmployee)?.name}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={!selectedEmployee || loading}
            className="w-full py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-[#e5e5e5] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating link..." : "Create Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
