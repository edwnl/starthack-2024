"use client";

import { Layout } from "antd";
import { AuthProvider } from "@/contexts/AuthContext";
import AppHeader from "@/components/Header";
import { ActiveSessionProvider } from "@/contexts/ActiveSessionContext";

const { Content, Footer } = Layout;

export default function ClientLayout({ children }) {
  return (
    <AuthProvider>
      <ActiveSessionProvider>
        <Layout className="min-h-screen flex flex-col">
          <AppHeader />
          <Content className="flex-grow flex flex-col">{children}</Content>
          <Footer className="text-center border-t">Groupzy © 2024</Footer>
        </Layout>
      </ActiveSessionProvider>
    </AuthProvider>
  );
}
