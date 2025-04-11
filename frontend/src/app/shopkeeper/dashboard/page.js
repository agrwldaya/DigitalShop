"use client";
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import {Package, ShoppingBag, Clock, BarChart3, PlusCircle, Calendar, Badge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useSelector } from "react-redux";
 
 

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
 

  const shopdata = useSelector((state) => state.shopkeeper);
  // console.log(shopdata)
   
  const shopprofile = shopdata.profile

   const TotalOrder = shopdata.orders
   const TotalProduct = shopdata.products
  

  return (
    <div className="min-h-screen w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back,{shopprofile.ownerName}  Ji!</h1>
        <p className="text-gray-600">Here is what is happening with your shop today.</p>
      </div>
         <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{TotalProduct.length}</div>
                <p className="text-xs text-muted-foreground">+2 added today</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium"><p>Today's Orders</p></CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{TotalOrder.length}</div>
                <p className="text-xs text-muted-foreground">+8 from yesterday</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">Need attention</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹12,450</div>
                <p className="text-xs text-muted-foreground">+18% from yesterday</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>You have received 24 orders today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center gap-4">
                      <div className="rounded-full p-2" style={{ backgroundColor: getStatusColor(order.status) }}>
                        <ShoppingBag className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Order #{order.id} - {order.customer}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.items} items - ₹{order.total}
                        </p>
                      </div>
                      <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Orders
                </Button>
              </CardFooter>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your shop efficiently</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Product
                </Button>
                <Button variant="outline" className="w-full">
                  <Package className="mr-2 h-4 w-4" />
                  View Products
                </Button>
                <Button variant="outline" className="w-full">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  View Orders
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Update Business Hours
                </Button>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Customers Served</CardTitle>
              <CardDescription>You have served 1,248 customers this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Customer growth chart will appear here</p>
              </div>
            </CardContent>
          </Card>
        </main>
    </div>
  );
}

const recentOrders = [
  {
    id: "ORD-5523",
    customer: "Rahul Sharma",
    items: 3,
    total: "1,250",
    status: "Pending",
  },
  {
    id: "ORD-5522",
    customer: "Priya Patel",
    items: 2,
    total: "850",
    status: "Packed",
  },
  {
    id: "ORD-5521",
    customer: "Amit Kumar",
    items: 5,
    total: "2,100",
    status: "Completed",
  },
  {
    id: "ORD-5520",
    customer: "Neha Singh",
    items: 1,
    total: "450",
    status: "Cancelled",
  },
]

function getStatusColor(status) {
  switch (status) {
    case "Pending":
      return "#f59e0b"
    case "Packed":
      return "#3b82f6"
    case "Completed":
      return "#10b981"
    case "Cancelled":
      return "#ef4444"
    default:
      return "#6b7280"
  }
}

function getStatusVariant(status) {
  switch (status) {
    case "Pending":
      return "warning"
    case "Packed":
      return "default"
    case "Completed":
      return "success"
    case "Cancelled":
      return "destructive"
    default:
      return "secondary"
  }
}

function Bell(props) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}