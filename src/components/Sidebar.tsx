"use client";

import { useState } from "react";

const navItems = [
  { name: "Dashboard", icon: "◉", href: "/" },
  { name: "Employees", icon: "◎", href: "/employees" },
  { name: "Messages", icon: "◈", href: "/messages" },
  { name: "Analytics", icon: "◇", href: "/analytics" },
  { name: "Settings", icon: "◆", href: "/settings" },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#1a1a1a]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h1 className="font-mono font-bold text-sm tracking-[0.2em] text-white">COLD LAVA</h1>
            <span className="text-[10px] text-[#525252] font-mono">EST. 2024</span>
          </div>
          <p className="text-[11px] text-[#525252] tracking-wide">AI Employee Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <p className="text-[10px] text-[#525252] font-mono tracking-wider mb-3 px-3">NAVIGATION</p>
        <ul className="space-y-0.5">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                onClick={() => setActive(item.name)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 ${
                  active === item.name
                    ? "bg-white text-black"
                    : "text-[#737373] hover:text-white"
                }`}
              >
                <span className="text-xs">{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Company section */}
      <div className="p-4 border-t border-[#1a1a1a]">
        <div className="px-3 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-black text-xs font-bold font-mono">
              CL
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Demo Company</p>
              <p className="text-[11px] text-[#525252]">demo.coldlava.ai</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
