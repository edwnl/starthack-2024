"use client";

import BookBackground from "@/components/BookBackground";
import LargeSearchBar from "@/components/LargeSearchBar";
import { useAuth } from "@/contexts/AuthContext";
import { Typography } from "antd";

const { Title } = Typography;

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4">
      <div className="text-center lg:w-1/3 md:w-1/2 flex flex-col justify-center items-center">
        <BookBackground />
        <Title
          style={{ fontSize: "5rem", fontWeight: "200", marginBottom: 0 }}
          level={1}
        >
          Ace Your Studies with{" "}
          <span style={{ fontWeight: "500" }}>Groupzy</span>
        </Title>
        <Title
          style={{
            fontWeight: "200",
            marginTop: "0.5rem",
            marginBottom: "2rem",
          }}
          level={2}
        >
          Track, collaborate, and compete with study groups
          <span style={{ fontWeight: "500" }}> effortlessly</span>.
        </Title>
        <LargeSearchBar />
      </div>
    </div>
  );
}
