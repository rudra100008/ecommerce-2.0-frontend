// admin/layout.tsx
import AdminNav from "@/components/common/AdminNav";
import AdminSideNav from "@/components/common/AdminSideNav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Shop Ease Admin",
    template: "%s | Shop Ease Admin",
  },
};
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSideNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNav />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
