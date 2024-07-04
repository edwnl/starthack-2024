"use client";

import { Layout } from "antd";
import { AuthProvider } from "@/contexts/AuthContext";
import AppHeader from "@/components/Header";

const { Content, Footer } = Layout;

export default function ClientLayout({ children }) {
  return (
    <AuthProvider>
      <Layout
        className="min-h-screen"
        style={{ backgroundColor: "var(--light-primary-color)" }}
      >
        <AppHeader />
        <Content className="p-6">{children}</Content>
        <Footer
          style={{ backgroundColor: "var(--light-primary-color)" }}
          className="text-center border-t"
        >
          Groupzy © 2024
        </Footer>
      </Layout>
    </AuthProvider>
  );
}
