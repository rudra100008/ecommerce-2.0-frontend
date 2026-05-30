"use client"
import {
  BellIcon,
  PackageIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import UserAvatar from "../ui/UserAvatar";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import UserDropdown from "../ui/UserDropdown";
import { ADMIN_PAGE_TITLES } from "@/constants/adminPageTitles";
import { usePathname } from "next/navigation";

export default function AdminNav() {
  const [open, setOpen] = useState(false);
  const hasNotifications = false;
  const user = useAuthStore((state) => state.user);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const pageTitle = ADMIN_PAGE_TITLES[pathname] ?? "Admin";


  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(()=>{
    document.title= "Orders | Shop Ease"
  })
  return (
    <nav className="bg-gray-800 h-20 flex items-center justify-between px-5 gap-4">
      <div className="flex items-center gap-3 ">
        <h1 className="text-white/80 font-medium text-2xl">{pageTitle}</h1>
      </div>
      <div className="flex items-center gap-2 ">
        {/* Search */}
        <div className="flex items-center  relative ">
          <SearchIcon className="absolute left-3 w-4 h-4  text-white/30 pointer-events-none" />
          <input
            type="search"
            placeholder="Search anything..."
            className="w-56 pl-9 py-2 rounded-lg text-sm 
            bg-white/5 border border-white/8 text-white/80 
            placeholder:text-white/25 focus:outline-none focus:border-accent/50 focus:bg-white/8
            transition-colors duration-150"
          />
        </div>

        {/* Notification + Admin Pic */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="relative h-9 w-9 rounded-lg flex items-center justify-center text-gray-300 hover:bg-gray-300 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <BellIcon />
            {hasNotifications && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-primary " />
            )}
          </button>

          {/* Avatar */}
          <div className="cursor-pointer ml-1 relative" ref={dropDownRef}>
            <button type="button" onClick={() => setOpen((prev) => !prev)}>
              <UserAvatar />
            </button>
            {/* Admin user dropdown Box */}
            {open && user && (
              <UserDropdown
                user={user}
                items={[
                  {
                    label: "Profile",
                    href: "/admin/profile",
                    icon: <UserIcon className="w-5 h-5 text-white/70" />,
                  },
                  {
                    label: "Manage orders",
                    href: "/admin/orders",
                    icon: <PackageIcon className="w-5 h-5 text-white/70" />,
                  },
                  {
                    label: "Setting",
                    href: "/setting",
                    icon: <SettingsIcon className="w-5 h-5 text-white/70" />,
                  },
                ]}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
