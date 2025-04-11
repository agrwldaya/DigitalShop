

import Link from "next/link"

import {
  ShoppingBag,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react"
 


export default function Footer() {
 
  return (
    <div  >
      <footer className="border-t overflow-x-hidden  py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 ShopEasy. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
