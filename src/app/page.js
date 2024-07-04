"use client";

import { useAuth } from "@/contexts/AuthContext";
import GoogleSignIn from "@/components/GoogleSignIn";
import GoogleSignOut from "@/components/GoogleSignOut";

export default function Home() {
    const { user } = useAuth();

    return (
        <div>
            <h1>Welcome to Groupzy</h1>
            {user ? (
                <>
                    <p>Hello, {user.displayName}</p>
                    <GoogleSignOut />
                </>
            ) : (
                <GoogleSignIn />
            )}
        </div>
    );
}
