import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

// const poppins = Poppins({
//   variable: '--font-poppins',
//   weight: ['300', '400', '500', '600', '700'],
//   subsets: ['latin']
// })
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Emacs Creation",
  description: "A platform for all your creative needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className= {` ${outfit.className} antialiased`}
      >
       {children}
      </body>
    </html>
  );
}
