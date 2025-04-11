'use client'


import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { getShopkeeperFromToken } from "@/lib/auth"
import { ShoppingBag, Store, User } from "lucide-react"
 
import { useRouter } from "next/navigation"



// console.log(token)

export default function HomePage() {
    const router = useRouter()
  
  return (  
    <div className="flex min-h-screen overflow-hidden flex-col">
      <main className="flex-1">
         <Header/>
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b overflow-hidden from-orange-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Connect Local Shops with Customers
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  ShopEasy helps local shopkeepers digitize their business while making it convenient for customers to
                  browse and order products for pickup.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
              <Button  className="bg-orange-600 cursor-pointer hover:bg-orange-700" onClick={() => router.push('/shopkeeper/register')}>
                <Store className="mr-2 h-4 w-4" />
                Register as Shopkeeper
              </Button>

               
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 overflow-x-hidden bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Key Features</h2>
              <p className="max-w-[600px] text-gray-500">
                Discover how ShopEasy is transforming local commerce across India
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Store className="h-10 w-10 text-orange-600" />,
                  title: "For Shopkeepers",
                  description:
                    "Digitize your inventory, manage orders, and grow your customer base with our easy-to-use dashboard.",
                },
                {
                  icon: <User className="h-10 w-10 text-orange-600" />,
                  title: "For Customers",
                  description: "Browse products from local shops, place orders, and pick them up at your convenience.",
                },
                {
                  icon: <ShoppingBag className="h-10 w-10 text-orange-600" />,
                  title: "Local Commerce",
                  description: "Support local businesses while enjoying the convenience of digital shopping.",
                },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 border rounded-lg">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="about" className="py-16 overflow-x-hidden bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">How It Works</h2>
              <p className="max-w-[600px] text-gray-500">
                A simple process that benefits both shopkeepers and customers
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Register",
                  description: "Sign up as a shopkeeper or customer in minutes.",
                },
                {
                  step: "2",
                  title: "Connect",
                  description: "Shopkeepers list products, customers browse local shops.",
                },
                {
                  step: "3",
                  title: "Order",
                  description: "Customers place orders for pickup at their convenience.",
                },
                {
                  step: "4",
                  title: "Pickup",
                  description: "Customers collect their orders from the shop, no delivery fees.",
                },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-orange-600">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-500">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 overflow-x-hidden bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Success Stories</h2>
              <p className="max-w-[600px] text-gray-500">Hear from shopkeepers and customers who are using ShopEasy</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote:
                    "ShopEasy has helped me digitize my small grocery store. Now I get orders even before customers arrive, making inventory management much easier.",
                  name: "Rajesh Sharma",
                  role: "Grocery Store Owner, Delhi",
                },
                {
                  quote:
                    "I love being able to browse products from my local shops and place orders for pickup. It saves me time and I still get to support local businesses.",
                  name: "Priya Patel",
                  role: "Customer, Mumbai",
                },
              ].map((testimonial, index) => (
                <div key={index} className="p-6 border rounded-lg">
                  <div className="flex flex-col space-y-4">
                    <div className="relative">
                      <p className="text-gray-500 italic">"{testimonial.quote}"</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-xl font-bold text-orange-600">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-bold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-16 overflow-x-hidden bg-orange-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter">Ready to Get Started?</h2>
              <p className="max-w-[600px] text-gray-500 mb-8">
                Join thousands of shopkeepers and customers across India who are already using ShopEasy
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Store className="mr-2 h-4 w-4" />
                  Register as Shopkeeper
                </Button>
                <Button variant="outline">
                  <User className="mr-2 h-4 w-4" />
                  Register as Customer
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

