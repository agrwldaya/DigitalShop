"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
 
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import CustomerNavbar from "@/components/customer/customer-navbar"

export default function CartPage() {
  // Mock cart data - in a real app, this would come from a cart context or state management
  const [cartItems, setCartItems] = useState([
    {
      id: "p1",
      name: "Basmati Rice (5kg)",
      price: 450,
      quantity: 1,
      image: "/placeholder.svg?height=300&width=300",
      shop: "Sharma General Store",
    },
    {
      id: "p3",
      name: "Fresh Milk (1L)",
      price: 60,
      quantity: 2,
      image: "/placeholder.svg?height=300&width=300",
      shop: "Sharma General Store",
    },
    {
      id: "p6",
      name: "Fresh Tomatoes (1kg)",
      price: 40,
      quantity: 1,
      image: "/placeholder.svg?height=300&width=300",
      shop: "Sharma General Store",
    },
  ])

  const increaseQuantity = (id) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)))
  }

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item)),
    )
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTaxes = () => {
    return getSubtotal() * 0.05
  }

  const getTotal = () => {
    return getSubtotal() + getTaxes()
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

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CustomerNavbar />
        <div className="container mx-auto px-4 py-12">
          <motion.div
            className="max-w-md mx-auto text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-12 w-12 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you have not added any items to your cart yet.</p>
            <Link href="/customer">
              <Button className="bg-orange-600 hover:bg-orange-700">Start Shopping</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNavbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <p className="text-gray-600">{cartItems.length} items from Sharma General Store</p>
        </div>

        <motion.div
          className="flex flex-col lg:flex-row gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Cart Items */}
          <motion.div variants={itemVariants} className="flex-1">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Cart Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex gap-4 pb-6 border-b last:border-0 last:pb-0"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.shop}</p>
                        <p className="font-medium mt-1">₹{item.price}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => decreaseQuantity(item.id)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
                <Button variant="outline" className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Cart
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Order Summary */}
          <motion.div variants={itemVariants} className="w-full lg:w-96">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal ({cartItems.length} items)</span>
                      <span>₹{getSubtotal()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Taxes (5%)</span>
                      <span>₹{getTaxes().toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{getTotal().toFixed(2)}</span>
                  </div>

                  <div className="pt-4">
                    <div className="space-y-2">
                      <label htmlFor="coupon" className="text-sm font-medium">
                        Apply Coupon
                      </label>
                      <div className="flex gap-2">
                        <Input id="coupon" placeholder="Enter coupon code" className="flex-1" />
                        <Button variant="outline">Apply</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/customer/checkout" className="w-full">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
