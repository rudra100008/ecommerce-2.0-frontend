"use client";

import AdminNav from "@/components/common/AdminNav";
import AdminSideNav from "@/components/common/AdminSideNav";
import Dashboard from "@/components/features/admin/Dashboard";

export default function AdminPage() {
   return (
    <div className="flex h-screen overflow-hidden">
      <AdminSideNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNav />
        <main className="flex-1 overflow-y-auto p-6">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
