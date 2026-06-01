import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    try {
      await login(form);
      navigate("/dashboard");
    } catch {
      setError("Could not log in with those details.");
    }
  }

  return (
    <main className="auth-page login-auth">
      <section className="auth-shell">
        <div className="auth-copy">
          <span className="eyebrow">Welcome back</span>
          <h1>Pick up where your day left off.</h1>
          <p>Sign in to see your check-ins, wellbeing patterns, recommendations, and daily challenges.</p>
        </div>
        <form className="form-panel auth-card login-card" onSubmit={submit}>
          <div className="auth-card-head">
            <h2>Login</h2>
            <p>Use your MindGlow account details.</p>
          </div>
          <label>Username<input autoComplete="username" placeholder="Your username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /></label>
          <label>Password<input autoComplete="current-password" placeholder="Your password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
          {error && <p className="error">{error}</p>}
          <button className="button full">Login</button>
          <p className="auth-switch">New here? <Link to="/register">Create an account</Link></p>
        </form>
      </section>
    </main>
  );
}
