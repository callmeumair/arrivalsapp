import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NewCity - Social Onboarding Platform",
  description: "Connect with people in your new city",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#8b5cf6",
          colorBackground: "#0f0f23",
          colorInputBackground: "#1a1a2e",
          colorText: "#ffffff",
        },
      }}
    >
      <html lang="en" className="dark">
        <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
