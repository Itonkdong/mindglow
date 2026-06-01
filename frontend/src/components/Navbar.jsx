import { HeartPulse, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const links = ["dashboard", "check-in", "history", "challenges", "recommendations"];
  const publicLinks = [
    ["about", "About us"],
    ["privacy", "Privacy"],
    ["terms", "Terms"],
  ];
  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenu();
    navigate("/");
  }

  return (
    <>
      <nav className="nav">
        <Link className="brand" to="/"><HeartPulse size={24} /> MindGlow</Link>
        <div className="nav-links">
          {links.map((link) => (
            user
              ? <NavLink key={link} to={`/${link}`}>{link.replace("-", " ")}</NavLink>
              : <Link key={link} to="/login">{link.replace("-", " ")}</Link>
          ))}
        </div>
        <div className="nav-actions">
          {!user && <Link className="button ghost" to="/login">Login</Link>}
          <button className="menu-toggle" onClick={() => setMenuOpen(true)} title="Open menu"><Menu size={22} /></button>
        </div>
      </nav>
      {menuOpen && <button className="side-menu-backdrop" aria-label="Close menu" onClick={closeMenu} />}
      <aside className={`side-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="side-menu-head">
          <Link className="brand" to="/" onClick={closeMenu}><HeartPulse size={24} /> MindGlow</Link>
          <button className="icon-btn" onClick={closeMenu} title="Close menu"><X size={18} /></button>
        </div>
        <div className="side-menu-section">
          <span className="eyebrow">Information</span>
          {publicLinks.map(([path, label]) => <NavLink key={path} to={`/${path}`} onClick={closeMenu}>{label}</NavLink>)}
        </div>
        {user && <div className="side-menu-section">
          <span className="eyebrow">Account</span>
          <button className="side-menu-action" onClick={handleLogout}><LogOut size={18} /> Logout</button>
        </div>}
      </aside>
    </>
  );
}
