"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SignIn from "@/components/GoogleSignIn";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/skeleton/Paragraph";

export default function ProtectedPage({ children }) {
  const { user, loading } = useAuth();
  // const router = useRouter();

  // useEffect(() => {}, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? (
    children
  ) : (
    <div className="my-auto mx-auto text-center">
      <Title level={3} style={{ fontFamily: "Montserrat, sans-serif" }}>
        You must be logged in to view this page.
      </Title>
      <SignIn />
    </div>
  );
}
