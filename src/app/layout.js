import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import "antd/dist/reset.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "StartHack 2024",
  description: "A simple todo app using Next.js and Firebase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
