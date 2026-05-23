"use client";
import {
  BellIcon,
  LogOutIcon,
  PackageIcon,
  SearchIcon,
  SettingsIcon,
  ShoppingBag,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserAvatar from "../ui/UserAvatar";
import { useCartStore } from "@/store/useCartStore";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useLogout } from "@/hooks/useAuth";

export default function Navbar() {
  const pathname = usePathname();
  const hasNotifications = false;
  const user = useAuthStore((state) => state.user);
  const cartCount = useCartStore((state) => state.cart?.cartItems.length);
  const [open, setOpen] = useState(false);
  const {mutate:logout,isPending,error}  = useLogout();

  const navLinkClass = (path: string) =>
    pathname === path
      ? "px-3 py-1.5 rounded-md text-sm font-medium text-white bg-white/10 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-accent after:rounded-full"
      : "px-3 py-1.5 rounded-md text-sm font-medium text-white/55 hover:text-white/90 hover:bg-white/6 transition-colors";


  const handleLogout = () =>{
    logout();
  }   
  return (
    <nav className="bg-gray-800">
      <div className="h-20 flex items-center px-5  gap-4">
        {/* Shop Ease Icon */}
        <Link href="/home" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-white" />
          </div>
          <span className=" text-white text-sm font-medium tracking-tight">
            ShopEase
          </span>
        </Link>
        {/* Divider */}
        <div className="h-8 w-px bg-white/10 shrink-0" />

        {/* Navbar Links */}
        <div className="flex items-center gap-2 flex-1">
          <Link href="/home" className={navLinkClass("/home")}>
            Home
          </Link>
          <Link href="/shop" className={navLinkClass("/shop")}>
            Shop
          </Link>
          <Link href="/cart" className={navLinkClass("/cart")}>
            Cart
            {cartCount && cartCount > 0 && (
              <span className="ml-1.5  items-center justify-center min-w-4 px-1 text-[10px] font-medium  bg-accent text-white rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/about" className={navLinkClass("/about")}>
            About
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-1">
          {/* Bell */}
          <div
            aria-label="Notification"
            className="relative h-9 w-9 rounded-lg flex items-center justify-center text-gray-300 hover:bg-gray-300 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <BellIcon />
            {hasNotifications && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-primary " />
            )}
          </div>

          {/*Search */}
          <button
            aria-label="Search"
            type="button"
            className="w-9 h-9 rounded-lg flex items-center justify-center  text-gray-300 transition-colors hover:bg-gray-300 hover:text-gray-900 cursor-pointer"
          >
            <SearchIcon />
          </button>

          {/* Avatar */}
          <div className="ml-1 relative">
            <button type="button" onClick={() => setOpen((prev) => !prev)}>
              <UserAvatar />
            </button>
            {/* Popup Box */}
            {open && (
              <div className="absolute  right-0 mt-2 w-52 bg-gray-900 rounded-xl border border-white/10 overflow-hidden z-50">
                <div className="px-3.5 py-3 border-b border-white/8">
                  <p className="text-base font-medium text-gray-100">
                    {user?.fullName}
                  </p>
                  <p className="text-xs text-white/40 mt-0.5">{user?.email}</p>
                </div>

                <div className="p-1.5 flex flex-col">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[16px] text-white/70  hover:text-gray-100 
                    hover:bg-white/7 transition-colors "
                  >
                    <UserIcon className="w-5 h-5 text-white/70" />
                    Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[16px] text-white/70  hover:text-gray-100 
                    hover:bg-white/7 transition-colors "
                  >
                    <PackageIcon className="w-5 h-5 text-white/70" />
                    My Orders
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[16px] text-white/70  hover:text-gray-100 
                    hover:bg-white/7 transition-colors "
                  >
                    <SettingsIcon className="w-5 h-5 text-white/70" />
                    Setting
                  </Link>

                  <button
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[16px] text-white/70  hover:text-gray-100 
                    hover:bg-white/7 transition-colors "
                    onClick={handleLogout}
                  >
                    <LogOutIcon className="w-5 h-5 text-white/70" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
