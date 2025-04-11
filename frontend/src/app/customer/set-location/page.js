"use client"
/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Search, Navigation, Home, Briefcase, Star, Clock, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import CustomerNavbar from "@/components/customer/customer-navbar"

export default function SetLocationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [currentTab, setCurrentTab] = useState("search")
  const [useCurrentLocation, setUseCurrentLocation] = useState(false)

  useEffect(() => {
    // Simulate loading map data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleSaveLocation = () => {
    // In a real app, this would save the location to user's profile
    // and update the global state
    router.push("/customer")
  }

  const handleUseCurrentLocation = () => {
    setUseCurrentLocation(true)
    // Simulate getting current location
    setTimeout(() => {
      setSelectedLocation("Jaipur, Rajasthan")
      setUseCurrentLocation(false)
    }, 1500)
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

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNavbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Set Your Location</h1>
          <p className="text-gray-600">Choose your location to find shops and products near you</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Map and Search */}
          <div className="flex-1">
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle>Search Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Input
                    type="text"
                    placeholder="Search for your area, street name..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                <Button
                  variant="outline"
                  className="w-full mb-4"
                  onClick={handleUseCurrentLocation}
                  disabled={useCurrentLocation}
                >
                  {useCurrentLocation ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-orange-600 border-t-transparent rounded-full" />
                      Getting your location...
                    </>
                  ) : (
                    <>
                      <Navigation className="mr-2 h-4 w-4" />
                      Use my current location
                    </>
                  )}
                </Button>

                <Tabs value={currentTab} onValueChange={setCurrentTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="search">Search Results</TabsTrigger>
                    <TabsTrigger value="saved">Saved Locations</TabsTrigger>
                  </TabsList>

                  <TabsContent value="search" className="mt-4 space-y-3">
                    {searchQuery ? (
                      [
                        "Jaipur, Rajasthan",
                        "Jagatpura, Jaipur, Rajasthan",
                        "Malviya Nagar, Jaipur, Rajasthan",
                        "Vaishali Nagar, Jaipur, Rajasthan",
                      ]
                        .filter((loc) => loc.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((location) => (
                          <div
                            key={location}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border ${
                              selectedLocation === location ? "border-orange-600 bg-orange-50" : "hover:bg-gray-50"
                            }`}
                            onClick={() => setSelectedLocation(location)}
                          >
                            <MapPin className="h-5 w-5 text-orange-600" />
                            <div className="flex-1">
                              <p className="font-medium">{location}</p>
                            </div>
                            {selectedLocation === location && <Check className="h-5 w-5 text-orange-600" />}
                          </div>
                        ))
                    ) : (
                      <div className="text-center py-8">
                        <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Search for a location</h3>
                        <p className="text-gray-500">Enter your area or street name to find locations</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="saved" className="mt-4 space-y-3">
                    {[
                      {
                        id: 1,
                        name: "Home",
                        address: "123 Main Street, Jaipur, Rajasthan",
                        icon: <Home className="h-4 w-4" />,
                      },
                      {
                        id: 2,
                        name: "Work",
                        address: "456 Tech Park, Sector 18, Jaipur, Rajasthan",
                        icon: <Briefcase className="h-4 w-4" />,
                      },
                    ].map((location) => (
                      <div
                        key={location.id}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border ${
                          selectedLocation === location.address ? "border-orange-600 bg-orange-50" : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedLocation(location.address)}
                      >
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                          {location.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{location.name}</p>
                          <p className="text-sm text-gray-500">{location.address}</p>
                        </div>
                        {selectedLocation === location.address && <Check className="h-5 w-5 text-orange-600" />}
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Map View */}
            <Card>
              <CardContent className="p-0">
                <div className="relative w-full h-[400px] bg-gray-100 flex items-center justify-center">
                  {isLoading ? (
                    <div className="animate-spin h-8 w-8 border-4 border-orange-600 border-t-transparent rounded-full"></div>
                  ) : (
                    <>
                      {/* This would be replaced with an actual map component in a real app */}
                      <div className="absolute inset-0 bg-gray-200 overflow-hidden">
                        <div className="w-full h-full relative">
                          {/* Placeholder for Google Maps */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-gray-500">Map View</p>
                          </div>

                          {/* Map Pin */}
                          {selectedLocation && (
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              <div className="relative">
                                <MapPin className="h-8 w-8 text-orange-600" />
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-2 bg-white px-3 py-1 rounded-full shadow-md text-xs font-medium">
                                  {selectedLocation}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Map Controls */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full bg-white shadow-md">
                          <Plus className="h-5 w-5" />
                        </Button>
                        <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full bg-white shadow-md">
                          <Minus className="h-5 w-5" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.push("/customer")}>
                  Cancel
                </Button>
                <Button
                  className="bg-orange-600 hover:bg-orange-700"
                  disabled={!selectedLocation}
                  onClick={handleSaveLocation}
                >
                  Save Location
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Nearby Shops */}
          <div className="w-full lg:w-96">
            <Card>
              <CardHeader>
                <CardTitle>Nearby Shops</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedLocation ? (
                  <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                    {[
                      {
                        id: "1",
                        name: "Sharma General Store",
                        distance: "1.2 km",
                        rating: 4.8,
                        time: "15 mins",
                        categories: ["Grocery", "Household"],
                      },
                      {
                        id: "4",
                        name: "Singh Pharmacy",
                        distance: "0.8 km",
                        rating: 4.9,
                        time: "10 mins",
                        categories: ["Pharmacy", "Healthcare"],
                      },
                      {
                        id: "8",
                        name: "Joshi Grocery",
                        distance: "1.5 km",
                        rating: 4.6,
                        time: "20 mins",
                        categories: ["Grocery", "Organic"],
                      },
                    ].map((shop) => (
                      <motion.div
                        key={shop.id}
                        variants={itemVariants}
                        className="flex items-start gap-3 p-3 rounded-lg border hover:border-orange-600 hover:bg-orange-50 cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <Store className="h-5 w-5 text-orange-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium">{shop.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{shop.distance}</span>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                              <span>{shop.rating}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{shop.time}</span>
                            </div>
                          </div>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {shop.categories.map((category, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <Link href="/customer" className="block text-center">
                      <Button variant="link" className="text-orange-600">
                        View All Nearby Shops
                      </Button>
                    </Link>
                  </motion.div>
                ) : (
                  <div className="text-center py-8">
                    <Store className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Select a location</h3>
                    <p className="text-gray-500">Choose your location to see nearby shops</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function Plus(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

function Minus(props) {
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
      <path d="M5 12h14" />
    </svg>
  )
}

function Store(props) {
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
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7" />
      <path d="M18 12v0a2 2 0 0 1-2-2V7" />
      <path d="M14 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7" />
      <path d="M10 12v0a2 2 0 0 1-2-2V7" />
      <path d="M6 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7" />
    </svg>
  )
}
