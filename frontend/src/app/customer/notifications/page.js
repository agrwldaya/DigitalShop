"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, ShoppingBag, Tag, Info, AlertTriangle, CheckCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
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

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(allNotifications)
  const [notificationPreferences, setNotificationPreferences] = useState({
    orderUpdates: true,
    promotions: true,
    paymentUpdates: true,
    newShops: false,
    appUpdates: true,
  })

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

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNavbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-gray-600">Stay updated with your orders and offers</p>
        </div>

        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                Mark All as Read
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-red-600">
                    Clear All
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear all notifications?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to clear all notifications? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={clearAllNotifications}>
                      Clear All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <TabsContent value="all">
            {notifications.length > 0 ? (
              <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                {notifications.map((notification) => (
                  <motion.div key={notification.id} variants={itemVariants}>
                    <Card
                      className={`overflow-hidden transition-colors ${
                        !notification.read ? "border-l-4 border-l-orange-600 bg-orange-50" : ""
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              getNotificationIconColor(notification.type).bg
                            }`}
                          >
                            {getNotificationIcon(notification.type, getNotificationIconColor(notification.type).text)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{notification.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">{notification.time}</span>
                                <div className="flex gap-1">
                                  {!notification.read && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7 text-gray-400 hover:text-gray-600"
                                      onClick={() => markAsRead(notification.id)}
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-gray-400 hover:text-red-500"
                                    onClick={() => deleteNotification(notification.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                            {notification.actionText && (
                              <Button variant="link" className="p-0 h-auto text-orange-600 text-sm mt-2">
                                {notification.actionText}
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bell className="h-10 w-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-medium mb-2">No notifications</h3>
                <p className="text-gray-500">
                  You don't have any notifications at the moment. We'll notify you when there are updates.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="unread">
            {unreadCount > 0 ? (
              <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                {notifications
                  .filter((notification) => !notification.read)
                  .map((notification) => (
                    <motion.div key={notification.id} variants={itemVariants}>
                      <Card className="overflow-hidden border-l-4 border-l-orange-600 bg-orange-50">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                getNotificationIconColor(notification.type).bg
                              }`}
                            >
                              {getNotificationIcon(notification.type, getNotificationIconColor(notification.type).text)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{notification.title}</h3>
                                  <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500">{notification.time}</span>
                                  <div className="flex gap-1">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7 text-gray-400 hover:text-gray-600"
                                      onClick={() => markAsRead(notification.id)}
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7 text-gray-400 hover:text-red-500"
                                      onClick={() => deleteNotification(notification.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              {notification.actionText && (
                                <Button variant="link" className="p-0 h-auto text-orange-600 text-sm mt-2">
                                  {notification.actionText}
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bell className="h-10 w-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-medium mb-2">No unread notifications</h3>
                <p className="text-gray-500">You've read all your notifications. Check back later for updates.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Order Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications about your order status</p>
                    </div>
                    <Switch
                      checked={notificationPreferences.orderUpdates}
                      onCheckedChange={(checked) =>
                        setNotificationPreferences({ ...notificationPreferences, orderUpdates: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Promotions & Offers</Label>
                      <p className="text-sm text-muted-foreground">Get notified about discounts and special offers</p>
                    </div>
                    <Switch
                      checked={notificationPreferences.promotions}
                      onCheckedChange={(checked) =>
                        setNotificationPreferences({ ...notificationPreferences, promotions: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Payment Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about payment confirmations and refunds
                      </p>
                    </div>
                    <Switch
                      checked={notificationPreferences.paymentUpdates}
                      onCheckedChange={(checked) =>
                        setNotificationPreferences({ ...notificationPreferences, paymentUpdates: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">New Shops Nearby</Label>
                      <p className="text-sm text-muted-foreground">Get notified when new shops open in your area</p>
                    </div>
                    <Switch
                      checked={notificationPreferences.newShops}
                      onCheckedChange={(checked) =>
                        setNotificationPreferences({ ...notificationPreferences, newShops: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">App Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about app updates and new features
                      </p>
                    </div>
                    <Switch
                      checked={notificationPreferences.appUpdates}
                      onCheckedChange={(checked) =>
                        setNotificationPreferences({ ...notificationPreferences, appUpdates: checked })
                      }
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Notification Channels</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-8 bg-orange-600 hover:bg-orange-700">Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function getNotificationIcon(type,color) {
  switch (type) {
    case "order":
      return <ShoppingBag className={`h-5 w-5 ${color}`} />
    case "promo":
      return <Tag className={`h-5 w-5 ${color}`} />
    case "info":
      return <Info className={`h-5 w-5 ${color}`} />
    case "alert":
      return <AlertTriangle className={`h-5 w-5 ${color}`} />
    default:
      return <Bell className={`h-5 w-5 ${color}`} />
  }
}

function getNotificationIconColor(type) {
  switch (type) {
    case "order":
      return { bg: "bg-blue-100", text: "text-blue-600" }
    case "promo":
      return { bg: "bg-green-100", text: "text-green-600" }
    case "info":
      return { bg: "bg-orange-100", text: "text-orange-600" }
    case "alert":
      return { bg: "bg-red-100", text: "text-red-600" }
    default:
      return { bg: "bg-gray-100", text: "text-gray-600" }
  }
}

const allNotifications = [
  {
    id: "1",
    type: "order",
    title: "Order Confirmed",
    message: "Your order #ORD-12345 has been confirmed and is being processed.",
    time: "Just now",
    read: false,
    actionText: "View Order",
  },
  {
    id: "2",
    type: "promo",
    title: "Special Offer",
    message: "Get 20% off on all grocery items at Sharma General Store today!",
    time: "2 hours ago",
    read: false,
    actionText: "Shop Now",
  },
  {
    id: "3",
    type: "info",
    title: "New Shop Added",
    message: "Mehta Electronics is now available in your area.",
    time: "Yesterday",
    read: true,
    actionText: "Explore Shop",
  },
  {
    id: "4",
    type: "order",
    title: "Order Ready for Pickup",
    message: "Your order #ORD-12344 is ready for pickup at Patel Electronics.",
    time: "2 days ago",
    read: true,
    actionText: "View Details",
  },
  {
    id: "5",
    type: "alert",
    title: "Payment Failed",
    message: "Your payment for order #ORD-12343 was declined. Please update your payment method.",
    time: "3 days ago",
    read: true,
    actionText: "Update Payment",
  },
]
