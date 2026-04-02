import React, { useState } from "react";
import { useRole } from "../context/useRole";
import {
  BookOpen,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { evaluationService } from "../services/api";

// view: 'portal' | 'signin' | 'signup' | 'forgot'
export default function Login() {
  const { setRole, setIsLoggedIn, setUserInfo } = useRole();

  const [view, setView] = useState("portal");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setResetToken("");
    setNewPassword("");
    setError("");
    setInfo("");
  };

  // Direct portal access (no credentials needed)
  const enterPortal = (role) => {
    setUserInfo({
      name: role === "student" ? "Student User" : "Lecturer User",
      email: "",
    });
    setRole(role);
    setIsLoggedIn(true);
  };

  // Authenticated login
  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    if (view === "signup" && !name.trim())
      return setError("Please enter your full name.");
    if (!email.trim()) return setError("Please enter your email.");
    if (password.length < 4)
      return setError("Password must be at least 4 characters.");

    try {
      if (view === "signup") {
        const response = await evaluationService.register({
          name,
          email,
          password,
        });
        const createdUser = response?.data?.user;

        if (!createdUser) {
          return setError("Account created, but user data was not returned.");
        }

        setUserInfo({ name: createdUser.name, email: createdUser.email });
        setRole(createdUser.role || "student");
        setIsLoggedIn(true);
        return;
      }

      const response = await evaluationService.login({ email, password });
      const loggedInUser = response?.data?.user;

      if (!loggedInUser) {
        return setError("Login succeeded, but user data was not returned.");
      }

      setUserInfo({ name: loggedInUser.name, email: loggedInUser.email });
      setRole(loggedInUser.role || "student");
      setIsLoggedIn(true);
    } catch (err) {
      const serverMessage = err?.response?.data?.error;
      setError(serverMessage || "Authentication failed. Please try again.");
    }
  };

  const handleForgotRequest = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!email.trim()) {
      return setError("Please enter your email.");
    }

    try {
      const response = await evaluationService.forgotPassword({ email });
      const serverToken = response?.data?.resetToken;
      setInfo(response?.data?.message || "Reset token generated.");
      if (serverToken) {
        setResetToken(serverToken);
      }
    } catch (err) {
      const serverMessage = err?.response?.data?.error;
      setError(serverMessage || "Failed to request reset token.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!email.trim()) {
      return setError("Please enter your email.");
    }
    if (!resetToken.trim()) {
      return setError("Please enter your reset token.");
    }
    if (newPassword.length < 4) {
      return setError("New password must be at least 4 characters.");
    }

    try {
      const response = await evaluationService.resetPassword({
        email,
        token: resetToken,
        newPassword,
      });
      setInfo(response?.data?.message || "Password reset successful.");
      setPassword("");
      setNewPassword("");
      setResetToken("");
    } catch (err) {
      const serverMessage = err?.response?.data?.error;
      setError(serverMessage || "Failed to reset password.");
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#fff",
    borderRadius: "12px",
    padding: "0.85rem 1rem",
    width: "100%",
    outline: "none",
    fontSize: "0.95rem",
    marginBottom: 0,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "600px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 0.75rem",
            }}
          >
            <BookOpen size={28} color="#fff" />
          </div>
          <h1 style={{ fontSize: "4rem", marginBottom: "4px" }}>
            AssignMate <span className="header-accent">Pro</span>
          </h1>
          <p style={{ color: "#aaa", fontSize: "1.3rem" }}>
            AI-powered academic evaluation platform
          </p>
        </div>

        <div className="card" style={{ marginBottom: 0 }}>
          {/* ── VIEW: PORTAL SELECTION ── */}
          {view === "portal" && (
            <>
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: "0.5rem",
                  fontSize: "1.5rem",
                }}
              >
                Choose Your Portal
              </h2>
              <p
                style={{
                  textAlign: "center",
                  color: "#aaa",
                  fontSize: "0.85rem",
                  marginBottom: "1.5rem",
                }}
              >
                Select a portal to continue as a guest, or sign in with your
                account below.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginBottom: "1.5rem",
                }}
              >
                <button
                  onClick={() => enterPortal("student")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "1.1rem 1.25rem",
                    borderRadius: "14px",
                    cursor: "pointer",
                    border: "1px solid rgba(193,191,255,0.3)",
                    background: "rgba(193,191,255,0.06)",
                    transition: "all 0.2s",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      background: "var(--color-primary)",
                      padding: "10px",
                      borderRadius: "10px",
                      color: "#1a1a2e",
                      flexShrink: 0,
                    }}
                  >
                    <GraduationCap size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontWeight: "700",
                        color: "#fff",
                        marginBottom: "4px",
                      }}
                    >
                      Student Portal
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "#888" }}>
                      Upload assignments & get AI feedback
                    </p>
                  </div>
                  <ArrowRight size={18} color="#555" />
                </button>

                <button
                  onClick={() => enterPortal("lecturer")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "1.1rem 1.25rem",
                    borderRadius: "14px",
                    cursor: "pointer",
                    border: "1px solid rgba(207,109,252,0.3)",
                    background: "rgba(207,109,252,0.06)",
                    transition: "all 0.2s",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      background: "var(--color-secondary)",
                      padding: "10px",
                      borderRadius: "10px",
                      color: "#1a1a2e",
                      flexShrink: 0,
                    }}
                  >
                    <ShieldCheck size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontWeight: "700",
                        color: "#fff",
                        marginBottom: "4px",
                      }}
                    >
                      Lecturer Portal
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "#888" }}>
                      Create rubrics & manage class analytics
                    </p>
                  </div>
                  <ArrowRight size={18} color="#555" />
                </button>
              </div>

              {/* Divider */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "1.25rem",
                }}
              >
                <div
                  style={{ flex: 1, height: "1px", background: "#ba9999ff" }}
                />
                <span style={{ color: "#ba9999ff", fontSize: "0.8rem" }}>
                  or continue with account
                </span>
                <div
                  style={{ flex: 1, height: "1px", background: "#ba9999ff" }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => {
                    reset();
                    setView("signin");
                  }}
                  className="btn btn-outline"
                  style={{ flex: 1 }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    reset();
                    setView("signup");
                  }}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  Create Account
                </button>
              </div>
            </>
          )}

          {/* ── VIEW: SIGN IN ── */}
          {view === "signin" && (
            <>
              <button
                onClick={() => {
                  reset();
                  setView("portal");
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#aaa",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "1.25rem",
                  fontSize: "0.88rem",
                }}
              >
                <ArrowLeft size={16} /> Back to portals
              </button>
              <h2 style={{ marginBottom: "1.25rem", fontSize: "1.3rem" }}>
                Sign In
              </h2>
              <form
                onSubmit={handleAuth}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: "0.82rem",
                      color: "#aaa",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    style={inputStyle}
                    type="email"
                    placeholder="you@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "0.82rem",
                      color: "#aaa",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      style={{ ...inputStyle, paddingRight: "3rem" }}
                      type={showPass ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((p) => !p)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#666",
                      }}
                    >
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                {error && (
                  <p
                    style={{
                      color: "#e74c3c",
                      fontSize: "0.85rem",
                      background: "rgba(231,76,60,0.1)",
                      padding: "0.6rem 0.875rem",
                      borderRadius: "8px",
                    }}
                  >
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", padding: "0.9rem" }}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setInfo("");
                    setPassword("");
                    setView("forgot");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--color-primary)",
                    cursor: "pointer",
                    fontWeight: "700",
                    textAlign: "center",
                    marginTop: "0.15rem",
                  }}
                >
                  Forgot password?
                </button>
                <p
                  style={{
                    textAlign: "center",
                    color: "#666",
                    fontSize: "0.85rem",
                  }}
                >
                  No account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                      setView("signup");
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--color-primary)",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Create one
                  </button>
                </p>
              </form>
            </>
          )}

          {/* ── VIEW: FORGOT / RESET ── */}
          {view === "forgot" && (
            <>
              <button
                onClick={() => {
                  setError("");
                  setInfo("");
                  setView("signin");
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#aaa",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "1.25rem",
                  fontSize: "0.88rem",
                }}
              >
                <ArrowLeft size={16} /> Back to sign in
              </button>

              <h2 style={{ marginBottom: "1.25rem", fontSize: "1.3rem" }}>
                Reset Password
              </h2>

              <form
                onSubmit={handleForgotRequest}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: "0.82rem",
                      color: "#aaa",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    style={inputStyle}
                    type="email"
                    placeholder="you@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-outline"
                  style={{ width: "100%", padding: "0.9rem" }}
                >
                  Request Reset Token
                </button>
              </form>

              <form
                onSubmit={handleResetPassword}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: "0.82rem",
                      color: "#aaa",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Reset Token
                  </label>
                  <input
                    style={inputStyle}
                    type="text"
                    placeholder="Paste token"
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    style={{
                      fontSize: "0.82rem",
                      color: "#aaa",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    New Password
                  </label>
                  <input
                    style={inputStyle}
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                {info && (
                  <p
                    style={{
                      color: "#2ecc71",
                      fontSize: "0.85rem",
                      background: "rgba(46,204,113,0.1)",
                      padding: "0.6rem 0.875rem",
                      borderRadius: "8px",
                    }}
                  >
                    {info}
                  </p>
                )}

                {error && (
                  <p
                    style={{
                      color: "#e74c3c",
                      fontSize: "0.85rem",
                      background: "rgba(231,76,60,0.1)",
                      padding: "0.6rem 0.875rem",
                      borderRadius: "8px",
                    }}
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", padding: "0.9rem" }}
                >
                  Reset Password
                </button>
              </form>
            </>
          )}

          {/* ── VIEW: SIGN UP ── */}
          {view === "signup" && (
            <>
              <button
                onClick={() => {
                  reset();
                  setView("portal");
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#aaa",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "1.25rem",
                  fontSize: "0.88rem",
                }}
              >
                <ArrowLeft size={16} /> Back to portals
              </button>
              <h2 style={{ marginBottom: "1.25rem", fontSize: "1.3rem" }}>
                Create Account
              </h2>
              <form
                onSubmit={handleAuth}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: "0.82rem",
                      color: "#aaa",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    style={inputStyle}
                    type="text"
                    placeholder="e.g. Samantha Perera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "0.82rem",
                      color: "#aaa",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    style={inputStyle}
                    type="email"
                    placeholder="you@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "0.82rem",
                      color: "#aaa",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      style={{ ...inputStyle, paddingRight: "3rem" }}
                      type={showPass ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((p) => !p)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#666",
                      }}
                    >
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#666",
                    background: "rgba(255,255,255,0.03)",
                    padding: "0.6rem 0.875rem",
                    borderRadius: "8px",
                  }}
                >
                  💡 Role is auto-detected from email. Use <em>lec</em> or{" "}
                  <em>staff</em> in your email for Lecturer access.
                </p>
                {error && (
                  <p
                    style={{
                      color: "#e74c3c",
                      fontSize: "0.85rem",
                      background: "rgba(231,76,60,0.1)",
                      padding: "0.6rem 0.875rem",
                      borderRadius: "8px",
                    }}
                  >
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", padding: "0.9rem" }}
                >
                  Create Account
                </button>
                <p
                  style={{
                    textAlign: "center",
                    color: "#666",
                    fontSize: "0.85rem",
                  }}
                >
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                      setView("signin");
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--color-primary)",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Sign In
                  </button>
                </p>
              </form>
            </>
          )}
        </div>

        <p
          style={{
            textAlign: "center",
            color: "#e9e9eeff",
            fontSize: "0.78rem",
            marginTop: "1rem",
          }}
        >
          AssignMate Pro · EchoBinary · University of Moratuwa
        </p>
      </div>
    </div>
  );
}
