"use client";

import { Layout } from "antd";
import { AuthProvider } from "@/contexts/AuthContext";
import AppHeader from "@/components/Header";

const { Content, Footer } = Layout;

export default function ClientLayout({ children }) {
  return (
    <AuthProvider>
      <Layout
        className="min-h-full"
      >
        <AppHeader />
        <Content className="p-6 flex flex-col justify-center">{children}</Content>
        <Footer
          className="text-center border-t"
        >
          Groupzy © 2024
        </Footer>
      </Layout>
    </AuthProvider>
  );
}
