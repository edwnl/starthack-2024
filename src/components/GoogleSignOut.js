"use client";

import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

export default function SignOut() {
    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    return (
        <Button
            onClick={handleSignOut}
            icon={<LogoutOutlined />}
            type="primary"
            danger
        >
            Sign Out
        </Button>
    );
}
