"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Package, Users, FileText, Settings, X, User } from "lucide-react";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const pathname = usePathname();

  const links = [
    { href: "/shopkeeper/dashboard", icon: <Home className="h-5 w-5" />, label: "Dashboard" },
    { href: "/shopkeeper/dashboard/orders", icon: <ShoppingBag className="h-5 w-5" />, label: "Orders" },
    { href: "/shopkeeper/dashboard/products", icon: <Package className="h-5 w-5" />, label: "Products" },
    { href: "/shopkeeper/dashboard/customers", icon: <Users className="h-5 w-5" />, label: "Customers" },
    { href: "/shopkeeper/dashboard/settings", icon: <Settings className="h-5 w-5" />, label: "Settings" },
  ];

  return (
    <aside
      className={`fixed md:relative z-40 bg-gray-100 border-r min-h-screen w-64 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } md:translate-x-0`}
    >
      {/* Close Button for Mobile */}
      <button className="md:hidden p-2 absolute top-4 right-4" onClick={toggleSidebar}>
        <X className="h-6 w-6" />
      </button>

      <h2 className="text-xl font-bold p-4">Dashboard</h2>

      <nav className="space-y-2 p-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 ${
              pathname === link.href ? "bg-gray-300 font-semibold" : ""
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
