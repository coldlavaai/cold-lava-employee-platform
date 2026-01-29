"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function SignupPage() {
  const router = useRouter();
  const { user, signup, loading: authLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    subdomain: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Auto-generate subdomain from company name
    if (field === "companyName") {
      const subdomain = value
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .slice(0, 20);
      setFormData((prev) => ({ ...prev, subdomain }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!formData.companyName || !formData.subdomain) {
        setError("Please fill in all fields");
        return;
      }
      setError("");
      setStep(2);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      await signup({
        companyName: formData.companyName,
        subdomain: formData.subdomain,
        email: formData.email,
        password: formData.password,
      });
      router.push("/");
    } catch (err) {
      setError("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="font-mono font-bold text-xl tracking-[0.2em] text-white">
              COLD LAVA
            </h1>
            <span className="text-[10px] text-[#525252] font-mono">EST. 2024</span>
          </div>
          <p className="text-sm text-[#525252]">AI Employee Platform</p>
        </div>

        {/* Signup form */}
        <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-8">
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`flex-1 h-1 rounded-full ${step >= 1 ? "bg-white" : "bg-[#1a1a1a]"}`} />
            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? "bg-white" : "bg-[#1a1a1a]"}`} />
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-medium text-white mb-1">
              {step === 1 ? "Create your workspace" : "Set up your account"}
            </h2>
            <p className="text-sm text-[#525252]">
              {step === 1
                ? "Your company will get its own subdomain"
                : "Almost there! Just need your login details"}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <div>
                  <label className="block text-[10px] text-[#525252] font-mono tracking-wider mb-2">
                    COMPANY NAME
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => updateField("companyName", e.target.value)}
                    required
                    className="w-full bg-[#141414] border border-[#1a1a1a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#525252] focus:outline-none focus:border-[#2a2a2a] transition-colors"
                    placeholder="Acme Inc"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#525252] font-mono tracking-wider mb-2">
                    YOUR SUBDOMAIN
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={formData.subdomain}
                      onChange={(e) => updateField("subdomain", e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))}
                      required
                      className="flex-1 bg-[#141414] border border-[#1a1a1a] rounded-l-lg px-4 py-3 text-sm text-white placeholder-[#525252] focus:outline-none focus:border-[#2a2a2a] transition-colors"
                      placeholder="acme"
                    />
                    <div className="bg-[#1a1a1a] border border-l-0 border-[#1a1a1a] rounded-r-lg px-4 py-3 text-sm text-[#525252]">
                      .coldlava.ai
                    </div>
                  </div>
                  <p className="text-xs text-[#525252] mt-2">
                    This will be your team's URL
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-[10px] text-[#525252] font-mono tracking-wider mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    required
                    className="w-full bg-[#141414] border border-[#1a1a1a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#525252] focus:outline-none focus:border-[#2a2a2a] transition-colors"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#525252] font-mono tracking-wider mb-2">
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    required
                    minLength={8}
                    className="w-full bg-[#141414] border border-[#1a1a1a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#525252] focus:outline-none focus:border-[#2a2a2a] transition-colors"
                    placeholder="••••••••"
                  />
                  <p className="text-xs text-[#525252] mt-1">Min 8 characters</p>
                </div>

                <div>
                  <label className="block text-[10px] text-[#525252] font-mono tracking-wider mb-2">
                    CONFIRM PASSWORD
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateField("confirmPassword", e.target.value)}
                    required
                    className="w-full bg-[#141414] border border-[#1a1a1a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#525252] focus:outline-none focus:border-[#2a2a2a] transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </>
            )}

            <div className="flex gap-3">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 bg-[#141414] text-white rounded-lg text-sm font-medium hover:bg-[#1a1a1a] transition-colors duration-150"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-[#e5e5e5] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : step === 1 ? "Continue" : "Create account"}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-[#1a1a1a] text-center">
            <p className="text-sm text-[#525252]">
              Already have an account?{" "}
              <Link href="/login" className="text-white hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#525252] mt-6">
          © 2024 Cold Lava. All rights reserved.
        </p>
      </div>
    </div>
  );
}
