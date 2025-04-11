"use client"
/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ShoppingBag, Search, MapPin, Star, Clock, Sliders } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import CustomerNavbar from "@/components/customer/customer-navbar"

export default function CustomerLandingPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [range, setRange] = useState([5])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredShops, setFilteredShops] = useState([])

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Filter shops based on category, range, and search query
    let filtered = [...shops]

    if (selectedCategory !== "all") {
      filtered = filtered.filter((shop) => shop.categories.includes(selectedCategory))
    }

    filtered = filtered.filter((shop) => shop.distance <= range[0])

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (shop) =>
          shop.name.toLowerCase().includes(query) ||
          shop.address.toLowerCase().includes(query) ||
          shop.categories.some((cat) => cat.toLowerCase().includes(query)),
      )
    }

    setFilteredShops(filtered)
  }, [selectedCategory, range, searchQuery])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
       
   <CustomerNavbar/>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-200 to-orange-300 text-white py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 bg-white opacity-10 rounded-full"></div>
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white opacity-10 rounded-full"></div>
        </div>

        <div className="container relative mx-auto px-4 md:px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Discover Local Shops Near You</h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Browse products from your favorite local stores and order for convenient pickup
            </p>

            <div className="relative max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Search for shops, products, or categories..."
                className="pl-10 pr-4 py-6 rounded-full text-black shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-orange-600 hover:bg-orange-700">
                Search
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`rounded-full whitespace-nowrap ${
                    selectedCategory === category.id ? "bg-orange-600 hover:bg-orange-700" : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <MapPin className="text-orange-600" size={18} />
                <span className="text-sm font-medium">Within {range[0]} km</span>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Sliders size={16} />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Options</SheetTitle>
                    <SheetDescription>Adjust your search preferences</SheetDescription>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Distance Range</h3>
                      <div className="space-y-4">
                        <Slider
                          defaultValue={[5]}
                          max={20}
                          step={1}
                          value={range}
                          onValueChange={setRange}
                          className="w-full"
                        />
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-500">0 km</span>
                          <span className="text-xs font-medium">{range[0]} km</span>
                          <span className="text-xs text-gray-500">20 km</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Sort By</h3>
                      <Select defaultValue="distance">
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="distance">Distance</SelectItem>
                          <SelectItem value="rating">Rating</SelectItem>
                          <SelectItem value="popularity">Popularity</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Open Now</h3>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="open-now" className="rounded text-orange-600" />
                        <label htmlFor="open-now" className="text-sm">
                          Show only open shops
                        </label>
                      </div>
                    </div>

                    <Button className="w-full bg-orange-600 hover:bg-orange-700">Apply Filters</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </section>

      {/* Shops Listing Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {isLoading
                ? "Finding shops near you..."
                : filteredShops.length > 0
                  ? `${filteredShops.length} Shops Found`
                  : "No shops found"}
            </h2>
            <Select defaultValue="recommended">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="nearest">Nearest First</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <CardContent className="p-4">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredShops.length > 0 ? (
                filteredShops.map((shop) => (
                  <motion.div key={shop.id} variants={itemVariants}>
                    <Link href={`/customer/shop/${shop.id}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="relative h-48">
                          <Image src={shop.image || "/placeholder.svg"} alt={shop.name} fill className="object-cover" />
                          {shop.isOpen ? (
                            <Badge className="absolute top-3 right-3 bg-green-500">Open Now</Badge>
                          ) : (
                            <Badge className="absolute top-3 right-3 bg-gray-500">Closed</Badge>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg">{shop.name}</h3>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="ml-1 text-sm font-medium">{shop.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">{shop.address}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{shop.distance} km away</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{shop.deliveryTime} mins</span>
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-1">
                            {shop.categories.map((category, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No shops found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your filters or search for something else</p>
                  <Button
                    onClick={() => {
                      setSelectedCategory("all")
                      setRange([5])
                      setSearchQuery("")
                    }}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

const categories = [
  { id: "all", name: "All Shops", icon: <ShoppingBag size={16} /> },
  { id: "grocery", name: "Grocery", icon: null },
  { id: "electronics", name: "Electronics", icon: null },
  { id: "clothing", name: "Clothing", icon: null },
  { id: "pharmacy", name: "Pharmacy", icon: null },
  { id: "stationery", name: "Stationery", icon: null },
  { id: "bakery", name: "Bakery", icon: null },
  { id: "homegoods", name: "Home Goods", icon: null },
]

const shops = [
  {
    id: "1",
    name: "Sharma General Store",
    image: "/placeholder.svg?height=400&width=600",
    address: "123 Main Market, Jaipur, Rajasthan",
    rating: 4.8,
    distance: 1.2,
    deliveryTime: 15,
    isOpen: true,
    categories: ["Grocery", "Household"],
  },
  {
    id: "2",
    name: "Patel Electronics",
    image: "/placeholder.svg?height=400&width=600",
    address: "456 Tech Hub, Ahmedabad, Gujarat",
    rating: 4.5,
    distance: 2.5,
    deliveryTime: 25,
    isOpen: true,
    categories: ["Electronics", "Appliances"],
  },
  {
    id: "3",
    name: "Kumar Clothing",
    image: "/placeholder.svg?height=400&width=600",
    address: "789 Fashion Street, Delhi",
    rating: 4.2,
    distance: 3.7,
    deliveryTime: 20,
    isOpen: false,
    categories: ["Clothing", "Accessories"],
  },
  {
    id: "4",
    name: "Singh Pharmacy",
    image: "/placeholder.svg?height=400&width=600",
    address: "234 Health Avenue, Chandigarh",
    rating: 4.9,
    distance: 0.8,
    deliveryTime: 10,
    isOpen: true,
    categories: ["Pharmacy", "Healthcare"],
  },
  {
    id: "5",
    name: "Gupta Stationery",
    image: "/placeholder.svg?height=400&width=600",
    address: "567 Education Lane, Lucknow, UP",
    rating: 4.3,
    distance: 4.1,
    deliveryTime: 30,
    isOpen: true,
    categories: ["Stationery", "Books"],
  },
  {
    id: "6",
    name: "Verma Bakery",
    image: "/placeholder.svg?height=400&width=600",
    address: "890 Sweet Street, Mumbai, Maharashtra",
    rating: 4.7,
    distance: 2.9,
    deliveryTime: 15,
    isOpen: false,
    categories: ["Bakery", "Desserts"],
  },
  {
    id: "7",
    name: "Mehta Home Goods",
    image: "/placeholder.svg?height=400&width=600",
    address: "345 Interior Road, Bangalore, Karnataka",
    rating: 4.4,
    distance: 3.3,
    deliveryTime: 35,
    isOpen: true,
    categories: ["Home Goods", "Furniture"],
  },
  {
    id: "8",
    name: "Joshi Grocery",
    image: "/placeholder.svg?height=400&width=600",
    address: "678 Local Market, Pune, Maharashtra",
    rating: 4.6,
    distance: 1.5,
    deliveryTime: 20,
    isOpen: true,
    categories: ["Grocery", "Organic"],
  },
  {
    id: "9",
    name: "Reddy Mobile Shop",
    image: "/placeholder.svg?height=400&width=600",
    address: "901 Tech Street, Hyderabad, Telangana",
    rating: 4.1,
    distance: 4.8,
    deliveryTime: 25,
    isOpen: true,
    categories: ["Electronics", "Mobile"],
  },
]

