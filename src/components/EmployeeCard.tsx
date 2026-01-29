"use client";

interface EmployeeCardProps {
  name: string;
  role: string;
  category: "sales" | "ops" | "support" | "content" | "custom";
  avatar: string;
  status: "online" | "offline" | "busy";
  lastActive: string;
  messagestoday: number;
  onClick?: () => void;
}

const categoryLabels = {
  sales: "SALES",
  ops: "OPERATIONS", 
  support: "SUPPORT",
  content: "CONTENT",
  custom: "CUSTOM",
};

const statusIndicator = {
  online: { color: "bg-emerald-400", label: "Online" },
  offline: { color: "bg-[#525252]", label: "Offline" },
  busy: { color: "bg-amber-400", label: "Busy" },
};

export default function EmployeeCard({
  name,
  role,
  category,
  avatar,
  status,
  lastActive,
  messagestoday,
  onClick,
}: EmployeeCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg p-5 hover:border-[#2a2a2a] hover:bg-[#111] transition-all duration-150 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl">
            {avatar}
          </div>
          <div>
            <h3 className="font-medium text-white">{name}</h3>
            <p className="text-xs text-[#525252] font-mono tracking-wide">{categoryLabels[category]}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${statusIndicator[status].color}`} />
          <span className="text-[11px] text-[#525252]">{statusIndicator[status].label}</span>
        </div>
      </div>

      {/* Role */}
      <p className="text-sm text-[#737373] mb-4 leading-relaxed">{role}</p>

      {/* Stats */}
      <div className="pt-4 border-t border-[#1a1a1a] grid grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] text-[#525252] font-mono tracking-wider mb-1">MESSAGES TODAY</p>
          <p className="text-lg font-mono font-medium text-white">{messagestoday}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-[#525252] font-mono tracking-wider mb-1">LAST ACTIVE</p>
          <p className="text-sm text-[#737373]">{lastActive}</p>
        </div>
      </div>
    </div>
  );
}
