"use client"

import { useState, useEffect } from "react"
import { ShoppingBag, User, Search, Menu, Bell, Heart, LogOut, Settings, ChevronDown, MapPin } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export default function CustomerNavbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  useEffect(() => {
    let isMounted = true
  
    const handleScroll = () => {
      if (isMounted) {
        setIsScrolled(window.scrollY > 10)
      }
    }
  
    window.addEventListener("scroll", handleScroll)
  
    return () => {
      isMounted = false
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  

  // Mock cart data - in a real app, this would come from a cart context
  const cartItemCount = 3

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/customer" className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-orange-600" />
          <span className="text-xl font-bold">ApnaDukaan</span>
        </Link>

        {/* Location Selector */}
        <Link
          href="/customer/set-location"
          className="hidden md:flex items-center gap-1 text-sm text-gray-600 hover:text-orange-600 max-w-[200px]"
        >
          <MapPin className="h-4 w-4 text-orange-600 flex-shrink-0" />
          <span className="truncate">Jaipur, Rajasthan</span>
          <ChevronDown className="h-3 w-3 flex-shrink-0" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/customer"
            className={`text-sm font-medium transition-colors ${
              pathname === "/customer" ? "text-orange-600" : "text-gray-600 hover:text-orange-600"
            }`}
          >
            Home
          </Link>
          <Link
            href="/customer/categories"
            className={`text-sm font-medium transition-colors ${
              pathname === "/customer/categories" ? "text-orange-600" : "text-gray-600 hover:text-orange-600"
            }`}
          >
            Categories
          </Link>
          <Link
            href="/customer/orders"
            className={`text-sm font-medium transition-colors ${
              pathname === "/customer/orders" ? "text-orange-600" : "text-gray-600 hover:text-orange-600"
            }`}
          >
            My Orders
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-orange-600">
              More
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/customer/favorites" className="flex w-full">
                  Saved Shops
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/customer/help" className="flex w-full">
                  Help & Support
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/customer/about" className="flex w-full">
                  About Us
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Search, Cart, and Profile */}
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-600">
                <Search className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="h-auto">
              <div className="container mx-auto py-8 px-4">
                <div className="max-w-2xl mx-auto">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search for shops, products, or categories..."
                      className="pl-10 pr-4 py-6 rounded-full"
                      autoFocus
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-orange-600 hover:bg-orange-700">
                      Search
                    </Button>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Popular Searches</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Grocery", "Electronics", "Vegetables", "Dairy", "Bakery"].map((term) => (
                        <Badge key={term} variant="outline" className="cursor-pointer hover:bg-orange-50">
                          {term}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/customer/favorites">
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>

          <Link href="/customer/notifications">
            <Button variant="ghost" size="icon" className="text-gray-600 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                3
              </span>
            </Button>
          </Link>

          <Link href="/customer/cart">
            <Button variant="ghost" size="icon" className="text-gray-600 relative">
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="bg-orange-100 text-orange-800">RS</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/customer/profile" className="flex items-center w-full">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/customer/orders" className="flex items-center w-full">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  <span>My Orders</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/customer/settings" className="flex items-center w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-gray-600">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-orange-600" />
                  ApnaDukaan
                </SheetTitle>
              </SheetHeader>

              <div className="py-4">
                <div className="px-4 mb-4 flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback className="bg-orange-100 text-orange-800">RS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Rahul Sharma</p>
                    <p className="text-xs text-gray-500">rahul.sharma@example.com</p>
                  </div>
                </div>

                <SheetClose asChild>
                  <Link
                    href="/customer/set-location"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                  >
                    <MapPin className="h-4 w-4 text-orange-600" />
                    <span className="truncate">Jaipur, Rajasthan</span>
                    <ChevronDown className="h-3 w-3 ml-auto" />
                  </Link>
                </SheetClose>

                <div className="border-t my-2"></div>

                <nav className="space-y-1">
                  <SheetClose asChild>
                    <Link
                      href="/customer"
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium ${
                        pathname === "/customer" ? "bg-orange-50 text-orange-600" : "hover:bg-gray-50"
                      }`}
                    >
                      <Home className="h-5 w-5" />
                      Home
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/customer/categories"
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium ${
                        pathname === "/customer/categories" ? "bg-orange-50 text-orange-600" : "hover:bg-gray-50"
                      }`}
                    >
                      <Grid className="h-5 w-5" />
                      Categories
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/customer/orders"
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium ${
                        pathname === "/customer/orders" ? "bg-orange-50 text-orange-600" : "hover:bg-gray-50"
                      }`}
                    >
                      <ShoppingBag className="h-5 w-5" />
                      My Orders
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/customer/favorites"
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium ${
                        pathname === "/customer/favorites" ? "bg-orange-50 text-orange-600" : "hover:bg-gray-50"
                      }`}
                    >
                      <Heart className="h-5 w-5" />
                      Saved Items
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/customer/cart"
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium ${
                        pathname === "/customer/cart" ? "bg-orange-50 text-orange-600" : "hover:bg-gray-50"
                      }`}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Cart
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/customer/profile"
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium ${
                        pathname === "/customer/profile" ? "bg-orange-50 text-orange-600" : "hover:bg-gray-50"
                      }`}
                    >
                      <User className="h-5 w-5" />
                      Profile
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/customer/settings"
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium ${
                        pathname === "/customer/settings" ? "bg-orange-50 text-orange-600" : "hover:bg-gray-50"
                      }`}
                    >
                      <Settings className="h-5 w-5" />
                      Settings
                    </Link>
                  </SheetClose>

                  <div className="border-t my-2"></div>

                  <SheetClose asChild>
                    <Link
                      href="/customer/help"
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-gray-50"
                    >
                      <HelpCircle className="h-5 w-5" />
                      Help & Support
                    </Link>
                  </SheetClose>

                  <Link
                    href="/auth/logout"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-gray-50"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function Home(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function Grid(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  )
}

function HelpCircle(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  )
}

function ShoppingCart(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}
