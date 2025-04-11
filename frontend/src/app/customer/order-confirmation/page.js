"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ShoppingBag,
  CheckCircle,
  MapPin,
  Calendar,
  Clock,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Printer,
  Download,
  Share2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
 
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import CustomerNavbar from "@/components/customer/customer-navbar"

export default function OrderConfirmationPage() {
  const [isExpanded, setIsExpanded] = useState(false)

  // Mock order data - in a real app, this would come from an API call
  const order = {
    id: "ORD-12345",
    date: "April 7, 2023",
    status: "Confirmed",
    shop: {
      name: "Sharma General Store",
      address: "123 Main Market, Jaipur, Rajasthan",
      phone: "+91 98765 43210",
    },
    pickup: {
      date: "April 8, 2023",
      time: "2:00 PM",
    },
    payment: {
      method: "Cash on Pickup",
      status: "Pending",
    },
    items: [
      {
        id: "p1",
        name: "Basmati Rice (5kg)",
        price: 450,
        quantity: 1,
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "p3",
        name: "Fresh Milk (1L)",
        price: 60,
        quantity: 2,
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "p6",
        name: "Fresh Tomatoes (1kg)",
        price: 40,
        quantity: 1,
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
    subtotal: 610,
    taxes: 30.5,
    total: 640.5,
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNavbar />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
          {/* Order Confirmation Header */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-2">Your order #{order.id} has been placed successfully</p>
            <p className="text-sm text-gray-500">A confirmation has been sent to your phone and email</p>
          </motion.div>

          {/* Order Status Card */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span>Order Status</span>
                  <Badge className="bg-green-600">Confirmed</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <ShoppingBag className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">Order Placed</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600 fill-green-600" />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">Processing</p>
                        <p className="text-xs text-gray-500">Shop is preparing your order</p>
                      </div>
                    </div>
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">Ready for Pickup</p>
                        <p className="text-xs text-gray-500">Your order will be ready on {order.pickup.date}</p>
                      </div>
                    </div>
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pickup Details */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Pickup Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">{order.shop.name}</h3>
                      <p className="text-sm text-gray-600">{order.shop.address}</p>
                      <p className="text-sm text-gray-600">{order.shop.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Pickup Date & Time</h3>
                      <p className="text-sm text-gray-600">
                        {order.pickup.date} at {order.pickup.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CreditCard className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Payment Method</h3>
                      <p className="text-sm text-gray-600">{order.payment.method}</p>
                      <Badge variant="outline" className="mt-1">
                        {order.payment.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Summary */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span>Order Summary</span>
                  <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-1" />
                        Hide Items
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" />
                        Show Items
                      </>
                    )}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isExpanded && (
                  <div className="space-y-4 mb-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal ({order.items.length} items)</span>
                    <span>₹{order.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Taxes (5%)</span>
                    <span>₹{order.taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>₹{order.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
              <Printer className="h-4 w-4 mr-2" />
              Print Receipt
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
            <Button variant="outline" className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Share Order
            </Button>
          </motion.div>

          {/* Continue Shopping */}
          <motion.div variants={itemVariants} className="text-center">
            <Link href="/customer">
              <Button variant="link" className="text-orange-600">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

