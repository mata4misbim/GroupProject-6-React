import { useState } from "react";
import { apiPatch } from "../lib/api";

export default function ProfileSetting() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setStatus("error");
      setMessage("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatus("error");
      setMessage("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setStatus("error");
      setMessage("Password must be at least 8 characters.");
      return;
    }

    setIsSubmitting(true);
    setStatus(null);
    setMessage("");

    try {
      const response = await apiPatch("/profile/password", {
        currentPassword,
        newPassword,
      });

      setStatus("success");
      setMessage(response.message || "Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Unable to update password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const strength = (() => {
    if (!newPassword) return 0;
    let s = 0;
    if (newPassword.length >= 8) s++;
    if (/[A-Z]/.test(newPassword)) s++;
    if (/[0-9]/.test(newPassword)) s++;
    if (/[^A-Za-z0-9]/.test(newPassword)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthBarColor = [
    "",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-400",
    "bg-green-500",
  ][strength];
  const strengthTextColor = [
    "",
    "text-red-400",
    "text-orange-400",
    "text-yellow-400",
    "text-green-400",
  ][strength];

  const EyeIcon = ({ open }) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {open ? (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      )}
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(99,102,241,0.08),transparent_70%)]" />

      <div className="w-full max-w-[480px] animate-[fadeUp_0.4s_ease-out_both]">
        {/* Header */}
        <div className="mb-9">
          <p className="text-xs text-white/30 tracking-[0.15em] uppercase mb-2">
            Account
          </p>
          <h1 className="text-[28px] font-bold text-white tracking-tight m-0">
            Profile Settings
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 backdrop-blur-md">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-7">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shrink-0">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-[15px] m-0">
                Change Password
              </p>
              <p className="text-white/35 text-xs m-0">
                Keep your account secure
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Current password */}
            <PasswordField
              label="Current Password"
              value={currentPassword}
              onChange={setCurrentPassword}
              show={showCurrent}
              onToggle={() => setShowCurrent((p) => !p)}
              EyeIcon={EyeIcon}
            />

            <div className="h-px bg-white/[0.06]" />

            {/* New password */}
            <PasswordField
              label="New Password"
              value={newPassword}
              onChange={setNewPassword}
              show={showNew}
              onToggle={() => setShowNew((p) => !p)}
              EyeIcon={EyeIcon}
            />

            {/* Strength bar */}
            {newPassword && (
              <div className="-mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`flex-1 h-[3px] rounded-full transition-all duration-300 ${
                        i <= strength ? strengthBarColor : "bg-white/[0.08]"
                      }`}
                    />
                  ))}
                </div>
                <p
                  className={`text-[11px] m-0 transition-colors duration-300 ${strengthTextColor}`}
                >
                  {strengthLabel}
                </p>
              </div>
            )}

            {/* Confirm password */}
            <PasswordField
              label="Confirm New Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              show={showConfirm}
              onToggle={() => setShowConfirm((p) => !p)}
              EyeIcon={EyeIcon}
              error={confirmPassword && confirmPassword !== newPassword}
            />

            {/* Status message */}
            {status && (
              <div
                className={`px-4 py-2.5 rounded-xl text-[13px] border ${
                  status === "success"
                    ? "bg-green-500/[0.08] border-green-500/20 text-green-400"
                    : "bg-red-500/[0.08] border-red-500/20 text-red-400"
                }`}
              >
                {message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold tracking-wide cursor-pointer border-none transition-all duration-200 hover:opacity-85 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  show,
  onToggle,
  EyeIcon,
  error,
}) {
  return (
    <div>
      <label className="block text-xs text-white/45 mb-1.5 tracking-[0.04em]">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full py-[11px] pl-[14px] pr-11 rounded-xl text-sm text-white bg-white/[0.04] outline-none transition-colors duration-200 font-['Plus_Jakarta_Sans',sans-serif]
            ${
              error
                ? "border border-red-500/40 focus:border-red-500/60"
                : "border border-white/10 focus:border-indigo-500/50"
            }`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-white/35 flex items-center p-0 hover:text-white/60 transition-colors"
        >
          <EyeIcon open={show} />
        </button>
      </div>
    </div>
  );
}
