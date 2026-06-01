import { useState } from "react";
import { Link } from "react-router-dom";
import logoB from "../../assets/landing-page/logob.png";

export default function ForgotPassword({ onGoLogIn }) {
  const [step, setStep] = useState("request");

  return (
    <div className="relative min-h-screen bg-[#03030f] flex items-center justify-center px-4 font-['Plus_Jakarta_Sans',sans-serif]">

      {/* Subtle bg glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0d0d6b]/20 blur-3xl" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-110">

        <div className="mt-0 rounded-2xl border border-white/8 bg-white/3 px-10 py-10 backdrop-blur-sm">

          {/* Logo — links to home */}
          <div className="flex justify-center mb-6 ml-[-2%]">
            <Link to="/">
              <img src={logoB} alt="AUDTLIST" className="h-28.75 w-auto object-contain brightness-0 invert hover:opacity-80 transition-opacity cursor-pointer" />
            </Link>
          </div>

          {step === "request" && (
            <>
              <h1 className="text-[30px] font-bold text-white leading-tight">
                Forgot password?
              </h1>
              <p className="text-[14px] text-white/45 mt-1.5 mb-7 leading-relaxed tracking-wide">
                Enter your email and we'll send you a reset link.
              </p>

              <div className="mb-5">
                <label className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-white/40 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@mail.com"
                  autoComplete="email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[15px] text-white placeholder:text-white/25 outline-none focus:border-white/30 focus:bg-white/8 transition-all"
                />
              </div>

              <button
                onClick={() => setStep("sent")}
                className="w-full py-3.5 rounded-xl bg-white text-[#03030f] text-[16px] font-bold tracking-wide hover:bg-white/90 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
              >
                Send reset link
              </button>

              <div className="mt-5 text-center text-[14px] text-white/35">
                <button onClick={onGoLogIn} className="text-white/60 hover:text-white transition-colors">
                  ← Back to log in
                </button>
              </div>
            </>
          )}

          {step === "sent" && (
            <>
              <div className="w-12 h-12 rounded-full bg-white/8 border border-white/10 flex items-center justify-center mb-6">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h1 className="text-[28px] font-bold text-white leading-tight mb-2">
                Check your inbox
              </h1>
              <p className="text-[15px] text-white/50 mb-8 leading-relaxed">
                We've sent a password reset link to your email. Check your spam folder too — the link expires in 30 minutes.
              </p>

              <button
                onClick={onGoLogIn}
                className="w-full py-3.5 rounded-xl bg-white text-[#03030f] text-[16px] font-bold tracking-wide hover:bg-white/90 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
              >
                Back to log in
              </button>

              <div className="mt-5 text-center text-[14px] text-white/35">
                Didn't receive it?{" "}
                <button onClick={() => setStep("request")} className="text-white/60 hover:text-white transition-colors underline-offset-2 hover:underline">
                  Resend email
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
