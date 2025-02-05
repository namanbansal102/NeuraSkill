"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingCart, ChevronDown } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const navItems = [
    {
      name: "Drops",
      dropdown: ["Featured", "Learn More", "About Drops"],
    },
    {
      name: "Stats",
      dropdown: ["Rankings", "Activity", "Analytics"],
    },
    {
      name: "Create",
      dropdown: ["Submit NFTs", "Collection", "Launchpad"],
    },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#04111d] border-b border-gray-800">
      <div className="max-w-[2560px] mx-auto">
        <div className="flex items-center gap-8 px-4 h-[72px]">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LphuwRWYxIpkplyJ7Gh0hPDWMo2qcx.png"
              alt="OpenSea Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-white text-xl font-semibold">NeuraSkill</span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <div
                key={item.name}
                className=  "relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors px-2 py-1">
                  {item.name}
                  <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-2"
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <a
                          key={dropdownItem}
                          href="#"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                        >
                          {dropdownItem}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-[760px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search items, collections, and accounts"
                className="w-full bg-gray-800/50 text-white placeholder-gray-400 px-4 py-2 pl-11 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
              <div className="w-5 h-5 rounded-full bg-gray-600" />
              Switch network
            </button>

            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <ShoppingCart className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

