"use client";

import { useAuth } from "@/contexts/AuthContext";
import GoogleSignIn from "@/components/GoogleSignIn";
import GoogleSignOut from "@/components/GoogleSignOut";
import Link from "next/link";
import { Typography, Button } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <Title level={2} className="mb-6">
          Welcome {user ? user.displayName : " to Groupzy"}!
        </Title>
        {user ? (
          <>
            <GoogleSignOut />
          </>
        ) : (
          <GoogleSignIn />
        )}
      </div>
    </div>
  );
}
