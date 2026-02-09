"use client";
import { useState } from "react";
import axios from "axios";
import styles from "./../register/register.module.scss";
import Button from "../_elements/button/button";

interface ILogin {
  handleClose: () => void;
  handleSignUpModalOpen: () => void;
}

export default function Login({ handleClose, handleSignUpModalOpen }: ILogin) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.access_token);
      window.dispatchEvent(new Event("auth-change"));

      handleClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModalAndOpenRegister = () => {
    handleClose();
    handleSignUpModalOpen();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <p>Not a member?</p>
        <button type="button" onClick={handleCloseModalAndOpenRegister}>
          Sign Up
        </button>
      </div>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <Button disabled={loading} size="medium">
        {loading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
