import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Providers from "./providers";
import AppShell from "@/components/ui/AppShell";
import { Toaster } from "sonner";
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
          <AppShell>
            {children}
            <Toaster
              position="bottom-center"
              theme="system"
              duration={3000}
              visibleToasts={5}
              expand={true}
              richColors={true}
              closeButton={true}
            />
          </AppShell>
        </Providers>
      </body>
    </html>
  );
}
