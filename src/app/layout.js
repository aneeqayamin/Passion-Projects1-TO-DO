import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  
  title: "Task Master v.3.0",
  description: "The best one LOL",
};

export const viewport = {

  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,



}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Playwrite+CU+Guides&display=swap" 
          rel="stylesheet" 
        />
      </head>
      {/* Merged everything into a single body tag */}
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}