"use client";

import { auth } from "../../firebase/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button, notification } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

export default function SignIn() {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);

      // Show success notification
      notification.success({
        message: "Signed In",
        description: "You have successfully signed in with Google.",
        placement: "bottomRight",
      });
    } catch (error) {
      console.error("Error signing in with Google", error);

      // Show error notification
      notification.error({
        message: "Sign In Failed",
        description: "An error occurred while signing in. Please try again.",
        placement: "bottomRight",
      });
    }
  };

  return (
    <Button
      className="items-center justify-center h-8"
      onClick={signInWithGoogle}
      icon={<GoogleOutlined />}
      type="primary"
    >
      Sign in
    </Button>
  );
}
