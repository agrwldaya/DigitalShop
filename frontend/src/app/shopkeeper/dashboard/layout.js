"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/shopkeeper/Navbar";
import Sidebar from "@/components/shopkeeper/Sidebar";
import Cookies from "js-cookie";
import { getShopkeeperFromToken } from "@/lib/auth";
import { useFetchShopData } from "@/components/shopkeeper/fetchShopData";
 

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const token = getShopkeeperFromToken();
  // console.log(token)
  const { fetchProfile,fetchProducts } = useFetchShopData(); // ✅ hook usage

  useEffect(() => {
    if (token) {
      fetchProfile(token);
      fetchProducts(token)
    }
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
