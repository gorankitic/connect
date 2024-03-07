// next
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// components
import { Toaster } from 'react-hot-toast';
// clerk auth
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
// utils
import { cn } from "@/lib/utils";
// styles
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Ramonda",
  description: "Ramonda web app for team work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
          <body className={cn(inter.className, "bg-white dark:bg-[#313338]")}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="connect-theme">
              {children}
            </ThemeProvider>
            <Toaster position="top-right" />
          </body>
      </html>
    </ClerkProvider>
  );
}
