import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Siouxville Grinch",
  description: "Official Siouxville Grinch app prototype",
  themeColor: "#00ff39",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
