"use client"

import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// export const metadata: Metadata = {
//   title: "Shop Ease",
//   description: "Shop Ease for wonderful shopping",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [queryClient] = useState(()=> new QueryClient({
    defaultOptions:{
      queries:{
        staleTime: 5 * 60 * 1000, // 5min
        retry: 1
      }
    }
  }))

  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <QueryClientProvider client={queryClient}>
          {children}  
        </QueryClientProvider>
      </body>
    </html>
  );
}
