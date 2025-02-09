"use client"

import { motion } from "framer-motion"
import { Ship, Instagram, Linkedin, Twitter, Github,Bitcoin } from "lucide-react"
import Link from "next/link"

const footerSections = {
  marketplace: {
    title: "Marketplace",
    items: ["Art", "Gaming", "Memberships", "PFPs", "Photography", "Music"],
  },
  myAccount: {
    title: "My Account",
    items: ["Profile", "Favorites", "Watchlist", "Studio", "OpenSea Pro", "Settings"],
  },
  resources: {
    title: "Resources",
    items: [
      "Blog",
      "Learn",
      "Help center",
      "Community standards",
      "Taxes",
      "Partners",
      "Developer platform",
      "Platform status",
    ],
  },
  company: {
    title: "Company",
    items: ["About", "Careers", "Ventures"],
  },
  
}

const socialLinks = [
  { icon: Instagram, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Github, href: "#" },
]

export default function Footer() {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer className="bg-black text-white py-16 px-6 py-5">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo Section */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Bitcoin className="w-8 h-8" />
            <span className="text-xl font-bold">NeuraSkill</span>
          </Link>
          <p className="text-gray-400 mb-6">
            The world's first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs).
            Buy, sell, and discover exclusive digital items.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer Sections */}
        {Object.entries(footerSections).map(([key, section]) => (
          <motion.div key={key} variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <ul className="space-y-2">
              {section.items.map((item, index) => (
                <motion.li key={index} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Copyright */}
      <motion.div
        variants={itemVariants}
        className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-gray-400"
      >
        <p>© 2024 NeuraSkill. All rights reserved</p>
      </motion.div>
    </footer>
  )
}

