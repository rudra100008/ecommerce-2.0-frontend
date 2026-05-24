import { UserResponse } from "@/types/user.types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface DropDownItems {
  label: string;
  href?: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

interface UserDropDownProps {
  user: UserResponse;
  items: DropDownItems[];
}
export default function UserDropdown({ user, items }: UserDropDownProps) {

  return (
    <div className="absolute  right-0 mt-2 w-52 bg-gray-900 rounded-xl border border-white/10 overflow-hidden z-50">
      {/* User Details */}
      <div className="px-3.5 py-3 border-b border-white/8">
        <p className="text-base font-medium text-gray-100">{user?.fullName}</p>
        <p className="text-xs text-white/40 mt-0.5">{user?.email}</p>
      </div>
      <div className="p-1.5 flex flex-col">
        {items.map((item) =>
          item.href ? (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[16px] text-white/70  hover:text-gray-100 
                hover:bg-white/7 transition-colors "
            >
              <span className="w-5 h-5 text-white/70">{item.icon}</span>
              {item.label}
            </Link>
          ) : (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[16px] text-white/70  hover:text-gray-100 
                    hover:bg-white/7 transition-colors "
            >
              <span className="w-5 h-5 text-white/70">{item.icon}</span>

              {item.label}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
