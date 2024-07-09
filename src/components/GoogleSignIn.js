"use client";

import { useRouter } from "next/navigation";
import { Button, notification } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { signInWithGoogle } from "../../firebase/config";
import { createUserData } from "@/app/actions";

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const result = await signInWithGoogle();

      // Check if the user is new
      const userDataResult = await createUserData(result.user.uid);

      if (userDataResult.isNewUser) {
        // Redirect to create username page
        router.push("/create-username");
      } else {
        notification.success({
          message: "Signed In",
          description: "You have successfully signed in with Google.",
          placement: "bottomRight",
        });
        // Redirect to home page or dashboard
        router.push("/");
      }
    } catch (error) {
      console.error("Error signing in with Google", error);
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
      onClick={handleSignIn}
      icon={<GoogleOutlined />}
      type="primary"
    >
      Sign in
    </Button>
  );
}
