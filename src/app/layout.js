import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import ClientLayout from "@/components/ClientLayout";
import themeConfig from "@/theme/themeConfig";
import Script from "next/script";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "StartHack 2024",
  description: "A simple app using Next.js and Firebase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="afterInteractive"
      />
      <body className={montserrat.className}>
        <AuthProvider>
          <ConfigProvider theme={themeConfig}>
            <ClientLayout>{children}</ClientLayout>
          </ConfigProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
