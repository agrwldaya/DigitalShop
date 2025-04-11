"use client"
/* eslint-disable react/no-unescaped-entities */


import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingBag, CreditCard, Truck, MapPin, User, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CustomerNavbar from "@/components/customer/customer-navbar"

export default function CheckoutPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [deliveryOption, setDeliveryOption] = useState("pickup")
  const [pickupDate, setPickupDate] = useState("")
  const [pickupTime, setPickupTime] = useState("")
  const [orderPlaced, setOrderPlaced] = useState(false)

  // Mock cart data - in a real app, this would come from a cart context or state management
  const cart = [
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
  ]

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTaxes = () => {
    return getSubtotal() * 0.05
  }

  const getTotal = () => {
    return getSubtotal() + getTaxes()
  }

  const handlePlaceOrder = () => {
    setIsLoading(true)

    // Simulate API call to place order
    setTimeout(() => {
      setIsLoading(false)
      setOrderPlaced(true)

      // Redirect to order confirmation after a delay
      setTimeout(() => {
        router.push("/customer/order-confirmation")
      }, 3000)
    }, 2000)
  }

  // Generate available pickup time slots
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 9; hour <= 20; hour++) {
      const hourFormatted = hour > 12 ? hour - 12 : hour
      const amPm = hour >= 12 ? "PM" : "AM"
      slots.push(`${hourFormatted}:00 ${amPm}`)
      if (hour < 20) {
        slots.push(`${hourFormatted}:30 ${amPm}`)
      }
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  // Generate next 7 days for pickup
  const generateDateOptions = () => {
    const options = []
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })

      options.push({
        value: date.toISOString().split("T")[0],
        label: i === 0 ? `Today (${formattedDate})` : formattedDate,
      })
    }

    return options
  }

  const dateOptions = generateDateOptions()

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CustomerNavbar />
        <div className="container mx-auto px-4 py-12 max-w-md">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-8">
              Your order has been placed successfully. You will receive a confirmation shortly.
            </p>
            <div className="animate-pulse mb-8">
              <p className="text-sm text-gray-500">Redirecting to order confirmation...</p>
            </div>
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
          <h1 className="text-2xl font-bold">Checkout</h1>
          <p className="text-gray-600">Complete your order from Sharma General Store</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-orange-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" defaultValue="Rahul Sharma" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter your phone number" defaultValue="+91 98765 43210" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    defaultValue="rahul.sharma@example.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-orange-600" />
                  Delivery Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption} className="space-y-4">
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                      <div className="font-medium">Store Pickup</div>
                      <div className="text-sm text-gray-500">Collect your order directly from the store</div>
                    </Label>
                    <div className="text-orange-600 font-medium">Free</div>
                  </div>

                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="delivery" id="delivery" disabled />
                    <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                      <div className="font-medium">Home Delivery</div>
                      <div className="text-sm text-gray-500">Get your order delivered to your doorstep</div>
                      <div className="text-xs text-orange-600 mt-1">Not available for this store</div>
                    </Label>
                    <div className="text-gray-400 font-medium">₹40</div>
                  </div>
                </RadioGroup>

                {deliveryOption === "pickup" && (
                  <div className="border rounded-lg p-4 bg-orange-50 space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Sharma General Store</h3>
                        <p className="text-sm text-gray-600">123 Main Market, Jaipur, Rajasthan</p>
                        <p className="text-sm text-gray-600">Open: 9:00 AM - 9:00 PM</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pickup-date">Pickup Date</Label>
                        <Select value={pickupDate} onValueChange={setPickupDate}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select date" />
                          </SelectTrigger>
                          <SelectContent>
                            {dateOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pickup-time">Pickup Time</Label>
                        <Select value={pickupTime} onValueChange={setPickupTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                {slot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-orange-600" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="cod" onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="cod">Cash on Pickup</TabsTrigger>
                    <TabsTrigger value="upi">UPI</TabsTrigger>
                    <TabsTrigger value="card">Card</TabsTrigger>
                  </TabsList>

                  <TabsContent value="cod" className="p-4 border rounded-lg mt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Cash on Pickup</h3>
                        <p className="text-sm text-gray-500">Pay when you collect your order</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="upi" className="p-4 border rounded-lg mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">UPI Payment</h3>
                          <p className="text-sm text-gray-500">Pay using any UPI app</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {["Google Pay", "PhonePe", "Paytm", "Other UPI"].map((app) => (
                          <div
                            key={app}
                            className="border rounded-lg p-2 text-center cursor-pointer hover:border-orange-600"
                          >
                            {app}
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="upi-id">UPI ID</Label>
                        <Input id="upi-id" placeholder="yourname@upi" />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="card" className="p-4 border rounded-lg mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Card Payment</h3>
                          <p className="text-sm text-gray-500">Pay using credit or debit card</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="name-on-card">Name on Card</Label>
                        <Input id="name-on-card" placeholder="Enter name as on card" />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-orange-600" />
                  Additional Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes for the Shop (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions for your order..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingBag className="h-5 w-5 mr-2 text-orange-600" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {cart.map((item) => (
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

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal ({getTotalItems()} items)</span>
                      <span>₹{getSubtotal()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Taxes (5%)</span>
                      <span>₹{getTaxes().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{getTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    disabled={isLoading || !pickupDate || !pickupTime}
                    onClick={handlePlaceOrder}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Processing...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </Button>

                  {(!pickupDate || !pickupTime) && deliveryOption === "pickup" && (
                    <p className="text-xs text-orange-600 text-center">
                      Please select pickup date and time to continue
                    </p>
                  )}

                  <p className="text-xs text-center text-gray-500">
                    By placing your order, you agree to our Terms of Service and Privacy Policy
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
