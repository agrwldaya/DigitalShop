"use client"
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Phone, Calendar, Edit, Camera, MapPin, Shield, Star } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CustomerNavbar from "@/components/customer/customer-navbar"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

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
      <CustomerNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="flex flex-col md:flex-row gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Sidebar */}
          <motion.div variants={itemVariants} className="w-full md:w-80">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Rahul Sharma" />
                      <AvatarFallback className="text-2xl bg-orange-100 text-orange-800">RS</AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold">Rahul Sharma</h2>
                  <p className="text-sm text-gray-500 mb-4">Member since April 2022</p>

                  <div className="w-full space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <Phone className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">+91 98765 43210</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <Mail className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">rahul.sharma@example.com</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">Jaipur, Rajasthan</p>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-6" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancel Editing" : "Edit Profile"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="flex-1">
            <Tabs defaultValue="profile">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6 space-y-6">
                {isEditing ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Edit Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="Rahul" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Sharma" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="rahul.sharma@example.com" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+91 98765 43210" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input id="dob" type="date" defaultValue="1990-05-15" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue="123 Main Street, Jaipur" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" defaultValue="Jaipur" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" defaultValue="Rajasthan" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pincode">PIN Code</Label>
                          <Input id="pincode" defaultValue="302001" />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button className="bg-orange-600 hover:bg-orange-700">Save Changes</Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                            <dd className="mt-1 flex items-center">
                              <User className="h-4 w-4 text-orange-600 mr-2" />
                              <span>Rahul Sharma</span>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                            <dd className="mt-1 flex items-center">
                              <Mail className="h-4 w-4 text-orange-600 mr-2" />
                              <span>rahul.sharma@example.com</span>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Phone</dt>
                            <dd className="mt-1 flex items-center">
                              <Phone className="h-4 w-4 text-orange-600 mr-2" />
                              <span>+91 98765 43210</span>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                            <dd className="mt-1 flex items-center">
                              <Calendar className="h-4 w-4 text-orange-600 mr-2" />
                              <span>May 15, 1990</span>
                            </dd>
                          </div>
                        </dl>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Address Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-orange-600 mt-0.5" />
                            <div>
                              <h3 className="font-medium">Home Address</h3>
                              <p className="text-sm text-gray-600">123 Main Street, Jaipur, Rajasthan, 302001</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-orange-600 mt-0.5" />
                            <div>
                              <h3 className="font-medium">Work Address</h3>
                              <p className="text-sm text-gray-600">
                                456 Tech Park, Sector 18, Jaipur, Rajasthan, 302022
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Account Security</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Shield className="h-5 w-5 text-orange-600 mt-0.5" />
                            <div>
                              <h3 className="font-medium">Password</h3>
                              <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                              <Button variant="link" className="p-0 h-auto text-orange-600 text-sm">
                                Change Password
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Shield className="h-5 w-5 text-orange-600 mt-0.5" />
                            <div>
                              <h3 className="font-medium">Two-Factor Authentication</h3>
                              <p className="text-sm text-gray-600">Not enabled</p>
                              <Button variant="link" className="p-0 h-auto text-orange-600 text-sm">
                                Enable 2FA
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </TabsContent>

              <TabsContent value="orders" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: "ORD-12345",
                          date: "April 7, 2023",
                          shop: "Sharma General Store",
                          items: 3,
                          total: "₹640.50",
                          status: "Completed",
                        },
                        {
                          id: "ORD-12344",
                          date: "March 25, 2023",
                          shop: "Patel Electronics",
                          items: 1,
                          total: "₹1,499.00",
                          status: "Completed",
                        },
                        {
                          id: "ORD-12343",
                          date: "March 18, 2023",
                          shop: "Kumar Clothing",
                          items: 2,
                          total: "₹899.00",
                          status: "Cancelled",
                        },
                        {
                          id: "ORD-12342",
                          date: "March 10, 2023",
                          shop: "Verma Bakery",
                          items: 4,
                          total: "₹450.00",
                          status: "Completed",
                        },
                      ].map((order) => (
                        <div
                          key={order.id}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="space-y-1 mb-2 md:mb-0">
                            <div className="flex items-center">
                              <h3 className="font-medium">{order.id}</h3>
                              <Badge
                                className={`ml-2 ${
                                  order.status === "Completed"
                                    ? "bg-green-500"
                                    : order.status === "Cancelled"
                                      ? "bg-red-500"
                                      : "bg-orange-500"
                                }`}
                              >
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">{order.date}</p>
                            <p className="text-sm">{order.shop}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-gray-500">{order.items} items</p>
                              <p className="font-medium">{order.total}</p>
                            </div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 text-center">
                      <Button variant="link" className="text-orange-600">
                        View All Orders
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        {
                          id: 1,
                          shop: "Sharma General Store",
                          date: "April 2, 2023",
                          rating: 5,
                          comment:
                            "Great selection of products and very friendly staff. The prices are reasonable and they always have fresh produce.",
                          image: "/placeholder.svg?height=60&width=60",
                        },
                        {
                          id: 2,
                          shop: "Patel Electronics",
                          date: "March 20, 2023",
                          rating: 4,
                          comment:
                            "Good quality electronics at reasonable prices. The staff was knowledgeable and helped me choose the right product.",
                          image: "/placeholder.svg?height=60&width=60",
                        },
                        {
                          id: 3,
                          shop: "Verma Bakery",
                          date: "March 5, 2023",
                          rating: 5,
                          comment:
                            "The cakes and pastries are absolutely delicious! Fresh and tasty every time. Highly recommended!",
                          image: "/placeholder.svg?height=60&width=60",
                        },
                      ].map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-0 last:pb-0">
                          <div className="flex items-start gap-4">
                            <div className="relative h-15 w-15 rounded-md overflow-hidden flex-shrink-0">
                              <Image
                                src={review.image || "/placeholder.svg"}
                                alt={review.shop}
                                width={60}
                                height={60}
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{review.shop}</h3>
                                  <p className="text-xs text-gray-500">{review.date}</p>
                                </div>
                                <div className="flex items-center">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                              <div className="mt-2 flex gap-2">
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-600">
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
