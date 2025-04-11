"use client"

import { useState } from "react"
import { Bell, CreditCard, Home, Lock, Package, Save, SettingsIcon, ShoppingBag, Store, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">Manage your shop settings and preferences</p>
            </div>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4 md:w-fit">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Manage your basic shop settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="shop-name">Shop Name</Label>
                    <Input id="shop-name" defaultValue="Sharma General Store" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shop-description">Shop Description</Label>
                    <Textarea
                      id="shop-description"
                      defaultValue="Your one-stop shop for all daily needs. We provide quality products at affordable prices."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input id="contact-email" type="email" defaultValue="sharma.store@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Contact Phone</Label>
                    <Input id="contact-phone" type="tel" defaultValue="+91 98765 43210" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Temporarily disable your shop for maintenance</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                  <CardDescription>Set your shop's operating hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <div key={day} className="flex items-center justify-between">
                        <Label>{day}</Label>
                        <div className="flex items-center gap-2">
                          <Input type="time" defaultValue={day === "Sunday" ? "" : "09:00"} className="w-[120px]" />
                          <span>to</span>
                          <Input type="time" defaultValue={day === "Sunday" ? "" : "20:00"} className="w-[120px]" />
                          <Switch defaultChecked={day !== "Sunday"} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Save className="mr-2 h-4 w-4" />
                    Save Hours
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg" alt="Profile" />
                      <AvatarFallback className="text-2xl bg-orange-100 text-orange-800">RS</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1">JPG, PNG or GIF. Max size of 2MB.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="Rajesh" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="Sharma" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="rajesh.sharma@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      defaultValue="Shop owner with over 15 years of experience in retail. Passionate about providing quality products and excellent customer service."
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Update your password and security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Lock className="mr-2 h-4 w-4" />
                    Update Password
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="business" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>Manage your business details and address</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Legal Business Name</Label>
                    <Input id="business-name" defaultValue="Sharma Enterprises" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gst-number">GST Number</Label>
                    <Input id="gst-number" defaultValue="22AAAAA0000A1Z5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pan-number">PAN Number</Label>
                    <Input id="pan-number" defaultValue="AAAAA0000A" />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="address-line1">Address Line 1</Label>
                    <Input id="address-line1" defaultValue="Shop No. 123, Main Market" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address-line2">Address Line 2</Label>
                    <Input id="address-line2" defaultValue="Near Bus Stand" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                </CardContent>
                <CardFooter>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Save className="mr-2 h-4 w-4" />
                    Save Business Info
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>Update your payment and bank details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="account-name">Account Holder Name</Label>
                    <Input id="account-name" defaultValue="Rajesh Sharma" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input id="account-number" defaultValue="1234567890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ifsc-code">IFSC Code</Label>
                    <Input id="ifsc-code" defaultValue="SBIN0000123" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bank-name">Bank Name</Label>
                    <Input id="bank-name" defaultValue="State Bank of India" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch</Label>
                    <Input id="branch" defaultValue="Main Branch, Jaipur" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>UPI Payments</Label>
                      <p className="text-sm text-muted-foreground">Accept UPI payments from customers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Save Payment Info
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New Order Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications when a new order is placed</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Order Status Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when an order status changes
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Low Stock Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified when product stock is running low</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Customer Messages</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications for new customer messages</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Marketing Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Channels</CardTitle>
                  <CardDescription>Choose how you want to receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>WhatsApp Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via WhatsApp</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Save className="mr-2 h-4 w-4" />
                    Save Channels
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
  )
}

function Badge({ className, ...props }) {
  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
      {...props}
    />
  )
}

