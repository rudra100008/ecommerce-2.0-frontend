"use client";
import { useLogout } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";
import { useUIStore } from "@/store/useUIStore";
import {
  BarChartIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ClipboardList,
  LayoutDashboardIcon,
  LogOutIcon,
  LucideIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingBagIcon,
  TagIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
  badgeVarient?: "accent" | "danger";
  sidebarCollapsed: boolean;
}

function NavItem({
  href,
  icon,
  label,
  badge,
  badgeVarient = "accent",
  sidebarCollapsed = false,
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const Icon = icon;
  return (
    <Link
      href={href}
      title={sidebarCollapsed ? label : undefined}
      className={`flex  gap-5 p-3 rounded-lg text-sm transition-colors
        ${sidebarCollapsed ? "justify-center" : ""}
        ${
          isActive
            ? "bg-accent/10 text-accent"
            : "text-black hover:text-accent-hover hover:bg-white/5"
        }`}
    >
      <Icon
        size={18}
        strokeWidth={1.8}
        className={`shrink-0 ${isActive ? "text-accent" : "text-black"}`}
      />

      {!sidebarCollapsed && <span className="flex-1 text-[16px]">{label}</span>}

      {!sidebarCollapsed && badge !== undefined && badge > 0 && (
        <span
          className={`text-[12px] flex justify-center items-center font-medium px-1.5 py-0.5 rounded-full 
        ${
          badgeVarient === "danger"
            ? "bg-red-400/15 text-red-400"
            : "bg-accent/15 text-accent"
        }`}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}

function NavCollapsible({
  icon,
  label,
  children,
  basePath,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
  basePath: string;
}) {
  const pathname = usePathname();
  const isRouteActive = pathname.startsWith(basePath);
  const [open, setOpen] = useState(isRouteActive);
  const Icon = icon;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={`  w-full flex items-center gap-5 px-3 py-2 rounded-lg  transition-all 
      ${isRouteActive ? "text-black" : "text-black hover:text-accent-hover cursor-pointer scale-105 hover:bg-white/5"} `}
      >
        <Icon size={18} strokeWidth={1.8} className="shrink-0" />
        <span className="flex-1 text-[16px] text-left">{label}</span>
        <ChevronDownIcon
          className={`w-3.5 h-3.5 text-black transition-transform ${open ? "rotate-180" : ""} `}
        />
      </button>
      {open && (
        <div className="mt-0.5 ml-4 pl-3 flex flex-col gap-1">{children}</div>
      )}
    </div>
  );
}
function SubNavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`block px-2.5 py-1 rounded-r-md text-sm transition-colors border-l-2
        ${
          isActive
            ? "border-accent text-accent bg-accent/5"
            : "border-transparent text-gray-900 hover:text-accent-hover hover:border-white/20"
        }`}
    >
      {label}
    </Link>
  );
}

export default function AdminSideNav() {
  const { sidebarCollapsed, toggleSideBar } = useUIStore();
  const user = useAuthStore((state) => state.user);
  const { mutate: logout } = useLogout();

  const initials = user?.fullName?.substring(0, 2).toUpperCase() ?? "AD";
  return (
    <aside
      className={`relative bg-white border-r-2  h-screen flex flex-col shrink-0 transition-all duration-300
    ${sidebarCollapsed ? "w-20" : "w-56"}`}
    >
      {/* Toogle arrow button*/}
      <button
        type="button"
        onClick={() => toggleSideBar()}
        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse Sidebar"}
        className="absolute -right-4 top-20 z-10 w-6 h-6 rounded-full bg-gray-700 
      border border-white/10 flex items-center justify-center 
      text-white/50 hover:text-white hover:bg-gray-600 transition-colors"
      >
        <ChevronLeftIcon
          className={`w-3 h-3 transition-transform duration-300
          ${sidebarCollapsed ? "rotate-180" : ""}`}
        />
      </button>
      {/*Header*/}
      <div
        className={`flex items-center gap-2.5 px-4 py-4  border-b border-white/7 overflow-hidden duration-300 ${sidebarCollapsed ? "justify-center" : ""} `}
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-accent">
          <ShoppingBagIcon className="w-5 h-5 text-white" />
        </div>
        {!sidebarCollapsed && (
          <>
            <span className="text-gray-100 font-medium text-lg ">ShopEase</span>
            <span className=" ml-auto border  bg-accent-light text-accent text-[10px] px-1.5 py-0.5 font-medium rounded-[10px]">
              Admin
            </span>
          </>
        )}
      </div>

      {/* navbar elements*/}
      <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5 overflow-y-auto overflow-x-hidden">
        {!sidebarCollapsed && (
          <p className="text-[12px] uppercase tracking-widest text-white/27 px-2 pt-1 ">
            Main
          </p>
        )}

        <NavItem
          href="/admin"
          icon={LayoutDashboardIcon}
          label="Dashboard"
          sidebarCollapsed={sidebarCollapsed}
        />

        {sidebarCollapsed ? (
          <NavItem
            href="/admin/products"
            icon={PackageIcon}
            label="Products"
            sidebarCollapsed={sidebarCollapsed}
          />
        ) : (
          <NavCollapsible
            icon={PackageIcon}
            label="Products"
            basePath="/admin/products"
          >
            <SubNavItem href="/admin/products" label="List" />
            <SubNavItem href="/admin/products/create" label="Create" />
            <SubNavItem href="/admin/products/edit" label="Edit" />
          </NavCollapsible>
        )}

        {sidebarCollapsed ? (
          <NavItem
            href="/admin/orders"
            icon={ClipboardList}
            label="Orders"
            sidebarCollapsed={sidebarCollapsed}
          />
        ) : (
          <NavCollapsible
            icon={ClipboardList}
            label="Orders"
            basePath="/admin/orders"
          >
            <SubNavItem href="/admin/orders" label="List" />
            <SubNavItem href="/admin/orders/cart" label="Cart" />
          </NavCollapsible>
        )}

        <div className="h-px bg-white/7 my-2" />

        {!sidebarCollapsed && (
          <p className="text-[10px] uppercase tracking-widest text-white/28 px-2 pb-1">
            Store
          </p>
        )}

        <NavItem
          href="/admin/analytics"
          icon={BarChartIcon}
          label="Analytics"
          sidebarCollapsed={sidebarCollapsed}
        />
        <NavItem
          href="/admin/discounts"
          icon={TagIcon}
          label="Discounts"
          sidebarCollapsed={sidebarCollapsed}
        />
        <NavItem
          href="/admin/settings"
          icon={SettingsIcon}
          label="Settings"
          sidebarCollapsed={sidebarCollapsed}
        />
      </nav>

      {/* Footer */}
      <div className="px-2 py-3 border-t border-white/7">
        <div
          className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-white/5 transition-colors 
          ${sidebarCollapsed ? "justify-center" : ""}`}
        >
          <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center text-[11px] font-medium text-accent flex-shrink-0">
            {initials}
          </div>
          {!sidebarCollapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white/75 truncate">
                  {user?.fullName ?? "Admin"}
                </p>
                <p className="text-[10px] text-white/30">Super admin</p>
              </div>
              <button
                type="button"
                aria-label="Sign out"
                onClick={() => logout()}
                className="text-white/20 hover:text-red-400 transition-colors"
              >
                <LogOutIcon className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
