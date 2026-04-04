import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [privateData, setPrivateData] = useState(null);

  // Private route test করো
  useEffect(() => {
    const fetchPrivate = async () => {
      const res = await fetch("/api/home/private", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPrivateData(data.message);
    };
    fetchPrivate();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🏠 Home Page</h1>
        <p style={styles.subtitle}>
          এটা Private Route, শুধু logged in user দেখতে পারবে
        </p>

        <div style={styles.infoBox}>
          <p>
            <strong>👤 নাম:</strong> {user?.name}
          </p>
          <p>
            <strong>📧 Email:</strong> {user?.email}
          </p>
        </div>

        {privateData && (
          <div style={styles.privateBox}>
            <p>🔒 Backend Private Route Response:</p>
            <p style={{ color: "#4CAF50" }}>{privateData}</p>
          </div>
        )}

        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f0f2f5",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  title: { textAlign: "center", marginBottom: "8px" },
  subtitle: { textAlign: "center", color: "#888", marginBottom: "24px" },
  infoBox: {
    background: "#f9f9f9",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "16px",
  },
  privateBox: {
    background: "#e8f5e9",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "24px",
  },
  logoutBtn: {
    width: "100%",
    padding: "12px",
    background: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};
