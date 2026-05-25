import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const navItems = [
  { icon: "grid",        label: "Dashboard",         path: "/dashboard" },
  { icon: "book-open",   label: "Course Management",  path: "/dashboard/course" },
  { icon: "users",       label: "Student Management", path: "/dashboard/students" },
  { icon: "chalkboard",  label: "Teacher Management", path: "/dashboard/teachers" },
  { icon: "settings",    label: "Settings",           path: "/dashboard/settings" },
];

function NavIcon({ name }) {
  const icons = {
    grid: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    "book-open": (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    users: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    chalkboard: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8"/><path d="M12 17v4"/>
      </svg>
    ),
    settings: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  };
  return icons[name] || null;
}

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeLabel = navItems.find((item) => item.path === location.pathname)?.label || "Dashboard";

  const handleNav = (item) => {
    navigate(item.path);
  };

  // Read logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {cd  
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside style={{
      width: 220, minHeight: "100vh", background: "#0f172a",
      padding: "20px 14px", display: "flex", flexDirection: "column", gap: 28, flexShrink: 0,
    }}>
      {/* Brand */}
      <div style={{ padding: "0 10px" }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: "#f8fafc" }}>SIS Portal</div>
        <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>Academic Management</div>
      </div>

      {/* Nav links */}
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 2, padding: 0, margin: 0 }}>
        {navItems.map((item) => {
          const isActive = activeLabel === item.label;
          return (
            <li key={item.label}>
              <button
                onClick={() => handleNav(item)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 9,
                  padding: "8px 10px", borderRadius: 8, border: "none", cursor: "pointer",
                  background: isActive ? "rgba(99,102,241,0.18)" : "transparent",
                  color: isActive ? "#a5b4fc" : "#94a3b8",
                  fontSize: 13, textAlign: "left", transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#e2e8f0"; }}}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; }}}
              >
                <NavIcon name={item.icon} />
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Bottom — user + logout */}
      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%", background: "#6366f1",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 500, color: "#fff", flexShrink: 0,
          }}>
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#e2e8f0" }}>
              {user?.name || "Admin User"}
            </div>
            <div style={{ fontSize: 11, color: "#475569" }}>
              {user?.role || "Administrator"}
            </div>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          style={{
            display: "flex", alignItems: "center", gap: 9,
            padding: "8px 10px", borderRadius: 8, border: "none", cursor: "pointer",
            background: "transparent", color: "#64748b", fontSize: 13, width: "100%",
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.color = "#f87171"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b"; }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;