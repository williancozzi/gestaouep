import { Inter } from "next/font/google";
import "./globals.css";
import AuthContext from "./authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthContext>
        <body className={inter.className}>{children}</body>
      </AuthContext>
    </html>
  );
}