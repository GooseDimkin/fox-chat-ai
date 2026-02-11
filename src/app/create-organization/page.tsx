"use client";

import { useState } from "react";
import { Button, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

export default function CreateOrganizationPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name) return message.error("Enter organization name");

    const formData = new FormData();
    formData.append("name", name);
    if (file) formData.append("image", file);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:3001/organizations", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Organization created!");
      router.push("/organizations");
    } catch (e) {
      message.error("Failed to create organization");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create organization</h1>

      <Input
        placeholder="Organization name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Upload
        beforeUpload={(file) => {
          setFile(file);
          return false;
        }}
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Upload logo</Button>
      </Upload>

      <Button type="primary" loading={loading} onClick={handleCreate}>
        Create
      </Button>
    </div>
  );
}
