"use client";
import { useState } from "react";
import axios from "axios";
import styles from "./register.module.scss";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3001/auth/register", {
        email,
        password,
      });

      alert(`Registered: ${res.data.email}`);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label>Password</label>
        <input
          type="password"
          placeholder="Minimum 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <button className={styles.submit} disabled={loading}>
        {loading ? "Creating account..." : "Create account"}
      </button>

      <p className={styles.footerText}>
        By signing up you agree to our <span>Terms</span> & <span>Privacy</span>
      </p>
    </form>
  );
}
