"use client";
import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";
import { Button } from "antd";
import { CompassOutlined } from "@ant-design/icons";
import Link from "next/link";
import Modal from "../_elements/modal/modal";
import Register from "../register/register";
import Login from "../login/login";

interface IHeader {
  isRegisterModalOpen?: boolean;
}

const Header: React.FC<IHeader> = ({ isRegisterModalOpen }: IHeader) => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (isRegisterModalOpen) {
      setIsRegisterOpen(true);
    } else {
      setIsRegisterOpen(false);
    }
  }, [isRegisterModalOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuth(!!token);
      setAuthReady(true);
    };

    checkAuth();

    window.addEventListener("auth-change", checkAuth);
    return () => window.removeEventListener("auth-change", checkAuth);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <div className={styles.logoContainer}>
            <img src="images/logo.png" alt="FoxChatAi" />
          </div>
        </Link>
        <nav>
          <a href="#industries">Industries</a>
          <a href="#plans">Plans</a>
          <a href="#contact">Contacts</a>
        </nav>
        <nav>
          <div className={styles.buttonsWrapper}>
            {!authReady ? null : !isAuth ? (
              <>
                <Button
                  color="orange"
                  variant="solid"
                  size="small"
                  onClick={() => setIsLoginOpen(true)}
                >
                  Sign in
                </Button>

                <Button
                  type="text"
                  variant="text"
                  size="small"
                  style={{ color: "white" }}
                  onClick={() => setIsRegisterOpen(true)}
                >
                  Sign up
                </Button>
              </>
            ) : (
              <div style={{ display: "flex", gap: "10px" }}>
                <Link href="/my-organizations">
                  <Button
                    variant="solid"
                    color="orange"
                    icon={<CompassOutlined />}
                  >
                    My organizations
                  </Button>
                </Link>

                <Button
                  variant="link"
                  type="text"
                  style={{ color: "white" }}
                  onClick={handleLogout}
                >
                  Sign out
                </Button>
              </div>
            )}
          </div>
        </nav>
      </header>
      <Modal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        title="Sign Up"
      >
        <Register
          handleClose={() => setIsRegisterOpen(false)}
          handleSignInModalOpen={() => setIsLoginOpen(true)}
        />
      </Modal>
      <Modal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        title="Sign In"
      >
        <Login
          handleClose={() => setIsLoginOpen(false)}
          handleSignUpModalOpen={() => setIsRegisterOpen(true)}
        />
      </Modal>
    </>
  );
};

export default Header;
