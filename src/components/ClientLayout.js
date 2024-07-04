'use client'

import { Layout } from 'antd';
import { AuthProvider } from '@/contexts/AuthContext';
import AppHeader from '@/components/Header';

const { Content, Footer } = Layout;

export default function ClientLayout({ children }) {
  return (
    <AuthProvider>
      <Layout className="min-h-screen">
        <AppHeader />
        <Content className="p-6">
          {children}
        </Content>
        <Footer className="text-center">
          Groupzy © 2024
        </Footer>
      </Layout>
    </AuthProvider>
  );
}