"use client";

import { Bell, LogOut, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Navbar({ toggleSidebar }) {
const router = useRouter()
  const handleLogout =()=>{
    Cookies.remove('shopkeeperToken');
    toast("Logout successfully!")
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6 w-full">
      {/* Sidebar Toggle (Only on mobile) */}
      <button className="md:hidden p-2 rounded-full hover:bg-gray-200" onClick={toggleSidebar}>
        <Menu className="h-6 w-6" />
      </button>

      <h1 className="text-lg font-bold flex-1 text-center md:text-left">Shopkeeper Panel</h1>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-200">
          <Bell className="h-5 w-5" />
        </button>
        <Avatar>
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>

        <button  onClick={handleLogout} className="p-2 rounded-full cursor-pointer hover:bg-gray-200">
        <LogOut className="h-5 w-5"></LogOut>
         
        </button>
      </div>
    
    </header>
  );
}
