"use client";

import { auth } from "../../firebase/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

export default function SignIn() {
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };

    return (
        <Button onClick={signInWithGoogle} icon={<GoogleOutlined />} type="primary">
            Sign in with Google
        </Button>
    );
}
