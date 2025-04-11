"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"


import GeolocationPicker from "@/components/GeolocationPicker"
import axios from "axios"
 
import { useRouter } from "next/navigation"
export default function ShopkeeperRegistration() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [licenseFile, setLicenseFile] = useState(null)
  const [licensePreview, setLicensePreview] = useState("")
 
   const router = useRouter()
  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    longitude: null,
    latitude: null,
    storeOpenTime: "",
    storeCloseTime: "",
    shopType: "",
    gstNumber: "",
    password: "",
    confirmPassword: "",
    whatsappNotifications: true,
  })

  useEffect(() => {
    if (selectedLocation) {
      handleLocationChange(selectedLocation)
    }
  }, [selectedLocation])

  const handleLocationChange = (selectedLocation) => {
    setFormData((prev) => ({
      ...prev,
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLicenseFile(file)

      // Create preview for image files
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setLicensePreview(reader.result)
        }
        reader.readAsDataURL(file)
      } else {
        setLicensePreview("")
      }
    }
  }

  const validateForm = () => {
    // Check if required fields are filled
    const requiredFields = [
      "shopName",
      "ownerName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "pincode",
      "shopType",
      "storeOpenTime",
      "storeCloseTime",
    ]
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast(`Please fill in the ${field.replace(/([A-Z])/g, " $1").toLowerCase()} field`)
        return false
      }
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast("Please make sure your passwords match")
      return false
    }

    // Check password strength
    if (formData.password.length < 8) {
      toast("Password must be at least 8 characters long")
      return false
    }

    // Check if license file is uploaded
    if (!licenseFile) {
      toast("Please upload your shop license or registration proof")
      return false
    }

    // Check if location is selected
    if (!formData.latitude || !formData.longitude) {
      toast("Please select your shop location on the map")
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Create FormData object to send file and form data
    const formDataToSend = new FormData()

    // Append all form fields
    Object.keys(formData).forEach((key) => {
      if (key !== "confirmPassword") {
        // Don't send confirmPassword to backend
        formDataToSend.append(key, formData[key])
      }
    })

    // Append the license file
    if (licenseFile) {
      formDataToSend.append("licenseDocument", licenseFile)
    }
     console.log(formDataToSend)
    try {
      const response = await axios.post("http://localhost:4000/api/shops/register", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.data.success) {
        toast(response.data.message || "OTP sent successfully to your phone number")
        router.push(`/shopkeeper/register/otp/${formData.phone}`)

        // Redirect to OTP verification page or show OTP input
        // You might want to redirect to an OTP verification page here
        // router.push(`/verify-otp?phone=${formData.phone}`);
      } else {
        toast(response.data.message || "Something went wrong")
      }
    } catch (error) {
      console.error("Registration error:", error)

      // Handle different types of errors
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        const errorMessage = error.response.data.message || "Server error occurred"
        toast(errorMessage)
      } else if (error.request) {
        // The request was made but no response was received
        toast("Could not connect to the server. Please check your internet connection.")
      } else {
        // Something happened in setting up the request
        toast("An unexpected error occurred")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({
      shopName: "",
      ownerName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      longitude: null,
      latitude: null,
      storeOpenTime: "",
      storeCloseTime: "",
      shopType: "",
      gstNumber: "",
      password: "",
      confirmPassword: "",
      whatsappNotifications: true,
    })
    setLicenseFile(null)
    setLicensePreview("")
    setSelectedLocation(null)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content */}
      <main className="flex-1 container py-10">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl">🏪 Register Your Shop</CardTitle>
              <CardDescription>Join our platform and start serving customers online</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Details */}

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Basic Details</h3>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="shopName">
                        Shop Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="shopName"
                        name="shopName"
                        value={formData.shopName}
                        onChange={handleChange}
                        placeholder="Enter your shop name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ownerName">
                        Owner Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="ownerName"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        placeholder="Enter owner's full name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Shop Location */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Shop Location</h3>
                  <Separator />
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">
                        Shop Address <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your complete shop address"
                        required
                      />
                    </div>
                    {/* address */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* city */}
                      <div className="space-y-2">
                        <Label htmlFor="city">
                          City <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Enter your city"
                          required
                        />
                      </div>
                      {/* state*/}
                      <div className="space-y-2">
                        <Label htmlFor="state">
                          State <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="Enter your state"
                          required
                        />
                      </div>
                      {/* pincode */}
                      <div className="space-y-2">
                        <Label htmlFor="pincode">
                          Pincode <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          type="number"
                          value={formData.pincode}
                          onChange={handleChange}
                          placeholder="Enter pincode"
                          required
                        />
                      </div>
                      {/* store open time */}
                      <div className="space-y-2">
                        <Label htmlFor="storeOpenTime">
                          Store Open Time <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="storeOpenTime"
                          name="storeOpenTime"
                          type="time"
                          value={formData.storeOpenTime}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      {/* store close time */}
                      <div className="space-y-2">
                        <Label htmlFor="storeCloseTime">
                          Store Close Time <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="storeCloseTime"
                          name="storeCloseTime"
                          type="time"
                          value={formData.storeCloseTime}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    {/* Google map */}

                    <div className="space-y-2">
                      <Label>
                        Shop Location on Map <span className="text-destructive">*</span>
                      </Label>
                      <div className="border rounded-md p-1">
                        <GeolocationPicker onLocationChange={setSelectedLocation} />
                        {formData.latitude && formData.longitude && (
                          <p className="text-xs text-muted-foreground mt-2 px-2">
                            Selected location: {formData.latitude.toFixed(6)}, {formData.longitude.toFixed(6)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Business Information</h3>
                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="shopType">
                        Type of Shop <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) => handleSelectChange("shopType", value)}
                        value={formData.shopType}
                      >
                        <SelectTrigger id="shopType">
                          <SelectValue placeholder="Select shop type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grocery">grocery</SelectItem>
                          <SelectItem value="pharmacy">Pharmacy</SelectItem>
                          <SelectItem value="stationery">Stationery</SelectItem>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="clothing">clothing</SelectItem>
                          <SelectItem value="hardware">Hardware</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                      <Input
                        id="gstNumber"
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleChange}
                        placeholder="Enter GST number if applicable"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="licenseUpload">
                      Shop License / Registration Proof <span className="text-destructive">*</span>
                    </Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      {licensePreview ? (
                        <div className="mb-4 relative">
                          <img
                            src={licensePreview || "/placeholder.svg"}
                            alt="License preview"
                            className="max-h-40 rounded-md"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => {
                              setLicenseFile(null)
                              setLicensePreview("")
                            }}
                          >
                            ×
                          </Button>
                        </div>
                      ) : (
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      )}
                      <p className="text-sm text-muted-foreground mb-1">
                        {licenseFile ? licenseFile.name : "Drag and drop your file here, or click to browse"}
                      </p>
                      <p className="text-xs text-muted-foreground">Supported formats: PDF, JPG, PNG (Max size: 5MB)</p>
                      <Input
                        id="licenseUpload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        required
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => document.getElementById("licenseUpload")?.click()}
                      >
                        {licenseFile ? "Change Document" : "Upload Document"}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Login Credentials */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Login Credentials</h3>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">
                        Set Password <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a strong password"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Password must be at least 8 characters with letters, numbers, and special characters
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm Password <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Communication Preferences */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Communication Preferences</h3>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="whatsappNotifications">Enable WhatsApp Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive order updates and customer messages via WhatsApp
                        </p>
                      </div>
                      <Switch
                        id="whatsappNotifications"
                        checked={formData.whatsappNotifications}
                        onCheckedChange={(checked) => handleSwitchChange("whatsappNotifications", checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button type="submit" className="flex-1" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "✅ Register"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    size="lg"
                    onClick={handleReset}
                    disabled={isSubmitting}
                  >
                    🔄 Reset Form
                  </Button>
                </div>
              </form>
            </CardContent>
            {/* Already have a account*/}
            <CardFooter className="flex flex-col items-center text-center border-t pt-6">
              <p className="text-sm text-muted-foreground mb-2">
                By registering, you agree to our{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
              <p className="text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Log in here
                </Link>
                .
              </p>
            </CardFooter>
            
          </Card>
        </div>
      </main>

     
    </div>
  )
}

