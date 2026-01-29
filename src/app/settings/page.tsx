"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function SettingsPage() {
  const [companyName, setCompanyName] = useState("LCB");
  const [subdomain, setSubdomain] = useState("lcb");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // TODO: Save to API
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Sidebar company={companyName} subdomain={subdomain} />
      
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] text-[#525252] font-mono tracking-wider">SETTINGS</span>
            <span className="text-[#525252]">/</span>
            <span className="text-[10px] text-[#525252] font-mono tracking-wider">COMPANY</span>
          </div>
          <h1 className="text-2xl font-medium text-white mb-1">Settings</h1>
          <p className="text-sm text-[#525252]">
            Manage your company profile and preferences
          </p>
        </div>

        <div className="max-w-2xl">
          {/* Company Settings */}
          <form onSubmit={handleSave}>
            <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-6 mb-6">
              <h2 className="text-lg font-medium text-white mb-1">Company Profile</h2>
              <p className="text-sm text-[#525252] mb-6">Basic information about your company</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] text-[#525252] font-mono tracking-wider mb-2">
                    COMPANY NAME
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-[#141414] border border-[#1a1a1a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#525252] focus:outline-none focus:border-[#2a2a2a] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#525252] font-mono tracking-wider mb-2">
                    SUBDOMAIN
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={subdomain}
                      onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))}
                      className="flex-1 bg-[#141414] border border-[#1a1a1a] rounded-l-lg px-4 py-3 text-sm text-white placeholder-[#525252] focus:outline-none focus:border-[#2a2a2a] transition-colors"
                    />
                    <div className="bg-[#1a1a1a] border border-l-0 border-[#1a1a1a] rounded-r-lg px-4 py-3 text-sm text-[#525252]">
                      .coldlava.ai
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-[#525252] font-mono tracking-wider mb-2">
                    COMPANY LOGO
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center text-black text-xl font-bold font-mono">
                      {companyName.slice(0, 2).toUpperCase()}
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 bg-[#141414] border border-[#1a1a1a] rounded-lg text-sm text-[#737373] hover:text-white hover:border-[#2a2a2a] transition-colors"
                    >
                      Upload Logo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-medium text-white mb-1">Team Members</h2>
                  <p className="text-sm text-[#525252]">People who can access this workspace</p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#141414] border border-[#1a1a1a] rounded-lg text-sm text-white hover:border-[#2a2a2a] transition-colors"
                >
                  + Invite
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#141414] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black text-xs font-bold">
                      HB
                    </div>
                    <div>
                      <p className="text-sm text-white">Harry Bennett</p>
                      <p className="text-xs text-[#525252]">harry@lcb.co.uk</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#525252] px-2 py-1 bg-[#1a1a1a] rounded">Admin</span>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-[#0f0f0f] border border-red-500/20 rounded-xl p-6 mb-6">
              <h2 className="text-lg font-medium text-red-400 mb-1">Danger Zone</h2>
              <p className="text-sm text-[#525252] mb-4">Irreversible actions</p>

              <button
                type="button"
                className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400 hover:bg-red-500/20 transition-colors"
              >
                Delete Company
              </button>
            </div>

            {/* Save button */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-[#e5e5e5] transition-colors duration-150 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              {saved && (
                <span className="text-sm text-emerald-400">✓ Saved</span>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
