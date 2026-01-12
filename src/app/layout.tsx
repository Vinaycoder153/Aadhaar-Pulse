import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aadhaar Pulse | Visual Intelligence for Societal Trends",
  description: "Interactive visual intelligence system for Aadhaar data analysis and prediction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
