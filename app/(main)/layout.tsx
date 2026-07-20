import Navbar from "@/components/common/CustomerNav";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Shop Ease",
    default: "Shop Ease",
  },
  description: "Shop Ease for wonderful shopping",
};
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
