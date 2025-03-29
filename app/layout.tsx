import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ArrowUpRightIcon } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ukrainian Collection Search Tool",
  description:
    "Search and explore libraries in the United States (with some libraries from other countries). This project, which was originally built as an internal tool for Washington State University research through the Ukrainian Book Project, is now available to anyone for research and educational purposes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <div className="flex justify-between flex-col lg:flex-row gap-4 max-w-5xl mx-auto p-4 py-8 md:p-8 lg:p-12">
          <p className="text-sm text-neutral-600">
            A tool by{" "}
            <a
              href="https://www.ruslan.in"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              Ruslan Mukhamedvaleev
            </a>{" "}
            for the{" "}
            <a
              href="https://www.ukrainianbookproject.com/"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              Ukrainian Book Project
            </a>{" "}
            of Washington State University.
          </p>
          <div className="text-sm text-neutral-600">
            © {new Date().getFullYear()} ·{" "}
            <a
              href="https://github.com/digitalRM/WSU-Institution-Data-Processing-Research-Tool"
              target="_blank"
              className="hover:underline"
            >
              View GitHub{" "}
              <ArrowUpRightIcon className="-ml-0.5 h-4 w-4 inline-block" />
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
