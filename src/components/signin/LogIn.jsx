import { useState } from "react";

export default function LogIn({ onGoFan, onGoArtist, onGoForgot, onLogIn }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.trim().length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    return newErrors;
  };

  const handleLogIn = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      onLogIn({ email: email.trim() });
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#0e0e14] px-5 py-10 font-body">
      <div className="z-10 mb-8 flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#333] bg-[#1e1e2e] text-[13px] font-bold text-[#ccc]">
          A
        </div>
        <span className="text-lg font-medium text-[#e8e8f0]">AUDTLIST</span>
      </div>

      <div className="z-10 w-full max-w-[400px] rounded-2xl border border-[#2a2a3a] bg-[#16161f] p-8">
        <p className="text-center text-xl font-bold text-[#f0f0fa]">Log in</p>
        <p className="mb-7 mt-1.5 text-center text-[13px] leading-6 text-[#666]">
          Welcome back
        </p>

        {errors.form && (
          <p className="mb-3 text-[11px] text-[#ff6b6b]">{errors.form}</p>
        )}

        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-medium text-[#888]">
            Email
          </label>
          <input
            className="w-full rounded-lg border border-[#2a2a3a] bg-[#0e0e14] px-3.5 py-2.5 pr-10 text-sm text-[#e8e8f0] outline-none placeholder:text-[#444] focus:border-[#6644cc] aria-[invalid=true]:border-[#ff6b6b]"
            type="email"
            name="email"
            placeholder="you@mail.com"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
            }}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-[11px] text-[#ff6b6b]">
              {errors.email}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-medium text-[#888]">
            Password
          </label>
          <div className="relative">
            <input
              className="w-full rounded-lg border border-[#2a2a3a] bg-[#0e0e14] px-3.5 py-2.5 pr-16 text-sm text-[#e8e8f0] outline-none placeholder:text-[#444] focus:border-[#6644cc] aria-[invalid=true]:border-[#ff6b6b]"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: null }));
                }
              }}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            <button
              className="absolute right-2.5 top-1/2 flex h-7 min-w-12 -translate-y-1/2 items-center justify-center rounded-md bg-transparent px-2 text-xs font-medium text-[#888] transition-colors hover:text-[#aaa]"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="mt-1 text-[11px] text-[#ff6b6b]">
              {errors.password}
            </p>
          )}
          <button
            className="mt-1 block w-full bg-transparent text-right text-xs text-[#9977ee] hover:underline"
            onClick={onGoForgot}
            type="button"
          >
            Forgot password?
          </button>
        </div>

        <button
          className="mt-2 w-full rounded-[10px] border border-[#5533aa] bg-[#1e1030] p-3 text-[15px] font-bold text-[#c5b8ff] transition hover:bg-[#2a1845] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          onClick={handleLogIn}
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>

        <div className="mt-5 text-center text-xs leading-7 text-[#555]">
          Don't have an account?{" "}
          <button
            className="bg-transparent text-[#9977ee] hover:underline"
            onClick={onGoFan}
            type="button"
          >
            Sign up as a fan
          </button>{" "}
          or{" "}
          <button
            className="bg-transparent text-[#9977ee] hover:underline"
            onClick={onGoArtist}
            type="button"
          >
            an artist
          </button>
        </div>

        <p className="mt-2.5 text-center text-[11px] leading-5 text-[#555]">
          This site is protected by reCAPTCHA and the Google{" "}
          <a className="text-[#666]" href="#">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a className="text-[#666]" href="#">
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </div>
    </div>
  );
}
