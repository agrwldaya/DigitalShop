"use client"

import { useState } from "react"
import {
  Edit,
  Home,
  MoreVertical,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Store,
  Trash,
  Users,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState("name-asc")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [view, setView] = useState("grid")

  const filteredProducts = products
    .filter((product) => {
      if (categoryFilter !== "all" && product.category !== categoryFilter) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "stock-asc":
          return a.stock - b.stock
        case "stock-desc":
          return b.stock - a.stock
        default:
          return 0
      }
    })

  return (
    <div className="flex min-h-screen w-full flex-col">
       
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Products</h1>
              <p className="text-muted-foreground">Manage your product inventory</p>
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-8 w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Groceries">Groceries</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Home Goods">Home Goods</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-8 w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                  <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                  <SelectItem value="stock-asc">Stock (Low to High)</SelectItem>
                  <SelectItem value="stock-desc">Stock (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search products..." className="pl-8 h-8 w-[200px] md:w-[300px]" />
              </div>

              <Tabs value={view} onValueChange={setView} className="w-[120px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="grid">
                    <GridIcon className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="list">
                    <ListIcon className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
         
          <Tabs value={view} onValueChange={setView} className="w-full">
          <TabsContent value="grid" className="mt-0">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                    {product.stock < 5 && <Badge className="absolute top-2 right-2 bg-red-500">Low Stock</Badge>}
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="line-clamp-1 text-base">{product.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">₹{product.price.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                      </div>
                      <Badge variant="outline">{product.category}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 flex justify-between">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Update Stock</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          </Tabs>
          <Tabs value={view} onValueChange={setView} className="w-full">
          <TabsContent value="list" className="mt-0">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3 w-full">
                          <div className="h-10 w-10 relative">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="rounded object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1">{product.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>₹{product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {product.stock}
                          {product.stock < 5 && (
                            <Badge variant="destructive" className="text-xs">
                              Low
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
          </Tabs>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <strong>1-{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
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

const products = [
  {
    id: 1,
    name: "Basmati Rice (5kg)",
    description: "Premium quality basmati rice from the foothills of Himalayas",
    price: 450,
    stock: 25,
    category: "Groceries",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Toor Dal (1kg)",
    description: "Organic yellow split pigeon peas",
    price: 120,
    stock: 18,
    category: "Groceries",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    description: "Portable wireless speaker with 10 hours battery life",
    price: 1499,
    stock: 7,
    category: "Electronics",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Cotton T-Shirt",
    description: "100% cotton comfortable t-shirt for daily wear",
    price: 399,
    stock: 32,
    category: "Clothing",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Stainless Steel Water Bottle",
    description: "Insulated bottle that keeps water cold for 24 hours",
    price: 599,
    stock: 15,
    category: "Home Goods",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "LED Bulb (9W)",
    description: "Energy-saving LED bulb with 2 years warranty",
    price: 120,
    stock: 50,
    category: "Electronics",
    image: "/placeholder.svg",
  },
  {
    id: 7,
    name: "Whole Wheat Atta (10kg)",
    description: "Stone-ground whole wheat flour",
    price: 380,
    stock: 12,
    category: "Groceries",
    image: "/placeholder.svg",
  },
  {
    id: 8,
    name: "Cotton Bedsheet",
    description: "King size cotton bedsheet with 2 pillow covers",
    price: 899,
    stock: 8,
    category: "Home Goods",
    image: "/placeholder.svg",
  },
  {
    id: 9,
    name: "Spice Box Set",
    description: "Traditional Indian masala dabba with 7 compartments",
    price: 499,
    stock: 4,
    category: "Home Goods",
    image: "/placeholder.svg",
  },
  {
    id: 10,
    name: "Mobile Phone Stand",
    description: "Adjustable phone holder for desk",
    price: 249,
    stock: 22,
    category: "Electronics",
    image: "/placeholder.svg",
  },
  {
    id: 11,
    name: "Cotton Kurta",
    description: "Traditional Indian kurta for men",
    price: 799,
    stock: 14,
    category: "Clothing",
    image: "/placeholder.svg",
  },
  {
    id: 12,
    name: "Pressure Cooker (5L)",
    description: "Stainless steel pressure cooker for Indian cooking",
    price: 1299,
    stock: 6,
    category: "Home Goods",
    image: "/placeholder.svg",
  },
]

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

function GridIcon(props) {
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
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  )
}

function ListIcon(props) {
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
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  )
}

    