"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { user, login, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError("Invalid email or password");
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

        {/* Login form */}
        <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-8">
          <div className="mb-6">
            <h2 className="text-xl font-medium text-white mb-1">Welcome back</h2>
            <p className="text-sm text-[#525252]">Sign in to manage your AI team</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] text-[#525252] font-mono tracking-wider mb-2">
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#141414] border border-[#1a1a1a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#525252] focus:outline-none focus:border-[#2a2a2a] transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[#737373] cursor-pointer">
                <input type="checkbox" className="rounded border-[#1a1a1a] bg-[#141414]" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-[#737373] hover:text-white transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-[#e5e5e5] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#1a1a1a] text-center">
            <p className="text-sm text-[#525252]">
              Don't have an account?{" "}
              <Link href="/signup" className="text-white hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Demo hint */}
        <div className="mt-4 p-3 bg-[#141414] border border-[#1a1a1a] rounded-lg text-center">
          <p className="text-xs text-[#525252]">
            Demo: Enter any email/password to sign in
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#525252] mt-6">
          © 2024 Cold Lava. All rights reserved.
        </p>
      </div>
    </div>
  );
}
