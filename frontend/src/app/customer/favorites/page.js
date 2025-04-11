"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, MapPin, Star, Clock, Trash2, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import CustomerNavbar from "@/components/customer/customer-navbar"

export default function FavoritesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [favoriteShops, setFavoriteShops] = useState(shops)
  const [favoriteProducts, setFavoriteProducts] = useState(products)

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

  const filteredShops = favoriteShops.filter(
    (shop) => !searchQuery || shop.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredProducts = favoriteProducts.filter(
    (product) => !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const removeShop = (id) => {
    setFavoriteShops(favoriteShops.filter((shop) => shop.id !== id))
  }

  const removeProduct = (id) => {
    setFavoriteProducts(favoriteProducts.filter((product) => product.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNavbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Favorites</h1>
          <p className="text-gray-600">Your saved shops and products</p>
        </div>

        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Search favorites..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <Tabs defaultValue="shops">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="shops">Saved Shops</TabsTrigger>
            <TabsTrigger value="products">Saved Products</TabsTrigger>
          </TabsList>

          <TabsContent value="shops">
            {filteredShops.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredShops.map((shop) => (
                  <motion.div key={shop.id} variants={itemVariants}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 relative group">
                      <div className="absolute top-3 right-3 z-10">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="secondary"
                              size="icon"
                              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remove from favorites?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove {shop.name} from your favorites? This action cannot be
                                undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() => removeShop(shop.id)}
                              >
                                Remove
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>

                      <Link href={`/customer/shop/${shop.id}`}>
                        <div className="relative h-48">
                          <Image src={shop.image || "/placeholder.svg"} alt={shop.name} fill className="object-cover" />
                          {shop.isOpen ? (
                            <Badge className="absolute top-3 left-3 bg-green-500">Open Now</Badge>
                          ) : (
                            <Badge className="absolute top-3 left-3 bg-gray-500">Closed</Badge>
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
                      </Link>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-10 w-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-medium mb-2">No saved shops</h3>
                <p className="text-gray-500 mb-6">
                  You have not saved any shops yet. Browse shops and click the heart icon to add them to your favorites.
                </p>
                <Link href="/customer">
                  <Button className="bg-orange-600 hover:bg-orange-700">Browse Shops</Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="products">
            {filteredProducts.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProducts.map((product) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 relative group">
                      <div className="absolute top-3 right-3 z-10">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="secondary"
                              size="icon"
                              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remove from favorites?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove {product.name} from your favorites? This action cannot
                                be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() => removeProduct(product.id)}
                              >
                                Remove
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>

                      <Link href={`/customer/shop/${product.shopId}`}>
                        <div className="relative h-48">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                          {product.discount > 0 && (
                            <Badge className="absolute top-3 left-3 bg-red-500">{product.discount}% OFF</Badge>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                          <p className="text-sm text-gray-500 mb-1">{product.shopName}</p>
                          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <span className="font-bold text-lg">₹{product.price}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through ml-2">
                                  ₹{product.originalPrice}
                                </span>
                              )}
                            </div>
                            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                              Add to Cart
                            </Button>
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-10 w-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-medium mb-2">No saved products</h3>
                <p className="text-gray-500 mb-6">
                  You have not saved any products yet. Browse products and click the heart icon to add them to your
                  favorites.
                </p>
                <Link href="/customer">
                  <Button className="bg-orange-600 hover:bg-orange-700">Browse Products</Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

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
]

const products = [
  {
    id: "p1",
    name: "Basmati Rice (5kg)",
    description: "Premium quality basmati rice from the foothills of Himalayas",
    price: 450,
    originalPrice: 500,
    discount: 10,
    shopId: "1",
    shopName: "Sharma General Store",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "p3",
    name: "Fresh Milk (1L)",
    description: "Farm fresh cow milk delivered daily",
    price: 60,
    originalPrice: null,
    discount: 0,
    shopId: "1",
    shopName: "Sharma General Store",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "p7",
    name: "Paneer (500g)",
    description: "Fresh homemade cottage cheese",
    price: 150,
    originalPrice: 180,
    discount: 17,
    shopId: "1",
    shopName: "Sharma General Store",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "p9",
    name: "Fresh Onions (1kg)",
    description: "Premium quality red onions",
    price: 35,
    originalPrice: null,
    discount: 0,
    shopId: "1",
    shopName: "Sharma General Store",
    image: "/placeholder.svg?height=300&width=300",
  },
]
