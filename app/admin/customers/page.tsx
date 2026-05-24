"use client"
import AdminNav from "@/components/common/AdminNav";
import AdminSideNav from "@/components/common/AdminSideNav";


export default function CustomerPage(){
    return (
        <div className="flex min-h-screen ">
             <AdminSideNav />
             <div className="flex-1 flex flex-col">
               <AdminNav />
               <main className="mt-1 ml-1">
                   Dashboard
               </main>
             </div>
           </div>
    )
}