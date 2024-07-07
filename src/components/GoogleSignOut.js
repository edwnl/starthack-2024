"use client";

import { Button, notification } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Redirect to the landing page
      router.push("/");

      await signOut(auth);

      // Show success notification
      notification.success({
        message: "Signed Out",
        description: "You have been successfully signed out.",
        placement: "bottomRight",
      });
    } catch (error) {
      console.error("Error signing out", error);

      // Show error notification
      notification.error({
        message: "Sign Out Failed",
        description: "An error occurred while signing out. Please try again.",
        placement: "bottomRight",
      });
    }
  };

  return (
    <Button
      className="flex items-center justify-center h-8"
      onClick={handleSignOut}
      icon={<LogoutOutlined />}
    >
      Sign Out
    </Button>
  );
}
