"use client";
import { useState } from "react";
import axios from "axios";
import styles from "./register.module.scss";
import Button from "../_elements/button/button";

interface IRegister {
  handleClose: () => void;
  handleSignInModalOpen: () => void;
}

export default function Register({
  handleClose,
  handleSignInModalOpen,
}: IRegister) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await axios.post("http://localhost:3001/auth/register", {
        email,
        password,
      });

      handleClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Something went wrong. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModalAndOpenSignIn = () => {
    handleClose();
    handleSignInModalOpen();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <p>Already a member?</p>
        <button onClick={handleCloseModalAndOpenSignIn}>Sign In</button>
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
        {loading ? "Creating account..." : "Create account"}
      </Button>

      <p className={styles.footerText}>
        By signing up you agree to our <span>Terms</span> & <span>Privacy</span>
      </p>
    </form>
  );
}
