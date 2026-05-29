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
    <main className="auth-page">
      <form className="form-panel" onSubmit={submit}>
        <h1>Welcome back</h1>
        <input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="error">{error}</p>}
        <button className="button">Login</button>
        <p className="muted">New here? <Link to="/register">Create an account</Link></p>
      </form>
    </main>
  );
}
