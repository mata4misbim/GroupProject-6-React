import { useState } from "react";

const ARTIST_GENRES = [
  "Rock", "Alternative", "Electronic", "Metal", "Pop", "Jazz",
  "Hip-hop / Rap", "Blues", "Classical", "J-pop", "K-pop", "Thai",
  "R&B", "หมอลำ", "EDM", "Anime", "DnB", "Other",
];

function ArtistGenreSelect({ value, error, onChange }) {
  return (
    <div className="ka-field">
      <label className="ka-label" htmlFor="artist-genre">
        Artist genre
      </label>
      <select
        id="artist-genre"
        className="ka-input ka-select"
        name="genre"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? "artist-genre-error" : undefined}
        required
      >
        <option value="">Select genre</option>
        {ARTIST_GENRES.map((genre) => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>
      {error && (
        <p id="artist-genre-error" className="ka-hint ka-hint--error">{error}</p>
      )}
    </div>
  );
}

const initialForm = {
  artistName: "",
  username: "",
  email: "",
  genre: "",
  password: "",
  confirmPassword: "",
  acceptedTerms: false,
};

export default function ArtistRegister({ onGoLogIn, onGoFan, onRegisterSuccess }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: null }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;

    if (!form.artistName.trim()) {
      nextErrors.artistName = "Artist or band name is required.";
    }
    if (!form.username.trim()) {
      nextErrors.username = "Username is required.";
    } else if (!usernamePattern.test(form.username.trim())) {
      nextErrors.username = "Use 3-20 letters, numbers, or underscores only.";
    }
    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }
    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }
    if (!form.genre) {
      nextErrors.genre = "Please select a genre.";
    }
    if (!form.acceptedTerms) {
      nextErrors.acceptedTerms = "You must agree to the terms to continue.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setIsSubmitted(false);
      return;
    }
    setErrors({});
    setIsSubmitted(true);
    if (onRegisterSuccess) setTimeout(onRegisterSuccess, 1200);
  };

  return (
    <div className="ka-register-page">
      <div className="ka-register-card">

        {/* Left: image panel */}
        <div className="ka-register-card__hero">
          <img src="/covers/signupart.jpg" alt="" aria-hidden="true" />
        </div>

        {/* Right: form panel */}
        <div className="ka-register-card__side">
          <form onSubmit={handleSubmit} noValidate>
            <p className="ka-title">Create artist account</p>
            <p className="ka-subtitle">
              Join as an artist and start sharing your music
            </p>

            <div className="ka-tabs" role="tablist" aria-label="Account type">
              <button className="ka-tab" type="button" onClick={onGoFan}>
                Fan
              </button>
              <button className="ka-tab ka-tab--active" type="button">
                Artist
              </button>
            </div>

            {isSubmitted && (
              <p className="ka-hint ka-hint--success" role="status">
                Account details look good. You can now log in.
              </p>
            )}

            <div className="ka-field">
              <label className="ka-label" htmlFor="artist-name">
                Artist or band name
              </label>
              <input
                id="artist-name"
                className="ka-input"
                type="text"
                name="organization"
                placeholder="The Midnight"
                autoComplete="organization"
                value={form.artistName}
                onChange={(e) => updateField("artistName", e.target.value)}
                aria-invalid={!!errors.artistName}
                aria-describedby={errors.artistName ? "artist-name-error" : undefined}
                required
              />
              {errors.artistName && (
                <p id="artist-name-error" className="ka-hint ka-hint--error">{errors.artistName}</p>
              )}
            </div>

            <div className="ka-row">
              <div className="ka-field">
                <label className="ka-label" htmlFor="artist-username">Username</label>
                <input
                  id="artist-username"
                  className="ka-input"
                  type="text"
                  name="username"
                  placeholder="artistname"
                  autoComplete="username"
                  value={form.username}
                  onChange={(e) => updateField("username", e.target.value)}
                  aria-invalid={!!errors.username}
                  aria-describedby={errors.username ? "artist-username-error" : "artist-username-hint"}
                  required
                />
                {errors.username ? (
                  <p id="artist-username-error" className="ka-hint ka-hint--error">{errors.username}</p>
                ) : (
                  <p id="artist-username-hint" className="ka-hint">Letters, numbers, and underscores only.</p>
                )}
              </div>

              <div className="ka-field">
                <label className="ka-label" htmlFor="artist-email">Email</label>
                <input
                  id="artist-email"
                  className="ka-input"
                  type="email"
                  name="email"
                  placeholder="you@mail.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "artist-email-error" : undefined}
                  required
                />
                {errors.email && (
                  <p id="artist-email-error" className="ka-hint ka-hint--error">{errors.email}</p>
                )}
              </div>
            </div>

            <ArtistGenreSelect
              value={form.genre}
              error={errors.genre}
              onChange={(val) => updateField("genre", val)}
            />

            <div className="ka-row">
              <div className="ka-field">
                <label className="ka-label" htmlFor="artist-password">Password</label>
                <input
                  id="artist-password"
                  className="ka-input"
                  type="password"
                  name="new-password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "artist-password-error" : "artist-password-hint"}
                  minLength={8}
                  required
                />
                {errors.password ? (
                  <p id="artist-password-error" className="ka-hint ka-hint--error">{errors.password}</p>
                ) : (
                  <p id="artist-password-hint" className="ka-hint">Use at least 8 characters.</p>
                )}
              </div>

              <div className="ka-field">
                <label className="ka-label" htmlFor="artist-confirm-password">Confirm password</label>
                <input
                  id="artist-confirm-password"
                  className="ka-input"
                  type="password"
                  name="confirm-password"
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={(e) => updateField("confirmPassword", e.target.value)}
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? "artist-confirm-password-error" : undefined}
                  required
                />
                {errors.confirmPassword && (
                  <p id="artist-confirm-password-error" className="ka-hint ka-hint--error">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="ka-check">
              <input
                type="checkbox"
                className="ka-checkbox"
                id="artist-terms"
                checked={form.acceptedTerms}
                onChange={(e) => updateField("acceptedTerms", e.target.checked)}
                aria-invalid={!!errors.acceptedTerms}
                aria-describedby={errors.acceptedTerms ? "artist-terms-error" : undefined}
                required
              />
              <label htmlFor="artist-terms" className="ka-check__label">
                I agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
              </label>
            </div>
            {errors.acceptedTerms && (
              <p id="artist-terms-error" className="ka-hint ka-hint--error">{errors.acceptedTerms}</p>
            )}

            <button className="ka-btn" type="submit">Create account</button>

            <div className="ka-footer">
              Already have an account? <a onClick={onGoLogIn}>Log in</a>
              <br />
              Not an artist? <a onClick={onGoFan}>Create a fan account</a>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
