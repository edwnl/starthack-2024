import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { checkActiveSession } from "@/app/active-session/actions"; // Import your existing AuthContext

const ActiveSessionContext = createContext();

export function ActiveSessionProvider({ children }) {
  const [hasActiveSession, setHasActiveSession] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const checkSession = async () => {
      if (user) {
        const activeSession = await checkActiveSession(user.uid);
        setHasActiveSession(!!activeSession);
      } else {
        setHasActiveSession(false);
      }
    };

    checkSession();
  }, [user]);

  const updateActiveSession = (status) => {
    setHasActiveSession(status);
  };

  return (
    <ActiveSessionContext.Provider
      value={{ hasActiveSession, updateActiveSession }}
    >
      {children}
    </ActiveSessionContext.Provider>
  );
}

export function useActiveSession() {
  return useContext(ActiveSessionContext);
}
