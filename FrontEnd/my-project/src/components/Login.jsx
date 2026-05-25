import Logo from "../assets/SISLogo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const redirectByRole = (role) => {
    switch (role) {
      case "admin":
        return navigate("/dashboard");
      case "teacher":
        return navigate("/teacher");
      case "student":
        return navigate("/student");
      default:
        return navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.errors) {
          setError(Object.values(data.errors)[0][0]);
        } else {
          setError(data.message || "Login failed");
        }
        return;
      }
      if (data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        redirectByRole(data.user.role);
      } else {
        setError("Unexpected response from server");
      }
    } catch (err) {
      setError("Server not reachable. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex w-full max-w-3xl rounded-xl overflow-hidden shadow-lg border border-gray-200">
        {/* ── Left brand panel ── */}
        <div
          className="relative hidden md:flex flex-col justify-between w-1/2 p-10 overflow-hidden"
          style={{ background: "#0F2456" }}
        >
          {/* Geometric SVG background */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 340 600"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <line
              x1="0"
              y1="480"
              x2="340"
              y2="240"
              stroke="rgba(59,130,246,0.15)"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="540"
              x2="340"
              y2="300"
              stroke="rgba(59,130,246,0.10)"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="600"
              x2="340"
              y2="360"
              stroke="rgba(59,130,246,0.08)"
              strokeWidth="1"
            />
            <line
              x1="60"
              y1="600"
              x2="340"
              y2="420"
              stroke="rgba(59,130,246,0.07)"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="420"
              x2="200"
              y2="600"
              stroke="rgba(59,130,246,0.06)"
              strokeWidth="1"
            />
            <polygon
              points="170,320 270,440 70,440"
              fill="rgba(59,130,246,0.06)"
              stroke="rgba(59,130,246,0.18)"
              strokeWidth="0.8"
            />
            <polygon
              points="60,360 200,500 0,520"
              fill="rgba(96,165,250,0.04)"
              stroke="rgba(96,165,250,0.12)"
              strokeWidth="0.8"
            />
            <polygon
              points="220,280 340,380 200,450"
              fill="rgba(59,130,246,0.05)"
              stroke="rgba(59,130,246,0.14)"
              strokeWidth="0.8"
            />
            <circle
              cx="170"
              cy="200"
              r="90"
              fill="none"
              stroke="rgba(96,165,250,0.08)"
              strokeWidth="40"
            />
            <circle
              cx="170"
              cy="200"
              r="50"
              fill="none"
              stroke="rgba(96,165,250,0.06)"
              strokeWidth="1"
            />
            <circle
              cx="280"
              cy="80"
              r="60"
              fill="none"
              stroke="rgba(59,130,246,0.10)"
              strokeWidth="30"
            />
            <line
              x1="80"
              y1="100"
              x2="260"
              y2="460"
              stroke="rgba(96,165,250,0.07)"
              strokeWidth="0.5"
            />
            <line
              x1="20"
              y1="200"
              x2="320"
              y2="350"
              stroke="rgba(96,165,250,0.06)"
              strokeWidth="0.5"
            />
            <circle cx="80" cy="420" r="3" fill="rgba(96,165,250,0.40)" />
            <circle cx="260" cy="380" r="2" fill="rgba(96,165,250,0.30)" />
            <circle cx="170" cy="480" r="2.5" fill="rgba(96,165,250,0.35)" />
            <circle cx="300" cy="300" r="2" fill="rgba(96,165,250,0.25)" />
            <circle cx="40" cy="340" r="1.5" fill="rgba(96,165,250,0.30)" />
          </svg>

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center">
              <img
                src={Logo}
                alt="SIS Logo"
                className="w-7 h-7 object-contain rounded-2xl "
              />
            </div>
            <span className="text-white font-semibold text-3xl tracking-wide">
              SISAnalytic
            </span>
          </div>

          {/* Headline */}
          <div className="relative z-10">
            <h2
              className="text-3xl font-bold text-white leading-snug"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Elevating
              <br />
              <span style={{ color: "#60A5FA" }}>Academic</span>
              <br />
              Excellence
            </h2>
            <p
              className="mt-3 text-xs leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              A unified platform for insights, tracking,
              <br />
              and academic growth across your institution.
            </p>
          </div>

          {/* Feature bullets */}
          <div className="relative z-10 flex flex-col gap-2">
            {[
              "Real-time performance tracking",
              "Role-based dashboards",
              "Secure institutional access",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#3B82F6" }}
                />
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.60)" }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right form panel ── */}
        <div className="flex flex-col justify-center w-full md:w-1/2 p-10 bg-white">
          <h2
            className="text-xl font-semibold text-gray-900 mb-1"
            style={{ fontFamily: "Manrope" }}
          >
            Welcome back
          </h2>
          <p
            className="text-xs text-gray-500 mb-7"
            style={{ fontFamily: "Manrope" }}
          >
            Sign in to your account to continue
          </p>

          {/* Error */}
          {error && (
            <div
              className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200
                                        text-xs rounded-lg px-3 py-2.5 mb-4"
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" />
                <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                className="block text-xs font-medium uppercase tracking-widest text-gray-500 mb-1.5"
                style={{ fontFamily: "Manrope" }}
              >
                Email address
              </label>
              <input
                type="email"
                placeholder="you@gmail.com"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200
                                           bg-gray-50 text-gray-900 placeholder-gray-400
                                           focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  className="text-xs font-medium uppercase tracking-widest text-gray-500"
                  style={{ fontFamily: "Manrope" }}
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-blue-500 hover:text-blue-700 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 text-sm rounded-lg border border-gray-200
                                               bg-gray-50 text-gray-900 placeholder-gray-400
                                               focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
                                               hover:text-blue-500 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    /* Eye-off icon */
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    /* Eye icon */
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="flex space-x-2">
              <p className="text-xs">Do you have an account ? </p>
              <button
                type="button"
                className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Create Account
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg
                                       text-sm font-medium text-white transition-colors
                                       disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: loading ? "#1D4ED8" : "#1D4ED8" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#1E40AF")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#1D4ED8")
              }
            >
              {loading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <hr className="flex-1 border-gray-100" />
              <span className="text-xs text-gray-400">or</span>
              <hr className="flex-1 border-gray-100" />
            </div>

            {/* Staff login */}
            <button
              // dont for get to add this button to onclick to make it work
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg
                                       border border-gray-200 bg-white text-gray-600 text-sm font-medium
                                       hover:bg-gray-50 transition-colors"
              style={{ fontFamily: "Manrope" }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
              Sign in as staff / faculty
            </button>
          </form>

          <p
            className="text-center text-xs text-gray-400 mt-6"
            style={{ fontFamily: "Manrope" }}
          >
            © 2025 SISAnalytic · All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
