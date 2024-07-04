"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Typography } from "antd";

const { Title } = Typography;

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <Title
          style={{ fontSize: "5rem", fontWeight: "200" }}
          level={1}
          className="mb-6"
        >
          Ace Your Studies with{" "}
          <span style={{ fontWeight: "500" }}>Groupzy</span>
        </Title>
      </div>
    </div>
  );
}
