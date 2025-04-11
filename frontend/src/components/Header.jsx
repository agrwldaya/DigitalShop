"use client"

import { useState } from "react"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
 
import { CustomerLoginModal } from "./customer/customerLoginModal"
import { ShopkeeperLoginModal } from "./shopkeeper/ShopkeeperLoginModel"
 
 

export default function Header() {
 
  const [shopkeeperLoginOpen, setShopkeeperLoginOpen] = useState(false)
  const [customerLoginOpen, setCustomerLoginOpen] = useState(false)

  return (
    <div className="overflow-x-hidden mx-auto">
      <header className="sticky px-5 top-0  z-50 w-screen border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href='/'  className={` flex items-center gap-2`}     >
            <ShoppingBag   className="h-6 w-6" />
            <span className="text-xl font-bold">ShopEasy</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button className="cursor-pointer bg-orange-600 hover:bg-orange-700" size="sm" onClick={() => setShopkeeperLoginOpen(true)}>
              Login as Shopkeeper
            </Button>
            <Button className="cursor-pointer" variant="outline" size="sm" onClick={() => setCustomerLoginOpen(true)}>
              Login as Customer
            </Button>
          </div>
        </div>
      </header>

      <ShopkeeperLoginModal isOpen={shopkeeperLoginOpen} onClose={() => setShopkeeperLoginOpen(false)} />

      <CustomerLoginModal isOpen={customerLoginOpen} onClose={() => setCustomerLoginOpen(false)} />
    </div>
  )
}

