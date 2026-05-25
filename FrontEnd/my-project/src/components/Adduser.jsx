import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Adduser() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
    major: "",
    phone_number: "",
    date_of_birth: "",
    current_address: "",
    permanent_address: "",
    profile_picture: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // --- Handlers ---
  const handle = (field) => (e) => {
    const value = field === "profile_picture" ? e.target.files[0] : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  // --- Form Validation ---
  const validateForm = () => {
    const errors = [];
    
    if (!form.name.trim()) errors.push("Full name is required");
    if (!form.email.trim()) errors.push("Email is required");
    if (!form.email.includes("@")) errors.push("Valid email is required");
    if (!form.password) errors.push("Password is required");
    if (form.password.length < 6) errors.push("Password must be at least 6 characters");
    if (form.password !== form.password_confirmation) errors.push("Passwords do not match");
    if (!form.role) errors.push("Role is required");
    if (!form.major) errors.push("Major is required");
    
    if (errors.length > 0) {
      setError(errors.join(", "));
      return false;
    }
    return true;
  };

  // --- Reset Form ---
  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "",
      major: "",
      phone_number: "",
      date_of_birth: "",
      current_address: "",
      permanent_address: "",
      profile_picture: null,
    });
  };

  // --- Submit Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    
    // Validate form first
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    
    setLoading(true);

    try {
      // Create FormData for file upload support
      const formData = new FormData();
      
      // Add all fields to FormData
      Object.keys(form).forEach(key => {
        if (form[key] !== null && form[key] !== "") {
          formData.append(key, form[key]);
        }
      });

      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          // Don't set Content-Type header when using FormData - browser will set it with boundary
        },
        body: formData,
      });

      const data = await response.json();
      
      // Debug logging
      console.log("API Response:", data);
      console.log("Form data sent:", Object.fromEntries(formData));

      if (!response.ok) {
        // Handle validation errors from backend
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(", ");
          setError(errorMessages);
        } else {
          setError(data?.message || "Failed to create user.");
        }
        setLoading(false);
        return;
      }

      // Success - verify all data was saved
      const createdUser = data.user || data;
      console.log("User created successfully:", createdUser);
      console.log("Address fields saved:", {
        phone: createdUser.phone_number,
        dob: createdUser.date_of_birth,
        current_address: createdUser.current_address,
        permanent_address: createdUser.permanent_address
      });

      setSuccess(true);
      resetForm();
      
      // Redirect after 2 seconds
      setTimeout(() => navigate("/dashboard"), 2000);
      
    } catch (err) {
      console.error("Registration error:", err);
      setError("Network error. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageContainerStyle}>
      <style>{customCSS}</style>

      <div style={contentWrapperStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div>
            <div style={badgeStyle}>User Management</div>
            <h1 style={titleStyle}>Add New User</h1>
            <p style={subtitleStyle}>Register a new profile in the system.</p>
          </div>
          <button onClick={() => navigate("/dashboard")} style={backBtnStyle} className="cancel-btn">
            ← Back
          </button>
        </div>

        {/* Status Feedback */}
        {error && <div style={errorBoxStyle}>{error}</div>}
        {success && <div style={successBoxStyle}>User added successfully! Redirecting...</div>}

        <form onSubmit={handleSubmit}>
          {sections.map((section, si) => (
            <div key={section.title} style={{ ...sectionContainerStyle, animationDelay: `${si * 0.1}s` }}>
              <div style={sectionHeaderStyle}>
                <span style={{ fontSize: 11, color: "#c5c2bc" }}>{section.icon}</span>
                <span style={sectionTitleStyle}>{section.title}</span>
              </div>

              <div style={gridStyle}>
                {section.fields.map((field) => (
                  <div key={field.key} style={field.half ? {} : { gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>
                      {field.label} {field.required && <span style={{ color: "#e87c6a" }}>*</span>}
                    </label>
                    
                    {field.type === "select" ? (
                      <select 
                        className="edit-input" 
                        style={inputStyle} 
                        value={form[field.key]} 
                        onChange={handle(field.key)} 
                        required={field.required}
                      >
                        <option value="" disabled>Select {field.label.toLowerCase()}</option>
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : field.type === "file" ? (
                      <input
                        className="edit-input"
                        type="file"
                        accept="image/*"
                        style={inputStyle}
                        onChange={handle(field.key)}
                      />
                    ) : (
                      <input
                        className="edit-input"
                        type={field.type}
                        placeholder={field.placeholder || ""}
                        style={inputStyle}
                        value={form[field.key]}
                        onChange={handle(field.key)}
                        required={field.required}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={() => navigate("/dashboard")} 
              style={secondaryBtnStyle}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="save-btn" 
              disabled={loading || success} 
              style={primaryBtnStyle}
            >
              {loading ? "Creating..." : "Save User"}
            </button>
          </div>
        </form>

        {/* Debug Button - Remove in production */}
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <button
            type="button"
            onClick={async () => {
              const response = await fetch("http://localhost:8000/api/users");
              const users = await response.json();
              console.log("All users in database:", users);
              if (users.data && users.data.length > 0) {
                const lastUser = users.data[users.data.length - 1];
                console.log("Most recent user:", lastUser);
                alert(`Last user: ${lastUser.name}\nPhone: ${lastUser.phone_number || 'Not saved'}\nAddress: ${lastUser.current_address || 'Not saved'}`);
              }
            }}
            style={{ padding: "6px 12px", fontSize: 12, background: "#f0ede8", border: "none", borderRadius: 6, cursor: "pointer" }}
          >
            Debug: Check Last User
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Configuration ---
const sections = [
  {
    title: "Identity",
    icon: "○",
    fields: [
      { label: "Full name", key: "name", type: "text", placeholder: "John Doe", required: true, half: true },
      { label: "Email address", key: "email", type: "email", placeholder: "you@example.com", required: true, half: true },
      { label: "Password", key: "password", type: "password", placeholder: "********", required: true, half: true },
      { label: "Confirm Password", key: "password_confirmation", type: "password", placeholder: "********", required: true, half: true },
    ],
  },
  {
    title: "Classification",
    icon: "◇",
    fields: [
      { label: "Role", key: "role", type: "select", required: true, half: true, options: ["admin", "teacher", "student"] },
      { label: "Major", key: "major", type: "select", required: true, half: true, options: ["Software Development", "Cybersecurity", "AI Engineer", "Computer Science", "Law", "Business Administration"] },
    ],
  },
  {
    title: "Personal Details",
    icon: "△",
    fields: [
      { label: "Phone Number", key: "phone_number", type: "tel", placeholder: "012 345 678", required: false, half: true },
      { label: "Date of Birth", key: "date_of_birth", type: "date", required: false, half: true },
      { label: "Current Address", key: "current_address", type: "text", placeholder: "Phnom Penh", required: false, half: true },
      { label: "Permanent Address", key: "permanent_address", type: "text", placeholder: "Province", required: false, half: true },
      { label: "Profile Picture", key: "profile_picture", type: "file", required: false, half: false },
    ],
  },
];

// --- CSS & Styling ---
const customCSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=DM+Serif+Display&display=swap');
  @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
  .edit-input:focus { border-color: #1a1a1a !important; background: #fff !important; box-shadow: 0 0 0 3px rgba(0,0,0,0.02); }
  .save-btn:hover { background: #000 !important; transform: translateY(-1px); }
  .save-btn:active { transform: translateY(0); }
  .cancel-btn:hover { background: #f0ede8 !important; }
`;

const pageContainerStyle = { minHeight: "100vh", background: "#f8f7f4", fontFamily: "'DM Sans', sans-serif", padding: "40px 16px" };
const contentWrapperStyle = { maxWidth: 640, margin: "0 auto", animation: "fadeUp 0.4s ease both" };
const headerStyle = { marginBottom: 32, display: "flex", alignItems: "flex-start", justifyContent: "space-between" };
const badgeStyle = { fontSize: 10, color: "#9e9b95", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 };
const titleStyle = { fontFamily: "'DM Serif Display', serif", fontSize: 32, fontWeight: 400, color: "#1a1a1a", margin: 0 };
const subtitleStyle = { fontSize: 14, color: "#9e9b95", marginTop: 4 };
const backBtnStyle = { padding: "8px 16px", borderRadius: 8, border: "1px solid #e2e0db", background: "transparent", color: "#6b6860", fontSize: 13, cursor: "pointer" };
const inputStyle = { width: "100%", padding: "12px", fontSize: 14, border: "1px solid #e2e0db", borderRadius: 8, background: "#faf9f7", outline: "none", boxSizing: "border-box", transition: "all 0.2s" };
const labelStyle = { display: "block", fontSize: 11, fontWeight: 500, color: "#9e9b95", textTransform: "uppercase", marginBottom: 6, letterSpacing: "0.05em" };
const sectionContainerStyle = { background: "#fff", borderRadius: 12, border: "1px solid #e8e6e1", marginBottom: 16, overflow: "hidden", animation: "fadeUp 0.5s ease both" };
const sectionHeaderStyle = { padding: "14px 20px", borderBottom: "1px solid #f0ede8", display: "flex", alignItems: "center", gap: 10 };
const sectionTitleStyle = { fontSize: 11, fontWeight: 500, color: "#9e9b95", letterSpacing: "0.08em", textTransform: "uppercase" };
const gridStyle = { padding: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 };
const primaryBtnStyle = { flex: 2, padding: "12px", borderRadius: 8, border: "none", background: "#1a1a1a", color: "#fff", fontWeight: 500, cursor: "pointer", transition: "all 0.2s" };
const secondaryBtnStyle = { flex: 1, padding: "12px", borderRadius: 8, border: "1px solid #e2e0db", background: "transparent", color: "#6b6860", cursor: "pointer" };
const errorBoxStyle = { padding: "12px", borderRadius: 8, background: "#fff5f5", border: "1px solid #fecaca", color: "#dc2626", fontSize: 13, marginBottom: 20 };
const successBoxStyle = { padding: "12px", borderRadius: 8, background: "#f0fdf4", border: "1px solid #86efac", color: "#16a34a", fontSize: 13, marginBottom: 20 };

export default Adduser;