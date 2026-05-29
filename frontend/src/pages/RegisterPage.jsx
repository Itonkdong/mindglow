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
    <main className="auth-page">
      <form className="form-panel" onSubmit={submit}>
        <h1>Create account</h1>
        {["username", "email", "password", "confirm_password"].map((field) => (
          <input key={field} type={field.includes("password") ? "password" : "text"} placeholder={field.replace("_", " ")} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
        ))}
        {error && <p className="error">{error}</p>}
        <button className="button">Register</button>
        <p className="muted">Already joined? <Link to="/login">Login</Link></p>
      </form>
    </main>
  );
}
