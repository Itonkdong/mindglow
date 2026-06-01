import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm_password: "" });
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    try {
      await register(form);
      navigate("/dashboard");
    } catch {
      setError("Could not create your account. Check the fields and try again.");
    }
  }

  return (
    <main className="auth-page register-auth">
      <section className="auth-shell">
        <div className="auth-copy">
          <span className="eyebrow">Start gently</span>
          <h1>Create your private space.</h1>
          <p>Track one check-in per day, notice patterns over time, and get small next steps when things feel heavy.</p>
        </div>
        <form className="form-panel auth-card register-card" onSubmit={submit}>
          <div className="auth-card-head">
            <h2>Create account</h2>
          </div>
          <div className="register-fields">
            <label>Username<input autoComplete="username" placeholder="Choose a username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /></label>
            <label>Email<input autoComplete="email" placeholder="you@example.com" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
            <label>Password<input autoComplete="new-password" placeholder="Create a password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
            <label>Confirm password<input autoComplete="new-password" placeholder="Repeat your password" type="password" value={form.confirm_password} onChange={(e) => setForm({ ...form, confirm_password: e.target.value })} /></label>
          </div>
          <label className="policy-check">
            <input type="checkbox" checked disabled readOnly />
            <span>I accept the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.</span>
          </label>
          {error && <p className="error">{error}</p>}
          <button className="button full">Register</button>
          <p className="auth-switch">Already joined? <Link to="/login">Login</Link></p>
        </form>
      </section>
    </main>
  );
}
