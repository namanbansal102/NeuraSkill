"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ChevronDown } from "lucide-react"
import { ethers } from "ethers"
import { useRouter } from "next/navigation"
import Image from "next/image"
import logo from "./logo.jpg"

interface NavItem {
  name: string
  href: string
  dropdown?: {
    name: string
    href: string
  }[]
}

interface Chain {
  name: string
  image: string
  contractAddress: string
  chainId: string
  rpcUrl: string
  blockExplorerUrl: string
}

const chains: Chain[] = [
  {
    name: "BotChain Testnet",
    image: "data:image/png;base64,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",  
    contractAddress:  "0x7E1c45B5aE0a8759b3f784E63cCbcE0606975Bdf",
    chainId: "0x3C8", // 968 in decimal (BotChain Testnet)
    rpcUrl: "https://rpc.bohr.life/",
    blockExplorerUrl: "",
  },

  
]

const navItems: NavItem[] = [
  {
    name: "Hacks",
    href: "/hackathons",
    dropdown: [
      { name: "View Hacks", href: "/hackathons" },
      { name: "Create Hacks", href: "/create-hack" },
      { name: "Latest", href: "/hacks/latest" },
    ],
  },
  {
    name: "Builds",
    href: "/create-build",
    dropdown: [
      { name: "My Builds", href: "/my-builds" },
      { name: "Create Build", href: "/create-build" },
      { name: "Submit Build", href: "/builds/0" },
    ],
  },
  {
    name: "About",
    href: "/about",
    dropdown: [
      { name: "About", href: "/about" },
      { name: "Terms & Conditions", href: "/termsAndConditions" },
    ],
  },
]

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [account, setAccount] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedChain, setSelectedChain] = useState<Chain>(chains[0])
  const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const savedChain = localStorage.getItem("selectedChain")
    if (savedChain) {
      setSelectedChain(JSON.parse(savedChain))
    } else {
      // Automatically store default chain if not present
      localStorage.setItem("selectedChain", JSON.stringify(chains[0]))
      localStorage.setItem("CONTRACT_ADD", chains[0].contractAddress)
    }
  }, [])

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        setAccount(address)
        setIsWalletConnected(true)
      } catch (error) {
        console.error("Error connecting wallet:", error)
      }
    } else {
      window.open("https://metamask.io/download/", "_blank")
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const mockResults = ["Popular NFT #1", "Top Collection", "Trending Artist"].filter((item) =>
      item.toLowerCase().includes(query.toLowerCase()),
    )
    setSearchResults(query ? mockResults : [])
  }

  const switchChain = async (chain: Chain) => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Try to switch to the chain
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chain.chainId }],
        })
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: chain.chainId,
                  chainName: chain.name,
                  nativeCurrency: {
                    name: "Native Token",
                    symbol: "ETH", // Replace with the actual symbol
                    decimals: 18,
                  },
                  rpcUrls: [chain.rpcUrl], // You need to add this to your Chain interface
                  blockExplorerUrls: [chain.blockExplorerUrl], // You need to add this to your Chain interface
                },
              ],
            })
          } catch (addError) {
            console.error("Error adding chain:", addError)
          }
        } else {
          console.error("Error switching chain:", switchError)
        }
      }
    }
  }

  const handleChainSelect = async (chain: Chain) => {
    setSelectedChain(chain)
    localStorage.setItem("selectedChain", JSON.stringify(chain))
    localStorage.setItem("CONTRACT_ADD", chain.contractAddress)
    setIsChainDropdownOpen(false)

    await switchChain(chain)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 rounded-br-2xl rounded-bl-2xl transition-all duration-300 ${
        isScrolled ? "bg-black/50 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-[2560px] mx-auto">
        <div className="flex items-center gap-8 px-4 h-[72px]">
          {/* Logo */}
          <div onClick={() => router.push("/")} className="flex items-center gap-3 cursor-pointer">
            <Image
              src={logo.src || "/placeholder.svg"}
              alt="NeuraSkill Logo"
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
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors px-2 py-1"
                >
                  {item.name}
                  <ChevronDown className="w-4 h-4" />
                </a>

                <AnimatePresence>
                  {activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-48 bg-black/30 backdrop-blur-md rounded-lg shadow-lg py-2 border border-white/10"
                    >
                      {item.dropdown?.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-white hover:bg-white/10 transition-colors"
                        >
                          {dropdownItem.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-[760px] relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search Hacks, builds, and accounts"
                className="w-full bg-white/10 text-white placeholder-gray-400 px-4 py-2 pl-11 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all backdrop-blur-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            {/* Search Results Dropdown */}
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-black/30 backdrop-blur-md rounded-lg shadow-lg py-2 border border-white/10"
                >
                  {searchResults.map((result, index) => (
                    <a key={index} href="#" className="block px-4 py-2 text-white hover:bg-white/10 transition-colors">
                      {result}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {isWalletConnected ? (
              <div
                onClick={() => router.push("/userProfile")}
                className="flex items-center gap-2 bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg cursor-pointer border border-white/10"
              >
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-green-500 absolute -top-1 -right-1 animate-pulse" />
                  <div className="w-5 h-5 rounded-full bg-white/20" />
                </div>
                <span className="text-sm">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </span>
              </div>
            ) : (
              <div className="relative">
                <div className="flex text-white items-center justify-center">

                <button onClick={connectWallet} className="p-[3px] relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                  <div className="px-3 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:scale-[102%] flex items-center gap-2">
                    <span>Connect Wallet</span>
                   
                  </div>
                </button>
                 <ChevronDown
                      className="w-7 h-7 cursor-pointer  hover:border-2 hover:rounded-lg "
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsChainDropdownOpen(!isChainDropdownOpen)
                      }}
                      />
                      </div>
                <AnimatePresence>
                  {isChainDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-black/30 backdrop-blur-md rounded-lg shadow-lg py-2 border border-white/10"
                    >
                      {chains.map((chain) => (
                        <div
                          key={chain.name}
                          className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 transition-colors cursor-pointer"
                          onClick={() => handleChainSelect(chain)}
                        >
                          <Image src={chain.image || "/placeholder.svg"} alt={chain.name} width={24} height={24} />
                          <span>{chain.name}</span>
                          {selectedChain.name === chain.name && (
                            <div className="ml-auto w-2 h-2 bg-green-500 rounded-full" />
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

