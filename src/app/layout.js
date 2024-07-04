import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import "antd/dist/reset.css";
import AppHeader from "@/components/Header";
import { Layout } from "antd";
import ClientLayout from "@/components/ClientLayout";

const { Content, Footer } = Layout;

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "StartHack 2024",
  description: "A simple todo app using Next.js and Firebase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
