import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Providers from "./providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Ease",
  description: "Shop Ease for wonderful shopping",
};

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" className={font.variable}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
