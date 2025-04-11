"use client"

import { useState } from "react"
import { Bell, Home, Package, Search, Settings, ShoppingBag, Store, User, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen w-full flex-col">
       
     
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
              <p className="text-muted-foreground">Manage your customer relationships</p>
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <User className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search customers..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs defaultValue="all" className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All Customers</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id}>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                    <AvatarFallback className="bg-orange-100 text-orange-800">
                      {customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <CardTitle className="text-base">{customer.name}</CardTitle>
                    <CardDescription className="text-xs">{customer.email}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Orders:</span>
                      <span>{customer.orders}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total Spent:</span>
                      <span>₹{customer.totalSpent}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Last Order:</span>
                      <span>{customer.lastOrder}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Orders
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
    </div>
  )
}

const customers = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    orders: 12,
    totalSpent: "12,450",
    lastOrder: "Today",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 87654 32109",
    orders: 8,
    totalSpent: "8,320",
    lastOrder: "Yesterday",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    phone: "+91 76543 21098",
    orders: 15,
    totalSpent: "15,780",
    lastOrder: "3 days ago",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Neha Singh",
    email: "neha.singh@example.com",
    phone: "+91 65432 10987",
    orders: 5,
    totalSpent: "4,250",
    lastOrder: "1 week ago",
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Vikram Mehta",
    email: "vikram.mehta@example.com",
    phone: "+91 54321 09876",
    orders: 20,
    totalSpent: "22,150",
    lastOrder: "2 days ago",
    avatar: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Ananya Desai",
    email: "ananya.desai@example.com",
    phone: "+91 43210 98765",
    orders: 3,
    totalSpent: "2,800",
    lastOrder: "2 weeks ago",
    avatar: "/placeholder.svg",
  },
  {
    id: 7,
    name: "Rajesh Gupta",
    email: "rajesh.gupta@example.com",
    phone: "+91 32109 87654",
    orders: 10,
    totalSpent: "9,650",
    lastOrder: "5 days ago",
    avatar: "/placeholder.svg",
  },
  {
    id: 8,
    name: "Meera Joshi",
    email: "meera.joshi@example.com",
    phone: "+91 21098 76543",
    orders: 7,
    totalSpent: "6,320",
    lastOrder: "1 day ago",
    avatar: "/placeholder.svg",
  },
  {
    id: 9,
    name: "Arjun Reddy",
    email: "arjun.reddy@example.com",
    phone: "+91 10987 65432",
    orders: 2,
    totalSpent: "1,850",
    lastOrder: "3 weeks ago",
    avatar: "/placeholder.svg",
  },
]

