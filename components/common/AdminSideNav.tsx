import {
    ArrowUpIcon,
  LayoutDashboardIcon,
  LucideClipboard,
  PackageOpenIcon,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
export default function AdminSideNav() {
  return (
    <div className="bg-gray-900 w-full h-lvh max-w-1/5 p -4 rounded-xl flex flex-col ">
      {/* Shop Ease Header*/}
      <div className=" mt-2 flex items-center justify-center">
        <ShoppingBag />
        <p>Shop Ease</p>
      </div>

      {/* navbar elements*/}
      <nav className="mt-6">
        <div className="flex flex-col gap-2">
          {/* Dashboard*/}
          <Link href="/admin/dashboard">
            <div className="flex items-center gap-3 border rounded-xl px-2 py-2 ">
              <LayoutDashboardIcon />
              <div>
                <p>Dashboard</p>
              </div>
            </div>
          </Link>


          {/* Orders */}
          <Link href="/admin/orders">
            <div className="flex items-center gap-3 border rounded-xl px-2 py-2 ">
              <LucideClipboard />
              <div>
                <p>Orders</p>
              </div>
            </div>
          </Link>
          

          {/* Products */}
          <div className="cursor-pointer">
            <div className="text-white flex items-center justify-between  rounded-xl px-2 py-2 transition-colors hover:bg-gray-400">
                <div className="flex gap-3">
                    <PackageOpenIcon />
                    <span>Product</span>
                </div>
                <ArrowUpIcon className="w-5 h-5"/>
            </div>
          </div>


        </div>
      </nav>
    </div>
  );
}
