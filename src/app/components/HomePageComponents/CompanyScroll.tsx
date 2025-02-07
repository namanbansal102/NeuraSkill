"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const companies = [
  { name: "Versatile", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Circle", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Paribuhub", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Edu Chain", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Aptos", logo: "/placeholder.svg?height=40&width=120" },
  // Duplicate for seamless loop
  { name: "Versatile", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Circle", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Paribuhub", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Edu Chain", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Aptos", logo: "/placeholder.svg?height=40&width=120" },
]

export function CompanyScroll() {
  return (
    <div className="relative w-full overflow-hidden bg-transparent py-10 border-2 border-white">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="flex gap-16 whitespace-nowrap"
      >
        {companies.map((company, idx) => (
          <div key={idx} className="flex items-center justify-center w-[200px] h-20">
            <Image
              src={company.logo || "/placeholder.svg"}
              alt={company.name}
              width={120}
              height={40}
              className="object-contain brightness-200 hover:brightness-100 transition-all duration-300"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

