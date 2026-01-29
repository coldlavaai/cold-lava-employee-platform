"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  { id: "sales", name: "Sales", icon: "🎯", description: "Chase leads, generate quotes, follow up with prospects" },
  { id: "ops", name: "Operations", icon: "📋", description: "Schedule appointments, coordinate teams, manage calendars" },
  { id: "support", name: "Support", icon: "💬", description: "Answer questions, resolve issues, maintain satisfaction" },
  { id: "content", name: "Content", icon: "✍️", description: "Write blogs, manage website, create marketing content" },
  { id: "custom", name: "Custom", icon: "⚡", description: "Define your own role and capabilities" },
];

const avatars = ["🤖", "🎯", "📋", "💬", "✍️", "⚡", "🚀", "💼", "🎨", "📊", "🔧", "📞"];

export default function NewEmployeePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    avatar: "🤖",
    role: "",
    personality: "",
    instructions: "",
  });
  const [loading, setLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectedCategory = categories.find((c) => c.id === formData.category);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1 && !formData.category) return;
    if (step === 2 && !formData.name) return;
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setLoading(true);
    
    // TODO: Create employee via API
    console.log("Creating employee:", formData);
    
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-sm text-[#525252] hover:text-white transition-colors mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-medium text-white mb-1">Create New Employee</h1>
          <p className="text-sm text-[#525252]">
            Set up a new AI team member for your business
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          <div className={`flex-1 h-1 rounded-full ${step >= 1 ? "bg-white" : "bg-[#1a1a1a]"}`} />
          <div className={`flex-1 h-1 rounded-full ${step >= 2 ? "bg-white" : "bg-[#1a1a1a]"}`} />
          <div className={`flex-1 h-1 rounded-full ${step >= 3 ? "bg-white" : "bg-[#1a1a1a]"}`} />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Category */}
          {step === 1 && (
            <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-6">
              <h2 className="text-lg font-medium text-white mb-1">What type of employee?</h2>
              <p className="text-sm text-[#525252] mb-6">Choose a category that fits their primary role</p>
              
              <div className="grid grid-cols-1 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => updateField("category", cat.id)}
                    className={`p-4 rounded-lg border text-left transition-all duration-150 ${
                      formData.category === cat.id
                        ? "bg-white text-black border-white"
                        : "bg-[#141414] border-[#1a1a1a] hover:border-[#2a2a2a]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <p className="font-medium">{cat.name}</p>
                        <p className={`text-sm ${formData.category === cat.id ? "text-black/60" : "text-[#525252]"}`}>
                          {cat.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={!formData.category}
                className="w-full mt-6 py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-[#e5e5e5] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-6">
              <h2 className="text-lg font-medium text-white mb-1">Employee details</h2>
              <p className="text-sm text-[#525252] mb-6">Give your employee a name and appearance</p>

              <div className="space-y-6">
                {/* Avatar */}
                <div>
                  <label className="block text-[10px] text-[#525252] font-mono tracking-wider mb-3">
                    AVATAR
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {avatars.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => updateField("avatar", emoji)}
                        className={`w-12 h-12 rounded-lg text-2xl flex items-center justify-center transition-all ${
                          formData.avatar === emoji
                            ? "bg-white"
                            : "bg-[#141414] hover:bg-[#1a1a1a]"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[10px] text-[#525252] font-mono tracking-wider mb-2">
                    NAME
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="e.g., Alex, Sales Bot, Customer Support"
                    className="w-full bg-[#141414] border border-[#1a1a1a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#525252] focus:outline-none focus:border-[#2a2a2a] transition-colors"
                  />
                </div>

                {/* Role description */}
                <div>
                  <label className="block text-[10px] text-[#525252] font-mono tracking-wider mb-2">
                    ROLE DESCRIPTION
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => updateField("role", e.target.value)}
                    placeholder={selectedCategory?.description || "What does this employee do?"}
                    className="w-full bg-[#141414] border border-[#1a1a1a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#525252] focus:outline-none focus:border-[#2a2a2a] transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 bg-[#141414] text-white rounded-lg text-sm font-medium hover:bg-[#1a1a1a] transition-colors duration-150"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!formData.name}
                  className="flex-1 py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-[#e5e5e5] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Personality & Instructions */}
          {step === 3 && (
            <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-6">
              <h2 className="text-lg font-medium text-white mb-1">Personality & instructions</h2>
              <p className="text-sm text-[#525252] mb-6">Define how your employee behaves and what they know</p>

              <div className="space-y-6">
                {/* Personality */}
                <div>
                  <label className="block text-[10px] text-[#525252] font-mono tracking-wider mb-2">
                    PERSONALITY (OPTIONAL)
                  </label>
                  <textarea
                    value={formData.personality}
                    onChange={(e) => updateField("personality", e.target.value)}
                    placeholder="e.g., Friendly and professional, always helpful, uses casual language..."
                    rows={3}
                    className="w-full bg-[#141414] border border-[#1a1a1a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#525252] focus:outline-none focus:border-[#2a2a2a] transition-colors resize-none"
                  />
                </div>

                {/* Instructions */}
                <div>
                  <label className="block text-[10px] text-[#525252] font-mono tracking-wider mb-2">
                    SPECIAL INSTRUCTIONS (OPTIONAL)
                  </label>
                  <textarea
                    value={formData.instructions}
                    onChange={(e) => updateField("instructions", e.target.value)}
                    placeholder="e.g., Always ask for budget before sending quotes. Escalate urgent issues to the team..."
                    rows={4}
                    className="w-full bg-[#141414] border border-[#1a1a1a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#525252] focus:outline-none focus:border-[#2a2a2a] transition-colors resize-none"
                  />
                </div>

                {/* Preview */}
                <div className="p-4 bg-[#141414] border border-[#1a1a1a] rounded-lg">
                  <p className="text-[10px] text-[#525252] font-mono tracking-wider mb-3">PREVIEW</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl">
                      {formData.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-white">{formData.name || "Employee Name"}</p>
                      <p className="text-xs text-[#525252] font-mono">{selectedCategory?.name.toUpperCase()}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#737373] mt-3">
                    {formData.role || selectedCategory?.description}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 bg-[#141414] text-white rounded-lg text-sm font-medium hover:bg-[#1a1a1a] transition-colors duration-150"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-[#e5e5e5] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating..." : "Create Employee"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
