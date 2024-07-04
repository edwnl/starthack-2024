"use client";

import BookBackground from "@/components/BookBackground";
import { useAuth } from "@/contexts/AuthContext";
import { Typography } from "antd";

const { Title } = Typography;

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-center p-4">
      <div className="text-center w-1/3 flex flex-col justify-center items-center">
        <BookBackground />
        <Title
          style={{ fontSize: "5rem", fontWeight: "200" }}
          level={1}
          className="mb-6"
        >
          Ace Your Studies with{" "}
          <span style={{ fontWeight: "500" }}>Groupzy</span>
        </Title>
        <Title style={{ fontWeight: "200" }} level={2}>
          Track, collaborate, and compete with study groups
          <span style={{ fontWeight: "500" }}> effortlessly</span>.
        </Title>
      </div>
    </div>
  );
}
