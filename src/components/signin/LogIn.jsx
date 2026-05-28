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
    <div className="ka-root">
      <div className="ka-logo">
        <div className="ka-logo__icon">
          A
        </div>
        <span className="ka-logo__text">AUDTLIST</span>
      </div>

      <div className="ka-card ka-card--compact">
        <p className="ka-title">Log in</p>
        <p className="ka-subtitle">
          Welcome back
        </p>

        {errors.form && (
          <p className="ka-hint ka-hint--error">{errors.form}</p>
        )}

        <div className="ka-field">
          <label className="ka-label">
            Email
          </label>
          <input
            className="ka-input"
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
            <p id="email-error" className="ka-hint ka-hint--error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="ka-field">
          <label className="ka-label">
            Password
          </label>
          <div className="relative">
            <input
              className="ka-input pr-16"
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
              className="ka-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="ka-hint ka-hint--error">
              {errors.password}
            </p>
          )}
          <button
            className="ka-link-button"
            onClick={onGoForgot}
            type="button"
          >
            Forgot password?
          </button>
        </div>

        <button
          className="ka-btn"
          onClick={handleLogIn}
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>

        <div className="ka-footer">
          Don't have an account?{" "}
          <button
            className="ka-inline-button"
            onClick={onGoFan}
            type="button"
          >
            Sign up as a fan
          </button>{" "}
          or{" "}
          <button
            className="ka-inline-button"
            onClick={onGoArtist}
            type="button"
          >
            an artist
          </button>
        </div>

        <p className="ka-legal">
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="#">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#">
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </div>
    </div>
  );
}
