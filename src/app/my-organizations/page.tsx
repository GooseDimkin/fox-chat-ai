"use client";
import { useEffect, useState } from "react";
import { Button, Card } from "antd";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import Header from "@/components/header/header";

const MyOrganizationsPage = () => {
  const router = useRouter();
  const [authReady, setAuthReady] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
    setAuthReady(true);
  }, []);

  useEffect(() => {
    if (authReady && !isAuth) {
      router.push("/");
    }
  }, [authReady, isAuth, router]);

  if (!authReady) return null;

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>My Organizations</h1>
        </div>

        <div className={styles.grid}>
          <Card title="Organization 1">Coming soon...</Card>
        </div>
      </div>
    </>
  );
};

export default MyOrganizationsPage;
