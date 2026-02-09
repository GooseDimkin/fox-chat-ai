"use client";
import { useState } from "react";
import axios from "axios";
import styles from "./../register/register.module.scss";
import { Button, Flex } from "antd";

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
        <Flex gap="5px" align="center">
          <p>Not a member?</p>
          <Button
            type="text"
            variant="link"
            size="small"
            color="orange"
            onClick={handleCloseModalAndOpenRegister}
          >
            Sign up
          </Button>
        </Flex>
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

      <Button size="large" variant="solid" color="orange" loading={loading}>
        Sign in
      </Button>
    </form>
  );
}
