"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", icon: "◉", href: "/" },
  { name: "Employees", icon: "◎", href: "/employees" },
  { name: "Messages", icon: "◈", href: "/messages" },
  { name: "Analytics", icon: "◇", href: "/analytics" },
  { name: "Settings", icon: "◆", href: "/settings" },
];

interface SidebarProps {
  company?: string;
  subdomain?: string;
}

export default function Sidebar({ company, subdomain }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const displayCompany = company || user?.company?.name || "Company";
  const displaySubdomain = subdomain || user?.company?.subdomain || "company";

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

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
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 ${
                    isActive
                      ? "bg-white text-black"
                      : "text-[#737373] hover:text-white"
                  }`}
                >
                  <span className="text-xs">{item.icon}</span>
                  <span className="text-sm">{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Company section */}
      <div className="p-4 border-t border-[#1a1a1a]">
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-full px-3 py-3 rounded-lg hover:bg-[#141414] transition-colors"
          >
            <p className="text-[10px] text-[#525252] font-mono tracking-wider mb-2 text-left">LOGGED IN AS</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-black text-xs font-bold font-mono">
                {displayCompany.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white">{displayCompany}</p>
                <p className="text-[11px] text-[#525252]">{displaySubdomain}.coldlava.ai</p>
              </div>
              <span className="text-[#525252]">▾</span>
            </div>
          </button>

          {/* Dropdown menu */}
          {showMenu && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#141414] border border-[#1a1a1a] rounded-lg overflow-hidden">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left text-sm text-[#737373] hover:text-white hover:bg-[#1a1a1a] transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
