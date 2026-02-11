"use client";

import { useEffect, useState } from "react";
import { Button, Card } from "antd";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import Header from "@/components/header/header";
import axios from "axios";

const MyOrganizationsPage = () => {
  const router = useRouter();
  const [authReady, setAuthReady] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [organizations, setOrganizations] = useState<any[]>([]);

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

  useEffect(() => {
    if (!isAuth) return;

    const fetchOrganizations = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3001/organizations/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrganizations(res.data);
    };

    fetchOrganizations();
  }, [isAuth]);

  if (!authReady) return null;

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>My Organizations</h1>
        </div>

        <div className={styles.grid}>
          {organizations.length === 0 ? (
            <Card className={styles.emptyCard}>
              <h3>No organizations yet</h3>
              <p>Create your first organization</p>
              <Button
                type="primary"
                onClick={() => router.push("/create-organization")}
              >
                + Create organization
              </Button>
            </Card>
          ) : (
            organizations.map((org) => (
              <Card key={org.id} title={org.name}>
                <img src={org.imageUrl} style={{ width: "100%" }} />
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrganizationsPage;
