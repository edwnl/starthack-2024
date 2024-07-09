"use client";

import { useState } from "react";
import { Input, Button, notification } from "antd";
import { useRouter } from "next/navigation";
import { createUserData } from "@/app/actions";
import { auth, signInWithGoogle } from "../../../firebase/config";

export default function CreateUsername() {
  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUsernameSubmit = async () => {
    if (username.trim() === "" || username.length > 16) {
      setIsUsernameValid(false);
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No user found");
      }

      const result = await createUserData(user.uid, username);
      if (result.success) {
        notification.success({
          message: "Username Set",
          description:
            "Your username has been set successfully. You will now be signed in.",
          placement: "bottomRight",
        });

        router.push("/"); // Redirect to home page or dashboard
      } else if (result.error === "Username already exists") {
        setIsUsernameValid(false);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error setting username", error);
      notification.error({
        message: "Error",
        description:
          "An error occurred while setting your username. Please try again.",
        placement: "bottomRight",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col mx-auto mt-10 max-w-3xl items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Create Your Username</h1>
      <p className="mb-4">Please choose a unique username to continue:</p>
      <Input
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setIsUsernameValid(true);
        }}
        status={isUsernameValid ? "" : "error"}
        className="mb-4"
      />
      {!isUsernameValid && (
        <p className="text-red-500 mb-4">
          Please enter a valid, unique username.
        </p>
      )}
      <Button
        type="primary"
        onClick={handleUsernameSubmit}
        loading={loading}
        className="w-full"
      >
        Set Username
      </Button>
    </div>
  );
}
