"use client"

import { useState } from "react"
import {
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Home,
  Package,
  Search,
  Settings,
  ShoppingBag,
  Store,
  Users,
  X,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function OrdersPage() {
  const [dateFilter, setDateFilter] = useState("today")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== "all" && order.status !== statusFilter) {
      return false
    }

    // In a real app, we would filter by date here
    return true
  })

  return (
    <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
              <p className="text-muted-foreground">Manage and track your customer orders</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateFilter === "today"
                      ? "Today"
                      : dateFilter === "yesterday"
                        ? "Yesterday"
                        : dateFilter === "week"
                          ? "This Week"
                          : "This Month"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => setDateFilter("today")}>Today</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateFilter("yesterday")}>Yesterday</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateFilter("week")}>This Week</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateFilter("month")}>This Month</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-8 w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Packed">Packed</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search orders..." className="pl-8 h-8 w-[200px] md:w-[300px]" />
              </div>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="packed">Packed</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="border rounded-md mt-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="hidden md:table-cell">Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-orange-100 text-orange-800">
                              {order.customer
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="hidden md:block">{order.customer}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                      <TableCell className="hidden md:table-cell">{order.items}</TableCell>
                      <TableCell>₹{order.total}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="pending">
              {/* Similar table structure for pending orders */}
              <div className="border rounded-md p-8 text-center">
                <Clock className="mx-auto h-8 w-8 text-orange-500 mb-2" />
                <h3 className="text-lg font-medium">Pending Orders</h3>
                <p className="text-sm text-muted-foreground">You have 7 pending orders that need attention</p>
              </div>
            </TabsContent>
            <TabsContent value="packed">
              {/* Similar table structure for packed orders */}
              <div className="border rounded-md p-8 text-center">
                <Package className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                <h3 className="text-lg font-medium">Packed Orders</h3>
                <p className="text-sm text-muted-foreground">You have 5 packed orders ready for pickup</p>
              </div>
            </TabsContent>
            <TabsContent value="completed">
              {/* Similar table structure for completed orders */}
              <div className="border rounded-md p-8 text-center">
                <Check className="mx-auto h-8 w-8 text-green-500 mb-2" />
                <h3 className="text-lg font-medium">Completed Orders</h3>
                <p className="text-sm text-muted-foreground">You have completed 24 orders this week</p>
              </div>
            </TabsContent>
            <TabsContent value="cancelled">
              {/* Similar table structure for cancelled orders */}
              <div className="border rounded-md p-8 text-center">
                <X className="mx-auto h-8 w-8 text-red-500 mb-2" />
                <h3 className="text-lg font-medium">Cancelled Orders</h3>
                <p className="text-sm text-muted-foreground">You have 3 cancelled orders this week</p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>24</strong> orders
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </main>
    </div>
  )
}

const orders = [
  {
    id: "ORD-5523",
    customer: "Rahul Sharma",
    date: "Today, 10:30 AM",
    items: 3,
    total: "1,250",
    status: "Pending",
  },
  {
    id: "ORD-5522",
    customer: "Priya Patel",
    date: "Today, 9:15 AM",
    items: 2,
    total: "850",
    status: "Packed",
  },
  {
    id: "ORD-5521",
    customer: "Amit Kumar",
    date: "Yesterday, 4:45 PM",
    items: 5,
    total: "2,100",
    status: "Completed",
  },
  {
    id: "ORD-5520",
    customer: "Neha Singh",
    date: "Yesterday, 2:30 PM",
    items: 1,
    total: "450",
    status: "Cancelled",
  },
  {
    id: "ORD-5519",
    customer: "Vikram Mehta",
    date: "Yesterday, 11:20 AM",
    items: 4,
    total: "1,800",
    status: "Completed",
  },
  {
    id: "ORD-5518",
    customer: "Ananya Desai",
    date: "Mar 20, 2023",
    items: 2,
    total: "950",
    status: "Pending",
  },
  {
    id: "ORD-5517",
    customer: "Rajesh Gupta",
    date: "Mar 20, 2023",
    items: 3,
    total: "1,450",
    status: "Packed",
  },
  {
    id: "ORD-5516",
    customer: "Meera Joshi",
    date: "Mar 19, 2023",
    items: 1,
    total: "550",
    status: "Completed",
  },
  {
    id: "ORD-5515",
    customer: "Arjun Reddy",
    date: "Mar 19, 2023",
    items: 6,
    total: "3,200",
    status: "Pending",
  },
  {
    id: "ORD-5514",
    customer: "Kavita Sharma",
    date: "Mar 18, 2023",
    items: 2,
    total: "1,100",
    status: "Packed",
  },
]

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

function MoreVertical(props) {
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
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  )
}

