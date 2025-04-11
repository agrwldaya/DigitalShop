"use client"
/* eslint-disable react/no-unescaped-entities */


import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ShoppingBag, Star, Clock, MapPin, Phone, Plus, Minus, Heart, Share2, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
 
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import CustomerNavbar from "@/components/customer/customer-navbar"
 

export default function ShopDetailPage({ params }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [shop, setShop] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    // Simulate loading shop data
    const timer = setTimeout(() => {
      const foundShop = shops.find((s) => s.id === params.id)
      if (foundShop) {
        setShop(foundShop)
        setFilteredProducts(foundShop.products)
      }
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [params.id])

  useEffect(() => {
    if (!shop) return

    // Filter products based on category and search query
    let filtered = [...shop.products]

    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
      )
    }

    setFilteredProducts(filtered)
  }, [selectedCategory, searchQuery, shop])

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)

      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })

    // Open cart sheet when adding first item
    if (cart.length === 0) {
      setCartOpen(true)
    }
  }

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId)

      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
      } else {
        return prevCart.filter((item) => item.id !== productId)
      }
    })
  }

  const deleteFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CustomerNavbar />
        <div className="container mx-auto px-4 py-12 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
        </div>
      </div>
    )
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CustomerNavbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Shop not found</h2>
          <p className="mb-6">The shop you are looking for does not exist or has been removed.</p>
          <Button onClick={() => router.push("/customer")} className="bg-orange-600 hover:bg-orange-700">
            Back to Shops
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNavbar />

      {/* Shop Header */}
      <div className="relative h-64 md:h-80 bg-gray-800">
        <Image src={shop.coverImage || shop.image} alt={shop.name} fill className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between">
              <div>
                <div className="flex items-center mb-2">
                  {shop.isOpen ? (
                    <Badge className="bg-green-500 mr-2">Open Now</Badge>
                  ) : (
                    <Badge className="bg-gray-500 mr-2">Closed</Badge>
                  )}
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{shop.rating}</span>
                    <span className="mx-1 text-sm">•</span>
                    <span className="text-sm">{shop.reviewCount} reviews</span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold mb-2">{shop.name}</h1>
                <div className="flex flex-wrap items-center text-sm opacity-90">
                  <div className="flex items-center mr-4 mb-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{shop.address}</span>
                  </div>
                  <div className="flex items-center mr-4 mb-1">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{shop.openingHours}</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <Phone className="h-4 w-4 mr-1" />
                    <span>{shop.phone}</span>
                  </div>
                </div>
              </div>

              <div className="flex mt-4 md:mt-0 space-x-2">
                <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Categories */}
            <div className="mb-8">
              <div className="relative mb-4">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <ShoppingBag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>

              <div className="flex overflow-x-auto pb-2 gap-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  className={`rounded-full whitespace-nowrap ${
                    selectedCategory === "all" ? "bg-orange-600 hover:bg-orange-700" : ""
                  }`}
                  onClick={() => setSelectedCategory("all")}
                >
                  All Products
                </Button>
                {shop.categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`rounded-full whitespace-nowrap ${
                      selectedCategory === category ? "bg-orange-600 hover:bg-orange-700" : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                      <div className="relative h-48">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        {product.discount > 0 && (
                          <Badge className="absolute top-2 left-2 bg-red-500">{product.discount}% OFF</Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="font-bold text-lg">₹{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
                            )}
                          </div>
                          <Button
                            size="sm"
                            className="bg-orange-600 hover:bg-orange-700"
                            onClick={() => addToCart(product)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-gray-500 mb-6">Try searching for something else or browse all products</p>
                  <Button
                    onClick={() => {
                      setSelectedCategory("all")
                      setSearchQuery("")
                    }}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    View All Products
                  </Button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-4">Shop Information</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Address</h4>
                    <p className="text-sm">{shop.address}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Opening Hours</h4>
                    <p className="text-sm">{shop.openingHours}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Contact</h4>
                    <p className="text-sm">{shop.phone}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Categories</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {shop.categories.map((category) => (
                        <Badge key={category} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-4">About {shop.name}</h3>
                <p className="text-sm text-gray-600">{shop.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Reviews</h3>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{shop.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({shop.reviewCount})</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {shop.reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 overflow-hidden">
                            <Image
                              src={review.avatar || "/placeholder.svg?height=32&width=32"}
                              alt={review.name}
                              width={32}
                              height={32}
                              className="object-cover"
                            />
                          </div>
                          <span className="font-medium">{review.name}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                      <p className="text-xs text-gray-400 mt-1">{review.date}</p>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4">
                  View All Reviews
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Sheet open={cartOpen} onOpenChange={setCartOpen}>
            <SheetTrigger asChild>
              <Button className="bg-orange-600 hover:bg-orange-700 rounded-full h-16 w-16 shadow-lg relative">
                <ShoppingBag className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-white text-orange-600 rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold">
                  {getTotalItems()}
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
              <SheetHeader className="p-6 border-b">
                <SheetTitle>Your Cart</SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-auto p-6">
                {cart.length > 0 ? (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 pb-4 border-b">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-sm text-gray-500">₹{item.price} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => addToCart(item)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-red-500"
                          onClick={() => deleteFromCart(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                    <p className="text-gray-500 mb-6">Add items from the shop to get started</p>
                    <SheetClose asChild>
                      <Button className="bg-orange-600 hover:bg-orange-700">Continue Shopping</Button>
                    </SheetClose>
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <SheetFooter className="p-6 border-t">
                  <div className="w-full space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal</span>
                        <span>₹{getTotalPrice()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Taxes</span>
                        <span>₹{(getTotalPrice() * 0.05).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{(getTotalPrice() * 1.05).toFixed(2)}</span>
                      </div>
                    </div>

                    <Link href="/customer/checkout" className="block w-full">
                      <Button className="w-full bg-orange-600 hover:bg-orange-700">Proceed to Checkout</Button>
                    </Link>
                  </div>
                </SheetFooter>
              )}
            </SheetContent>
          </Sheet>
        </div>
      )}
    </div>
  )
}



const shops = [
  {
    id: "1",
    name: "Sharma General Store",
    image: "/placeholder.svg?height=400&width=600",
    coverImage: "/placeholder.svg?height=800&width=1200",
    address: "123 Main Market, Jaipur, Rajasthan",
    phone: "+91 98765 43210",
    openingHours: "9:00 AM - 9:00 PM",
    description:
      "A family-owned general store serving the local community for over 25 years. We offer a wide range of grocery items, household essentials, and fresh produce at competitive prices.",
    rating: 4.8,
    reviewCount: 156,
    distance: 1.2,
    deliveryTime: 15,
    isOpen: true,
    categories: ["Grocery", "Household", "Fresh Produce", "Dairy"],
    products: [
      {
        id: "p1",
        name: "Basmati Rice (5kg)",
        description: "Premium quality basmati rice from the foothills of Himalayas",
        price: 450,
        originalPrice: 500,
        discount: 10,
        category: "Grocery",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "p2",
        name: "Toor Dal (1kg)",
        description: "Organic yellow split pigeon peas",
        price: 120,
        category: "Grocery",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "p3",
        name: "Fresh Milk (1L)",
        description: "Farm fresh cow milk delivered daily",
        price: 60,
        category: "Dairy",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "p4",
        name: "Whole Wheat Atta (10kg)",
        description: "Stone-ground whole wheat flour",
        price: 380,
        originalPrice: 420,
        discount: 10,
        category: "Grocery",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "p5",
        name: "Cleaning Mop",
        description: "Microfiber floor cleaning mop with extendable handle",
        price: 299,
        category: "Household",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "p6",
        name: "Fresh Tomatoes (1kg)",
        description: "Locally grown fresh red tomatoes",
        price: 40,
        category: "Fresh Produce",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "p7",
        name: "Paneer (500g)",
        description: "Fresh homemade cottage cheese",
        price: 150,
        category: "Dairy",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "p8",
        name: "Dish Washing Liquid (1L)",
        description: "Concentrated dish washing liquid with lemon fragrance",
        price: 120,
        category: "Household",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "p9",
        name: "Fresh Onions (1kg)",
        description: "Premium quality red onions",
        price: 35,
        category: "Fresh Produce",
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
    reviews: [
      {
        id: "r1",
        name: "Rahul Sharma",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment:
          "Great selection of products and very friendly staff. The prices are reasonable and they always have fresh produce.",
        date: "2 days ago",
      },
      {
        id: "r2",
        name: "Priya Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        comment:
          "I've been shopping here for years. They have everything I need for my daily groceries. Wish they had more organic options though.",
        date: "1 week ago",
      },
      {
        id: "r3",
        name: "Amit Kumar",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment: "The owner is very helpful and they deliver orders promptly. Highly recommended!",
        date: "2 weeks ago",
      },
    ],
  },
]

