import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import InitialLoading from "./components/InitialLoading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lucky Solanki - Portfolio",
  description: "Web Developer & Designer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* <InitialLoading /> */}
        {children}
      </body>
    </html>
  );
}
