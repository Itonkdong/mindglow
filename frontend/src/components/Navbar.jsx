import { HeartPulse, LogOut } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = ["dashboard", "check-in", "history", "challenges", "recommendations", "assistant"];
  return (
    <nav className="nav">
      <Link className="brand" to="/"><HeartPulse size={24} /> MindGlow</Link>
      {user && <div className="nav-links">{links.map((link) => <NavLink key={link} to={`/${link}`}>{link.replace("-", " ")}</NavLink>)}</div>}
      <div className="nav-actions">
        {user ? <button className="icon-btn" onClick={() => { logout(); navigate("/"); }} title="Log out"><LogOut size={18} /></button> : <Link className="button ghost" to="/login">Login</Link>}
      </div>
    </nav>
  );
}
